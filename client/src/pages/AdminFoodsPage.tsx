import { useState, type FormEvent } from "react";
import api from "../services/api";

export default function AdminFoodsPage() {
const [token, setToken] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("5");
const [category, setCategory] = useState("");
const [message, setMessage] = useState("");

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
    await api.post(
        "/foods",
        { name, description, price: Number(price), category, available: true },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    setMessage("Food created successfully.");
    setName("");
    setDescription("");
    } catch {
    setMessage(
        "Could not create food. Check the token, admin role, category ID, and API.",
    );
    }
}

return (
    <section className="form-panel">
    <h1>Admin: Add Food</h1>
    <form onSubmit={handleSubmit}>
        <label>
        Admin bearer token
        <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
        />
        </label>
        <label>
        Food name
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
        />
        </label>
        <label>
        Description
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <label>
        Price
        <input
            type="number"
            value={price}
            min="0"
            step="0.01"
            onChange={(e) => setPrice(e.target.value)}
            required
        />
        </label>
        <label>
        Category MongoDB ID
        <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
        />
        </label>
        <button type="submit">Create food</button>
    </form>
    {message && <p role="status">{message}</p>}
    </section>
);
}