import { Button } from "@/components/ui/button";
import { useNavigate } from "@/components/hooks/useNavigate";
import { logger } from "@/lib/logger";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // This will be replaced with actual logout API call
      navigate("/logout");
    } catch (error) {
      logger.error("Logout failed:", error);
    }
  };

  return (
    <Button variant="ghost" onClick={handleLogout} className="text-gray-200 hover:text-white hover:bg-gray-700">
      Logout
    </Button>
  );
};
