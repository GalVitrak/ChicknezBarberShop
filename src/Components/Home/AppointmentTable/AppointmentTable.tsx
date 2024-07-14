import "./AppointmentTable.css";
import { useState } from "react";
import AppointmentTypeModel from "../../../Models/AppointmentTypeModel";
import { Loading } from "../../Layout/Loading/Loading";
import adminService from "../../../Services/AdminService";
import { Modal } from "antd";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";

type AppointmentTableProps = {
  types: AppointmentTypeModel[];
};

export function AppointmentTable(props: AppointmentTableProps): JSX.Element {
  const [types] = useState<AppointmentTypeModel[]>(props.types);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeName, setTypeName] = useState<string>("");
  const [typeDescription, setTypeDescription] = useState<string>("");
  const [typePrice, setTypePrice] = useState<number>(0);
  const [typeDuration, setTypeDuration] = useState<number>(15);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newType = new AppointmentTypeModel(
      typeName,
      typeDuration,
      typePrice,
      typeDescription
    );
    adminService.addAppointmentType(newType);
    types.push(newType);
    setIsModalOpen(false);
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
                      navigate("/auth");
                    }
                    //open modal to make appointment
                  }}
                >
                  <td>{type.name}</td>
                  <td>{type.duration}</td>
                  <td>{type.price}</td>
                  <td>{type.description}</td>
                  {authStore.getState().user?.role && (
                    <td>
                      <div className="tableOptions">
                        <EditOutlined className="edit" />
                        <DeleteOutlined
                          className="delete"
                          onClick={() =>
                            adminService.deleteAppointmentType(type.id ?? "")
                          }
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
      <Modal
        title="הוסף סוג תור"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <form>
          <label>שם תור:</label>
          <input
            type="text"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
          <label>משך תור</label>
          <input
            type="number"
            value={typeDuration}
            onChange={(e) => setTypeDuration(Number(e.target.value))}
          />
          <label>מחיר</label>
          <input
            type="number"
            value={typePrice}
            onChange={(e) => setTypePrice(Number(e.target.value))}
          />
          <label>תיאור קצר</label>
          <textarea
            value={typeDescription}
            onChange={(e) => setTypeDescription(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
}
