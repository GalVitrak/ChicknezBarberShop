/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./SignIn.css";
import { Input, Form, Button } from "antd";
import { PhoneNumberUtil } from "google-libphonenumber";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
// import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

function SignIn(): JSX.Element {
  const [otp, setOTP] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [otpHidden, setOtpHidden] = useState<string>("hidden");
  const [registerHidden, setRegisterHidden] = useState<string>("hidden");
  const [phoneInputHidden, setPhoneInputHidden] =
    useState<string>("phoneInput");
  const [tries, setTries] = useState<number>(2);
  const [isValid, setIsValid] = useState(false);
  const [isFNameValid, setIsFNameValid] = useState(false);
  const [isLNameValid, setIsLNameValid] = useState(false);

  const [timer, setTimer] = useState<number>(60);

  // write a function that will decrease the timer by 1 every second

  const navigate = useNavigate();

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phoneNumber: string) => {
    try {
      setPhone(phoneNumber);
      setIsValid(
        phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phoneNumber))
      );
      return isValid;
    } catch (e) {
      return false;
    }
  };

  async function verifyOTP() {
    if (tries > 0) {
      const credentials = new CredentialsModel(phone, otp);
      try {
        await authService.login(credentials);
        notifyService.success("התחברת בהצלחה");
        navigate("/home");
      } catch (err: any) {
        notifyService.error(`טעות בקוד, מס' נסיונות שנותרו ${tries}`);
        setTries(tries - 1);
      }
    } else {
      notifyService.error(
        "נכשלת באימות הקוד 3 פעמים. אנא נסה שנית מאוחר יותר."
      );
      navigate("/home");
    }
  }

  async function sendSMS() {
    // clearInterval(interval);
    const taken = await authService.userExists(phone);
    if (!taken) {
      notifyService.error("אינך רשום למערכת, אנא הירשם");
      setPhoneInputHidden("hidden");
      setRegisterHidden("registerDiv");
      return;
    }
    authService.updateOTP(phone);
    setPhoneInputHidden("hidden");
    setOtpHidden("otp-input");
  }

  async function registerUser() {
    if (await authService.userExists(phone)) {
      notifyService.error("מספר הטלפון כבר קיים במערכת");
      navigate("/home");
      return;
    }
    const user = new UserModel(firstName, lastName, phone);
    authService.registerUser(user);
    setRegisterHidden("hidden");
    setOtpHidden("otp-input");
  }

  type FieldType = {
    phone?: string;
    firstName?: string;
    lastName?: string;
  };

  return (
    <div className="SignIn">
      <div className="context">
        <h3>אנא התחבר עם מספר הטלפון שלך</h3>
        <div className={phoneInputHidden}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            style={{ maxWidth: "100%" }}
          >
            <Form.Item<FieldType>
              label="מספר טלפון"
              name="phone"
              rules={[
                { required: true, message: "אנא הכנס מספר טלפון" },
                {
                  validator(rule, value, callback) {
                    if (!isPhoneValid(value)) {
                      callback("אנא הכנס מספר טלפון תקין");
                    }
                    callback();
                  },
                },
              ]}
            >
              <PhoneInput
                style={{ direction: "ltr" }}
                defaultCountry={"il"}
                value={phone}
                onChange={(value) => {
                  isPhoneValid(value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={!isValid}
                onClick={() => {
                  sendSMS();
                }}
              >
                שלח סיסמא חד פעמית
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={otpHidden}>
          <OtpInput
            inputStyle={{ direction: "rtl" }}
            value={otp}
            onChange={setOTP}
            numInputs={6}
            shouldAutoFocus={true}
            renderSeparator={<span>•</span>}
            renderInput={(props) => <input {...props} />}
          ></OtpInput>
          <button
            // disabled={!isValid}
            onClick={() => {
              verifyOTP();
            }}
          >
            התחבר
          </button>
          <button>שלח קוד חדש {timer}</button>
        </div>
        <div className={registerHidden}>
          <div>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              style={{ maxWidth: "100%" }}
            >
              <Form.Item<FieldType>
                label="מספר טלפון"
                name="phone"
                rules={[
                  { required: true, message: "אנא הכנס מספר טלפון" },
                  {
                    validator(rule, value) {
                      if (!isPhoneValid(value)) {
                        return Promise.reject("אנא הכנס מספר טלפון תקין");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <PhoneInput
                  style={{ direction: "ltr" }}
                  defaultCountry={"il"}
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                  }}
                />{" "}
              </Form.Item>
              <Form.Item<FieldType>
                label="שם פרטי"
                name="firstName"
                rules={[
                  { required: true, message: "אנא הכנס שם פרטי" },
                  {
                    validator(rule, value) {
                      if (value.length > 0) {
                        setIsFNameValid(true);
                      } else {
                        setIsFNameValid(false);
                      }
                    },
                  },
                ]}
              >
                <Input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="שם משפחה"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "אנא הכנס שם משפחה",
                  },
                  {
                    validator(rule, value) {
                      if (value.length > 0) {
                        setIsLNameValid(true);
                      } else {
                        setIsLNameValid(false);
                      }
                    },
                  },
                ]}
              >
                <Input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    registerUser();
                  }}
                  disabled={!isValid || !isFNameValid || !isLNameValid}
                >
                  הירשם
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
