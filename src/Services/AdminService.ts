/* eslint-disable @typescript-eslint/no-unused-vars */
import { functions } from "../../firebase-config";
import AppointmentTypeModel from "../Models/AppointmentTypeModel";
import AvailabilityModel from "../Models/AvailabilityModel";
import UserModel from "../Models/UserModel";
import { httpsCallable } from "firebase/functions";

class AdminService {
  public async getUsers(): Promise<UserModel[]> {
    const getUsers = httpsCallable(functions, "getUsers");
    const response = await getUsers();
    const users: UserModel[] = response.data as UserModel[];
    return users;
  }

  public async setAvailability(availability: AvailabilityModel): Promise<void> {
    const setAvailability = httpsCallable(functions, "setAvailability");
    await setAvailability(availability);
  }

  public async getAvailability(
    month: string,
    year: string
  ): Promise<AvailabilityModel[]> {
    const getAvailability = httpsCallable(functions, "getAvailability");
    const response = await getAvailability({
      month,
      year,
    });
    const availability: AvailabilityModel[] =
      response.data as AvailabilityModel[];
    console.log(availability);

    return availability;
  }

  public async deleteAvailability(id: string): Promise<void> {
    const deleteAvailability = httpsCallable(functions, "deleteAvailability");
    await deleteAvailability({ id: id });
  }

  public async setDayOff(dayOff: number): Promise<void> {
    console.log(dayOff);
    const setDayOff = httpsCallable(functions, "setDayOff");
    await setDayOff({ dayOff: dayOff });
  }

  public async getDayOff(): Promise<number> {
    const getDayOff = httpsCallable(functions, "getDayOff");
    const response = await getDayOff();
    const dayOff: number = response.data as number;
    return dayOff;
  }

  public async getAppointmentTypes(): Promise<AppointmentTypeModel[]> {
    const getAppointmentTypes = httpsCallable(functions, "getAppointmentTypes");
    const response = await getAppointmentTypes();
    const types: AppointmentTypeModel[] =
      response.data as AppointmentTypeModel[];
    return types;
  }

  public async addAppointmentType(type: AppointmentTypeModel): Promise<void> {
    const addAppointmentType = httpsCallable(functions, "addAppointmentType");
    await addAppointmentType(type);
  }

  public async deleteAppointmentType(id: string): Promise<void> {
    const deleteAppointmentType = httpsCallable(
      functions,
      "deleteAppointmentType"
    );
    await deleteAppointmentType({ id: id });
  }
}

const adminService = new AdminService();
export default adminService;
