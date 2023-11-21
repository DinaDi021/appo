import { urls } from "../constants";
import { IAuth, ITokens, IUser } from "../interfaces";
import { apiService, IRes } from "./apiServices";
import { usersService } from "./usersService";

const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";

const authService = {
  register(user: IAuth): IRes<IUser> {
    return apiService.post(urls.auth.register, user);
  },

  async login(user: IAuth): Promise<IUser> {
    const response = await apiService.post<ITokens>(urls.auth.login, user);
    const tokens = response.data;
    this.setTokens(tokens);

    const userResponse = await usersService.getProfile(tokens.data.id);
    const loggedInUser = userResponse.data;
    return loggedInUser;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const { data } = await apiService.post<ITokens>(urls.auth.refresh, {
      refresh,
    });
    this.setTokens(data);
  },

  async logout(): Promise<void> {
    await apiService.delete(urls.auth.logout);
    this.deleteTokens();
    return;
  },

  async logoutAll(): Promise<void> {
    await apiService.delete(urls.auth.logoutAll);
    this.deleteTokens();
    return;
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

  setTokens({ data }: ITokens): void {
    localStorage.setItem(accessTokenKey, data.access_token);
    localStorage.setItem(refreshTokenKey, data.refresh_token);
  },

  getAccessToken(): string {
    const access = localStorage.getItem(accessTokenKey);
    return access;
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
