import { useState, useEffect } from "react";
import AppointmentTypeModel from "../../../Models/AppointmentTypeModel";
import adminService from "../../../Services/AdminService";
import "./MakeAppointment.css";
import { AppointmentTable } from "../AppointmentTable/AppointmentTable";
import { Loading } from "../../Layout/Loading/Loading";

export function MakeAppointment(): JSX.Element {
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
      <h2>בחר סוג תור</h2>
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <div className="list">
          <AppointmentTable types={types} />
        </div>
      )}
    </div>
  );
}
