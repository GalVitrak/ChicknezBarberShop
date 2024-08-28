import "./AppointmentTable.css";
import { useState } from "react";
import AppointmentTypeModel from "../../../Models/AppointmentTypeModel";
import { Loading } from "../../Layout/Loading/Loading";
import adminService from "../../../Services/AdminService";
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import SignIn from "../../Auth/Signin/SignIn";
import TextArea from "antd/es/input/TextArea";

type AppointmentTableProps = {
  types: AppointmentTypeModel[];
};

export function AppointmentTable(props: AppointmentTableProps): JSX.Element {
  const [types] = useState<AppointmentTypeModel[]>(props.types);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [typeName, setTypeName] = useState<string>("");
  const [typeDescription, setTypeDescription] = useState<string>("");
  const [typePrice, setTypePrice] = useState<number>(0);
  const [typeDuration, setTypeDuration] = useState<number>(15);
  const [typeId, setTypeId] = useState<string>();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  function handleCallback(data: boolean) {
    setLoginModalOpen(data);
  }

  const showModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddOk = () => {
    const newType = new AppointmentTypeModel(
      typeName,
      typeDuration,
      typePrice,
      typeDescription
    );
    adminService.addAppointmentType(newType);
    types.push(newType);
    setIsAddModalOpen(false);
  };

  const handleEditOk = () => {
    const newType = new AppointmentTypeModel(
      typeName,
      typeDuration,
      typePrice,
      typeDescription,
      typeId
    );
    adminService.editAppointmentType(newType);
    setIsEditModalOpen(false);
    types.forEach((type) => {
      if (type.id === typeId) {
        type.name = typeName;
        type.duration = typeDuration;
        type.price = typePrice;
        type.description = typeDescription;
      }
    });
  };

  type FieldType = {
    name?: string;
    length?: string;
    price?: string;
    description?: string;
  };

  return (
    <div className="AppointmentTypes">
      <div className="list">
        {types.length === 0 ? (
          <div className="empty">
            עדיין לא נוספו סוגי תורים, אנא הוסף סוגי תורים.
            <Loading />
          </div>
        ) : (
          <div className="typesTable">
            <table className="appointmentsTypeTable">
              <tr>
                <th>שם תור</th>
                <th>משך תור</th>
                <th>מחיר</th>
                <th>תיאור</th>
                {authStore.getState().user?.role && (
                  <th>
                    <div className="tableOptions">
                      <PlusSquareOutlined className="add" onClick={showModal} />
                    </div>
                  </th>
                )}
              </tr>
              {types.map((type) => (
                <tr
                  key={type.id}
                  onClick={() => {
                    if (!authStore.getState().user) {
                      notifyService.error("אנא התחבר כדי לקבוע תור");
                      setLoginModalOpen(true);
                    } else {
                      notifyService.success(
                        "תעשה מודל של קביעת תור לפי זמינות"
                      );
                    }
                  }}
                >
                  <td>{type.name}</td>
                  <td>{type.duration}</td>
                  <td>{type.price}</td>
                  <td>{type.description}</td>
                  {authStore.getState().user?.role && (
                    <td>
                      <div className="tableOptions">
                        <EditOutlined
                          className="edit"
                          onClick={() => {
                            setIsEditModalOpen(true);
                            setTypeName(type.name);
                            setTypeDuration(type.duration);
                            setTypePrice(type.price);
                            setTypeDescription(type.description);
                            setTypeId(type.id ?? "");
                          }}
                        />
                        <DeleteOutlined
                          className="delete"
                          onClick={async () => {
                            await adminService.deleteAppointmentType(
                              type.id ?? ""
                            );
                            window.location.reload();
                          }}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "transparent",
              headerBg: "transparent",
              titleColor: "white",
            },
            Form: {
              labelColor: "white",
              labelRequiredMarkColor: "red",
            },
            Input: {
              colorBgContainer: "transparent",
              colorText: "white",
            },
          },
        }}
      >
        <Modal
          okText="התחבר"
          title="התחברות"
          centered={true}
          open={loginModalOpen}
          onCancel={() => {
            setLoginModalOpen(false);
          }}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          destroyOnClose={true}
          style={{
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 50px rgba(227, 228, 267, 0.38)",
            border: "2px solid rgba(255, 255, 255, 0.20)",
            borderRadius: "20px",
          }}
        >
          <SignIn closeModal={handleCallback} />
        </Modal>

        <Modal
          okText="הוסף"
          centered={true}
          title="הוסף סוג תור"
          open={isAddModalOpen}
          onOk={handleAddOk}
          onCancel={() => {
            setIsAddModalOpen(false);
          }}
          destroyOnClose={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          style={{
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 50px rgba(227, 228, 267, 0.38)",
            border: "2px solid rgba(255, 255, 255, 0.20)",
            borderRadius: "20px",
          }}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            style={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Item<FieldType>
              label="שם תור"
              name="name"
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <Input
                value={typeName}
                onChange={(e) => {
                  setTypeName(e.target.value);
                }}
              ></Input>
            </Form.Item>
            <Form.Item<FieldType>
              label="משך תור"
              name="length"
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <Input
                value={typeDuration}
                onChange={(e) => {
                  setTypeDuration(Number(e.target.value));
                }}
              ></Input>
            </Form.Item>
            <Form.Item<FieldType>
              label="מחיר"
              name={["price"]}
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <Input
                value={typePrice}
                onChange={(e) => {
                  setTypePrice(Number(e.target.value));
                }}
              ></Input>
            </Form.Item>
            <Form.Item<FieldType>
              label="תיאור"
              name={["description"]}
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <TextArea
                showCount
                maxLength={50}
                value={typeDescription}
                onChange={(e) => {
                  setTypeDescription(e.target.value);
                }}
                style={{ height: 120, resize: "none" }}
              ></TextArea>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  handleAddOk();
                }}
              >
                הוסף
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          okText="שמור"
          centered={true}
          title="ערוך סוג תור"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={() => {
            setIsEditModalOpen(false);
          }}
          destroyOnClose={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          style={{
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 50px rgba(227, 228, 267, 0.38)",
            border: "2px solid rgba(255, 255, 255, 0.20)",
            borderRadius: "20px",
          }}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            style={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Item<FieldType>
              label="שם תור"
              name="name"
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <Input
                defaultValue={typeName}
                value={typeName}
                onChange={(e) => {
                  setTypeName(e.target.value);
                }}
              ></Input>
            </Form.Item>
            <Form.Item<FieldType>
              label="משך תור"
              name="length"
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <Input
                defaultValue={typeDuration}
                value={typeDuration}
                onChange={(e) => {
                  setTypeDuration(Number(e.target.value));
                }}
              ></Input>
            </Form.Item>
            <Form.Item<FieldType>
              label="מחיר"
              name={["price"]}
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <Input
                defaultValue={typePrice}
                value={typePrice}
                onChange={(e) => {
                  setTypePrice(Number(e.target.value));
                }}
              ></Input>
            </Form.Item>
            <Form.Item<FieldType>
              label="תיאור"
              name={["description"]}
              rules={[{ required: true, message: "שדה חובה" }]}
            >
              <TextArea
                defaultValue={typeDescription}
                showCount
                maxLength={50}
                value={typeDescription}
                onChange={(e) => {
                  setTypeDescription(e.target.value);
                }}
                style={{ height: 120, resize: "none" }}
              ></TextArea>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  handleEditOk();
                }}
              >
                שמור
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
