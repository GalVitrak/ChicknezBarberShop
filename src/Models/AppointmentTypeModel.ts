class AppointmentTypeModel {
  public id?: string;
  public name: string;
  public duration: number;
  public price: number;
  public description: string;

  public constructor(
    name: string,
    duration: number,
    price: number,
    description: string,
    id?: string
  ) {
    this.name = name;
    this.duration = duration;
    this.price = price;
    this.description = description;
    this.id = id;
  }
}

export default AppointmentTypeModel;
