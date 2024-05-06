/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { AuthActionType, authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import login from "../../../Assets/log-in.png";
import logout from "../../../Assets/logout.png";
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="login">
        {!authStore.getState().user && (
          <>
            <span className="welcome">התחבר</span>
            <LoginOutlined
              onClick={() => {
                navigate("/auth");
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
        <button className="barber-button">קביעת תורים</button>
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
      <div></div>
    </div>
  );
}

export default Header;
