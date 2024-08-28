/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./SignIn.css";
import { Input, Form, Button, ConfigProvider } from "antd";
import { PhoneNumberUtil } from "google-libphonenumber";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

type SignInProps = {
  closeModal: (data: boolean) => void;
};

function SignIn(props: SignInProps): JSX.Element {
  const [otp, setOTP] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [otpHidden, setOtpHidden] = useState<string>("hidden");
  const [registerHidden, setRegisterHidden] = useState<string>("hidden");
  const [telegramHidden, setTelegramHidden] = useState<string>("hidden");
  const [phoneInputHidden, setPhoneInputHidden] =
    useState<string>("phoneInput");
  const [tries, setTries] = useState<number>(2);
  const [isValid, setIsValid] = useState(false);

  const [chatID, setChatID] = useState<string>("");

  const [timer, setTimer] = useState<number>(60);
  const [countdown, setCountdown] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown) {
      interval = setInterval(() => {
        setTimer((prevSeconds) => {
          if (prevSeconds <= 0) {
            setCountdown(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const startCountdown = () => {
    setTimer(60);
    setCountdown(true);
  };

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
        props.closeModal(false);
      } catch (err: any) {
        notifyService.error(`טעות בקוד, מס' נסיונות שנותרו ${tries}`);
        setTries(tries - 1);
      }
    } else {
      notifyService.error(
        "נכשלת באימות הקוד 3 פעמים. אנא נסה שנית מאוחר יותר."
      );
      props.closeModal(false);
    }
  }

  async function sendSMS() {
    const taken = await authService.userExists(phone);
    if (!taken) {
      notifyService.error("אינך רשום למערכת, אנא הירשם");
      setPhoneInputHidden("hidden");
      setTelegramHidden("telegramDiv");
      return;
    }
    authService.updateOTP(phone);
    setPhoneInputHidden("hidden");
    setOtpHidden("otp-input");
    startCountdown();
  }

  async function registerUser() {
    if (await authService.userExists(phone)) {
      notifyService.error("מספר הטלפון כבר קיים במערכת");
      navigate("/home");
      return;
    }
    const user = new UserModel(firstName, lastName, phone, chatID);
    authService.registerUser(user);
    setRegisterHidden("hidden");
    setOtpHidden("otp-input");
    startCountdown();
  }

  type FieldType = {
    phone?: string;
    firstName?: string;
    lastName?: string;
  };

  return (
    <div className="SignIn">
      <div className={phoneInputHidden}>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelColor: "white",
                labelRequiredMarkColor: "red",
              },
            },
          }}
        >
          <Form
            style={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Item>
              <h3>התחברות</h3>
            </Form.Item>
            <Form.Item<FieldType>
              style={{ color: "white" }}
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
                required
                style={{ direction: "ltr", backgroundColor: "transparent" }}
                defaultCountry={"il"}
                defaultMask="...-...-...."
                value={phone}
                onChange={(value) => {
                  console.log(value);
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
        </ConfigProvider>
      </div>
      <div className={telegramHidden}>
        <Form
          style={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Item>
            <h3>הירשם לקבלת סיסמא באמצעות טלגרם</h3>
          </Form.Item>
          <Form.Item>
            <a
              href="https://t.me/ChicknezBarberBot"
              target="_blank"
              className="telegram-link"
            >
              לחץ כאן
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={async () => {
                setChatID(await authService.getChatID());
                setTelegramHidden("hidden");
                setRegisterHidden("registerDiv");
              }}
            >
              לחץ כאן לאחר הביצוע
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={registerHidden}>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelColor: "white",
                  labelRequiredMarkColor: "red",
                },
                Input: {
                  colorBgContainer: "transparent",
                },
              },
            }}
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              style={{
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Form.Item>
                <h3>הרשמה</h3>
              </Form.Item>
              <Form.Item<FieldType>
                label="שם פרטי"
                name="firstName"
                rules={[{ required: true, message: "אנא הכנס שם פרטי" }]}
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
                  disabled={
                    lastName.length > 0 && firstName.length > 0 ? false : true
                  }
                >
                  הירשם
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
      <div className={otpHidden}>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelColor: "white",
                labelRequiredMarkColor: "red",
              },
            },
          }}
        >
          <Form
            style={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Item>
              <h3>אנא אמת קוד חד פעמי</h3>
            </Form.Item>
            <Form.Item>
              <Input.OTP
                style={{ direction: "ltr" }}
                length={6}
                value={otp}
                onChange={(value) => setOTP(value)}
                autoFocus
              ></Input.OTP>
            </Form.Item>
            <Form.Item>
              <button
                onClick={() => {
                  verifyOTP();
                }}
              >
                התחבר
              </button>
            </Form.Item>
            <Form.Item>
              <button
                onClick={() => {
                  authService.updateOTP(phone);
                  startCountdown();
                }}
                disabled={countdown}
              >
                <>{timer === 0 ? "שלח קוד חדש" : `שלח קוד חדש ${timer}`}</>
              </button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default SignIn;
