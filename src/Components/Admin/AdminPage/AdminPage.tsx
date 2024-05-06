import "./AdminPage.css";
import {
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  FileImageOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import { UsersPage } from "../UsersPage/UsersPage";
import { ManageImages } from "../ManageImages/ManageImages";
import Appointments from "../Appointments/Appointments";
import Availability from "../Availability/Availability";

function AdminPage(): JSX.Element {
  const [page, setPage] =
    useState<string>("approved");

  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.getState().user?.role) {
      notifyService.error(
        "אינך מורשה לגשת לדף זה"
      );
      navigate("/home");
    }
  }, [page]);

  // user list items

  // menu items
  const setMenu: MenuProps["onClick"] = (e) => {
    setPage(e.key.toString());
  };

  type MenuItem =
    Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    { type: "divider" },

    getItem(
      "ניהול תורים",
      "sub1",
      <MailOutlined />,
      [
        { type: "divider" },
        getItem(
          "תורים שאושרו",
          "approved",
          <CheckCircleOutlined />
        ),
        { type: "divider" },
        getItem(
          "תורים מחכים לאישור",
          "awaiting",
          <ExclamationCircleOutlined />
        ),
        { type: "divider" },
        getItem(
          "תורים שנדחו",
          "rejected",
          <CloseCircleOutlined />
        ),
      ]
    ),

    { type: "divider" },

    getItem(
      "ניהול",
      "sub2",
      <SettingOutlined />,
      [
        { type: "divider" },
        getItem(
          "משתמשים",
          "users",
          <UserOutlined />
        ),
        { type: "divider" },

        getItem(
          "גלריה",
          "gallery",
          <FileImageOutlined />
        ),
        { type: "divider" },

        getItem(
          "זמינות עבודה",
          "workSchedule",
          <ClockCircleOutlined />
        ),
        { type: "divider" },

        getItem(
          "סוגי תורים",
          "types",
          <ScissorOutlined />
        ),
      ]
    ),
    { type: "divider" },
  ];

  return (
    <div className="AdminPage">
      <Menu
        onClick={setMenu}
        style={{
          opacity: 0.7,
          borderRadius: "10px",
        }}
        defaultSelectedKeys={[page]}
        defaultOpenKeys={["sub1", "sub2"]}
        mode="inline"
        items={items}
      />
      <div className="content">
        {page === "approved" && (
          <div className="approved">
            <Appointments />
          </div>
        )}
        {page === "awaiting" && (
          <div className="awaiting">awaiting</div>
        )}
        {page === "rejected" && (
          <div className="rejected">rejected</div>
        )}
        {page === "users" && (
          <div className="users">
            <UsersPage />
          </div>
        )}
        {page === "gallery" && (
          <div className="gallery">
            <ManageImages />
          </div>
        )}
        {page === "workSchedule" && (
          <div className="workSchedule">
            <Availability />
          </div>
        )}
        {page === "types" && (
          <div className="types">סוגי תורים</div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
