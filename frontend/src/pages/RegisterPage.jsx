import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage({ auth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "WORKER" });
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await auth.register(form.email, form.password, form.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="card">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          Password
          <input
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <label>
          Role
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="WORKER">Worker</option>
            <option value="EMPLOYER">Employer</option>
          </select>
        </label>
        <button type="submit">Create account</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}
