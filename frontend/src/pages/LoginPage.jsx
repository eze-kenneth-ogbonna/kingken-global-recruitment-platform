import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage({ auth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await auth.login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="card">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}
