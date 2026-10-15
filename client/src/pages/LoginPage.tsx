import { useState, type FormEvent } from "react";
import api from "../services/api";

const LoginPage = () =>  {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
    const response = await api.post("/auth/login", { email, password });
    setMessage(
        `Login successful for ${response.data.user.name}. Token received.`,
    );
      // This demo does not persist the token. Add a deliberate secure session strategy next.
    } catch {
    setMessage("Login failed. Check your email and password.");
    }
}

return (
    <section className="form-panel">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <label>
        Email
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        </label>
        <label>
        Password
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </label>
        <button type="submit">Login</button>
    </form>
    {message && <p role="status">{message}</p>}
    </section>
);
}

export default LoginPage;