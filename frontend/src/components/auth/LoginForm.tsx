import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useNavigate } from "../hooks/useNavigate";
import { authService } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state: { setUser: (user: { username: string } | null) => void }) => state.setUser);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!login.trim()) {
      newErrors.login = "Login is required";
    } else if (login.length < 3) {
      newErrors.login = "Login must be at least 3 characters";
    } else if (login.includes(" ")) {
      newErrors.login = "Login cannot contain spaces";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.login({ login, password });
      setUser({ username: response.username });
      navigate("/");
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="login">Login</Label>
        <Input
          id="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          disabled={isLoading}
          className={errors.login ? "border-red-500" : ""}
        />
        {errors.login && <p className="text-sm text-red-500">{errors.login}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      {globalError && (
        <Alert variant="destructive">
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};
