import { urls } from "../constants";
import { IAuth, ITokens, IUser } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const accessTokenKey = "access";
const refreshTokenKey = "refresh";

const authService = {
  register(user: IAuth): IRes<IUser> {
    return apiService.post(urls.auth.register, user);
  },
  async login(user: IAuth): Promise<ITokens> {
    const { data } = await apiService.post<ITokens>(urls.auth.login, user);
    this.setTokens(data);
    return data;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const { data } = await apiService.post<ITokens>(urls.auth.refresh, {
      refresh,
    });
    this.setTokens(data);
  },

  async forgotPassword(email: string, resetUrl: string): Promise<void> {
    await apiService.post(urls.auth.forgotPassword, { email, resetUrl });
  },

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<void> {
    await apiService.post(urls.auth.resetPassword, {
      email,
      token,
      newPassword,
    });
  },

  setTokens({ refresh, access }: ITokens): void {
    localStorage.setItem(accessTokenKey, access);
    localStorage.setItem(refreshTokenKey, refresh);
  },

  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  },
  getRefreshToken(): string {
    return localStorage.getItem(refreshTokenKey);
  },
  deleteTokens(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },
};

export { authService };
