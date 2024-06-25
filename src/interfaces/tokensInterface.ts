export interface ITokens {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  id: number;
}

export interface ITokensResponse {
  data: ITokens;
}
