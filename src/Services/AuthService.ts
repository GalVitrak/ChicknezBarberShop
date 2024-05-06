/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthActionType, authStore } from "../Redux/AuthState";
import { httpsCallable } from "firebase/functions";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialsModel";
import { functions } from "../../firebase-config";

class AuthService {
  public async userExists(phone: string): Promise<boolean> {
    const countPhone = httpsCallable(functions, "countPhone");
    const users: any = await countPhone({ phone: phone });
    return users.data.count > 0;
  }

  public async registerUser(user: UserModel): Promise<void> {
    const registerUser = httpsCallable(functions, "registerUser");
    await registerUser(user);
  }

  public async updateOTP(phone: string): Promise<void> {
    const updateOTP = httpsCallable(functions, "updateOTP");
    await updateOTP({ phone: phone });
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const login = httpsCallable(functions, "login");
    const response = await login(credentials);
    const token = response.data;
    const payload = {
      token: token,
    };
    authStore.dispatch({ type: AuthActionType.Login, payload: payload });
  }

  public logout() {
    authStore.dispatch({ type: AuthActionType.Logout });
  }
}

const authService = new AuthService();

export default authService;
