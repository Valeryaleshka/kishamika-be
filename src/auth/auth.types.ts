export type AuthInput = { email: string; password: string };
export type SignInpData = { userId: number; email: string };
export type AuthResult = {
  accessToken: string;
  userId: number;
  username: string;
};
