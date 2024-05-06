import "./UsersPage.css";
import { useEffect, useState } from "react";
import { Checkbox, Divider, List, Skeleton } from "antd";
import { UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
import UserModel from "../../../Models/UserModel";
import InfiniteScroll from "react-infinite-scroll-component";
import adminService from "../../../Services/AdminService";

export function UsersPage(): JSX.Element {
  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    if (userListLoading) {
      return;
    }
    setUserListLoading(true);
    const users = await adminService.getUsers();
    setUserList(users);
    setUserListLoading(false);
  };

  const [userListLoading, setUserListLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserModel[]>([]);

  return (
    <div className="UsersPage">
      <div
        id="scrollableDiv"
        style={{
          height: "65%",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "white",
          opacity: 0.7,
        }}
      >
        <InfiniteScroll
          dataLength={userList.length}
          next={loadMoreData}
          hasMore={userList.length < 50}
          loader={
            <Skeleton avatar title={false} loading={userListLoading} active />
          }
          endMessage={<Divider plain>אין יותר משתמשים</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            header={
              <Divider
                style={{
                  color: "black",
                  fontSize: "larger",
                  border: "1px black",
                }}
              >
                משתמשים
              </Divider>
            }
            dataSource={userList}
            renderItem={(item) => (
              <List.Item key={item.phoneNumber}>
                <div className="list">
                  <UserOutlined />
                  <Divider type="vertical" />
                  <h4 className="name">
                    {item.firstName + " " + item.lastName}
                  </h4>
                  <Divider type="vertical" />
                  <a
                    className="whatsapp-link"
                    href={"https://wa.me/" + item.phoneNumber}
                    target="_blank"
                  >
                    <span>
                      <WhatsAppOutlined />
                      <Divider type="vertical" style={{ opacity: 0 }} />
                      {item.phoneNumber}
                    </span>
                  </a>
                  <Divider type="vertical" />
                  <Checkbox
                    style={{ direction: "ltr" }}
                    checked={item.role}
                    onChange={() => {
                      // update user role
                    }}
                  >
                    ?הרשאות מנהל
                  </Checkbox>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}
