class AppointmentModel {
    public id?: string;
    public appointmentTypeId: string;
    public date: string;
    public time: string;
    public userPhoneNumber: string;
    public userFullName: string;
    public approved: boolean;
    public cancelled: boolean;

    public constructor(appointmentTypeId: string, date: string, time: string, userPhoneNumber: string, userFullName: string, approved: boolean, cancelled: boolean) {
        this.appointmentTypeId = appointmentTypeId;
        this.date = date;
        this.time = time;
        this.userPhoneNumber = userPhoneNumber;
        this.userFullName = userFullName;
        this.approved = approved;
        this.cancelled = cancelled;
    }
}

export default AppointmentModel;