export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};

export type AuthResponse = {
  user: AuthUser;
};

export type RegisterInput = {
  email: string;
  password: string;
  name?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
