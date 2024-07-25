/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";
import SignIn from "../../Auth/Signin/SignIn";

function Header(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleCallback(data: boolean) {
    setModalOpen(data);
  }

  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="login">
        {!authStore.getState().user && (
          <>
            <span className="welcome">התחבר</span>
            <LoginOutlined
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </>
        )}

        <>
          {authStore.getState().user && (
            <>
              <span className="welcome">
                ברוך הבא {authStore.getState().user?.firstName}
              </span>
              <LogoutOutlined
                onClick={() => {
                  authService.logout();
                  navigate("/home");
                }}
              />
            </>
          )}

          {authStore.getState().user?.role && (
            <>
              <span className="welcome">דף מנהל</span>
              <AppstoreOutlined
                onClick={() => {
                  navigate("/admin");
                }}
              />
            </>
          )}
        </>
      </div>
      <div className="menu">
        <button
          className="barber-button"
          onClick={() => {
            navigate("/appointments");
          }}
        >
          קביעת תורים
        </button>
        <img
          className="logo"
          src={"./assets/logo.jpeg"}
          alt="logo"
          onClick={() => {
            navigate("/home");
          }}
        />
        <button
          className="barber-button"
          onClick={() => {
            navigate("/gallery");
          }}
        >
          גלריה
        </button>
      </div>
      <Modal
        okText="התחבר"
        cancelText="ביטול"
        title="התחברות"
        width={550}
        centered={true}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose={true}
      >
        <SignIn closeModal={handleCallback} />
      </Modal>
    </div>
  );
}

export default Header;
