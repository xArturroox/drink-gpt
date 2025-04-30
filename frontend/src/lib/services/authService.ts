import type { LoginCredentials, LoginResponse } from "@/types";
import { login as apiLogin, logout as apiLogout } from "@/lib/api";

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiLogin(credentials);
  }

  async logout(): Promise<void> {
    return apiLogout();
  }
}

export const authService = new AuthService();
