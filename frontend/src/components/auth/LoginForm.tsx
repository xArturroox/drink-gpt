import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useNavigate } from "../hooks/useNavigate";
import { authService } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { UserIcon, KeyIcon, GlassWater } from "lucide-react";

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
      newErrors.login = "Login jest wymagany";
    } else if (login.length < 3) {
      newErrors.login = "Login musi mieć co najmniej 3 znaki";
    } else if (login.includes(" ")) {
      newErrors.login = "Login nie może zawierać spacji";
    }

    if (!password) {
      newErrors.password = "Hasło jest wymagane";
    } else if (password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków";
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
      setGlobalError(error instanceof Error ? error.message : "Logowanie nie powiodło się");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-b from-chart-2/50 to-chart-2/30 rounded-2xl blur-xl" />
        <div className="relative bg-chart-2/10 backdrop-blur-xl rounded-2xl border border-chart-2/20 shadow-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/30 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-chart-2/20 rounded-full blur-3xl -ml-16 -mb-16" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-chart-2/5 to-transparent pointer-events-none" />
          <div className="relative space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <GlassWater className="h-12 w-12 text-chart-2" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Witaj ponownie!</h2>
              <p className="text-blue-200">Zaloguj się, aby kontynuować</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
              <div className="space-y-2">
                <Label htmlFor="login" className="text-blue-100">
                  Login
                </Label>
                <div className="relative group">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300 transition-colors group-hover:text-chart-2" />
                  <Input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    disabled={isLoading}
                    className={`pl-10 bg-blue-950/20 border-blue-300/20 focus:border-chart-2 focus:ring-chart-2/50 transition-all placeholder-blue-300/50 ${
                      errors.login ? "border-destructive ring-destructive/20" : "hover:border-blue-300/30"
                    }`}
                    data-testid="login-input"
                    placeholder="Wprowadź login"
                    autoComplete="username"
                  />
                </div>
                {errors.login && (
                  <p className="text-sm text-destructive" data-testid="login-error">
                    {errors.login}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-100">
                  Hasło
                </Label>
                <div className="relative group">
                  <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300 transition-colors group-hover:text-chart-2" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className={`pl-10 bg-blue-950/20 border-blue-300/20 focus:border-chart-2 focus:ring-chart-2/50 transition-all placeholder-blue-300/50 ${
                      errors.password ? "border-destructive ring-destructive/20" : "hover:border-blue-300/30"
                    }`}
                    data-testid="password-input"
                    placeholder="Wprowadź hasło"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive" data-testid="password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              {globalError && (
                <Alert
                  variant="destructive"
                  data-testid="login-error-message"
                  className="bg-destructive/10 border-destructive/20"
                >
                  <AlertDescription>{globalError}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-chart-2 hover:bg-chart-2/90 text-white transition-colors shadow-lg shadow-chart-2/20"
                disabled={isLoading}
                data-testid="login-submit-button"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Logowanie...
                  </>
                ) : (
                  "Zaloguj się"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
