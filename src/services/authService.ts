import { urls } from "../constants";
import { IAuth, ITokens, ITokensResponse, IUserResponse } from "../interfaces";
import { apiService, IRes } from "./apiServices";
import { usersService } from "./usersService";

const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";

const authService = {
  register(user: IAuth): IRes<IUserResponse> {
    return apiService.post(urls.auth.register, user);
  },

  async login(user: IAuth): Promise<IUserResponse> {
    const response = await apiService.post<ITokensResponse>(
      urls.auth.login,
      user,
    );
    const tokensResponse = response.data;
    this.setTokens(tokensResponse.data);

    const userResponse = await usersService.getProfile(tokensResponse.data.id);
    return userResponse.data;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const response = await apiService.post<ITokensResponse>(urls.auth.refresh, {
      refresh,
    });
    const tokensResponse = response.data;
    this.setTokens(tokensResponse.data);
  },

  async logout(): Promise<void> {
    await apiService.delete(urls.auth.logout);
    this.deleteTokens();
  },

  async logoutAll(): Promise<void> {
    await apiService.delete(urls.auth.logoutAll);
    this.deleteTokens();
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

  async changePassword(
    token: string,
    old_password: string,
    new_password: string,
  ): Promise<void> {
    await apiService.post(urls.auth.changePassword, {
      token,
      old_password,
      new_password,
    });
  },

  setTokens(tokens: ITokens): void {
    localStorage.setItem(accessTokenKey, tokens.access_token);
    localStorage.setItem(refreshTokenKey, tokens.refresh_token);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(accessTokenKey);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(refreshTokenKey);
  },

  deleteTokens(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },
};

export { authService };
