import { useMemo, useState } from "react";
import { apiRequest } from "../api";

export function DashboardPage({ auth }) {
  const { user, token } = auth;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const profileComplete = useMemo(() => {
    if (!user) {
      return false;
    }
    if (user.role === "WORKER") {
      return Boolean(user.workerProfile);
    }
    if (user.role === "EMPLOYER") {
      return Boolean(user.employerProfile);
    }
    return true;
  }, [user]);

  async function createProfile() {
    setMessage("");
    setError("");
    try {
      if (user.role === "WORKER") {
        await apiRequest("/profiles/worker/me", {
          method: "POST",
          token,
          body: {
            fullName: "Demo Worker",
            phone: "+0000000000",
            country: "Nigeria",
            skills: ["Hospitality"]
          }
        });
      }

      if (user.role === "EMPLOYER") {
        await apiRequest("/profiles/employer/me", {
          method: "POST",
          token,
          body: {
            companyName: "Demo Employer Inc.",
            website: "https://example.com",
            country: "Kuwait"
          }
        });
      }

      setMessage("Profile saved. Refresh dashboard to see updated completeness.");
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <section className="card">
      <h2>Dashboard</h2>
      <p>Signed in as {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Profile complete: {profileComplete ? "Yes" : "No"}</p>
      {!profileComplete && user.role !== "ADMIN" ? (
        <button onClick={createProfile}>Create profile</button>
      ) : null}
      {message ? <p className="success">{message}</p> : null}
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}
