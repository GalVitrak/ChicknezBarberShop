class AvailabilityModel {
  public id?: string;
  public day: string;
  public month: string;
  public year: string;
  public startTime: string;
  public endTime: string;

  public constructor(
    day: string,
    month: string,
    year: string,
    startTime: string,
    endTime: string
  ) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export default AvailabilityModel;
