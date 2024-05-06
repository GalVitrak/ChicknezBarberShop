class UserModel {
  public userId?: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public role?: boolean;

  public constructor(firstName: string, lastName: string, phoneNumber: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  public static phoneNumberValidation = {
    required: { value: true, message: "Missing phone number" },
    length: { value: 10, message: "Phone number must consist of 10 digits" },
    pattern: {
      value: "^05\\d{8}$",
      message: "Phone number must obey pattern of `05?-???-????`",
    },
  };
}

export default UserModel;
