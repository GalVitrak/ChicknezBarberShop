class CredentialsModel {
  public phoneNumber: string;
  public OTP: string;

  public constructor(phoneNumber: string, OTP: string) {
    this.phoneNumber = phoneNumber;
    this.OTP = OTP;
  }
}

export default CredentialsModel;
