import { useEffect, useState } from "react";
import "./AppointmentTypes.css";
import AppointmentTypeModel from "../../../Models/AppointmentTypeModel";
import { Loading } from "../../Layout/Loading/Loading";
import adminService from "../../../Services/AdminService";
import { AppointmentTable } from "../../Home/AppointmentTable/AppointmentTable";

export function AppointmentTypes(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<AppointmentTypeModel[]>([]);

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    setLoading(true);
    try {
      const types = await adminService.getAppointmentTypes();
      setTypes(types);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="AppointmentTypes">
      <h2>סוגי תורים</h2>
      <div className="list">
        {loading ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          <>
            <AppointmentTable types={types} />
          </>
        )}
      </div>
    </div>
  );
}
