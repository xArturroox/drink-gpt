import { useNavigate } from "./useNavigate";
import { useAuthStore } from "@/lib/stores/authStore";
import { authService } from "@/lib/services/authService";
import { logger } from "@/lib/logger";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser } = useAuthStore();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      logger.error("Logout failed:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleLogout,
  };
};
