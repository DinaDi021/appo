import { urls } from "../constants";
import { IAuth, ITokens, IUser } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";

const authService = {
  register(user: IAuth): IRes<IUser> {
    return apiService.post(urls.auth.register, user);
  },

  async login(user: IAuth): Promise<void> {
    const response = await apiService.post<ITokens>(urls.auth.login, user);
    const tokens = response.data;
    this.setTokens(tokens);
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const { data } = await apiService.post<ITokens>(urls.auth.refresh, {
      refresh,
    });
    this.setTokens(data);
  },

  async forgotPassword(email: string, url: string): Promise<void> {
    await apiService.post(urls.auth.forgotPassword, { email, url });
  },

  async resetPassword(
    email: string,
    password: string,
    token: string,
  ): Promise<void> {
    await apiService.post(urls.auth.resetPassword, {
      email,
      password,
      token,
    });
  },

  setTokens({ refresh_token, access_token }: ITokens): void {
    localStorage.setItem(accessTokenKey, access_token);
    localStorage.setItem(refreshTokenKey, refresh_token);
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
