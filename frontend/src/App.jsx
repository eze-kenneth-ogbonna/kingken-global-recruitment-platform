import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { apiRequest } from "./api";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    apiRequest("/auth/me", { token })
      .then((payload) => setUser(payload.user))
      .catch(() => {
        localStorage.removeItem("authToken");
        setToken("");
      });
  }, [token]);

  const auth = useMemo(
    () => ({
      token,
      user,
      async login(email, password) {
        const payload = await apiRequest("/auth/login", {
          method: "POST",
          body: { email, password }
        });
        localStorage.setItem("authToken", payload.token);
        setToken(payload.token);
      },
      async register(email, password, role) {
        const payload = await apiRequest("/auth/register", {
          method: "POST",
          body: { email, password, role }
        });
        localStorage.setItem("authToken", payload.token);
        setToken(payload.token);
      },
      logout() {
        localStorage.removeItem("authToken");
        setToken("");
        setUser(null);
        navigate("/login");
      }
    }),
    [token, user, navigate]
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Kingken Global Platform</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          {token ? <button onClick={auth.logout}>Logout</button> : null}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage auth={auth} />} />
          <Route path="/register" element={<RegisterPage auth={auth} />} />
          <Route
            path="/dashboard"
            element={token ? <DashboardPage auth={auth} /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
