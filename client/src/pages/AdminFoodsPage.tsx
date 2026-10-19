
import { useState, type FormEvent } from "react";
import api from "../services/api";

export default function AdminFoodsPage() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("5");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      await api.post(
        "/foods",
        {
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          category: category.trim(),
          available: true,
        },
        {
          headers: { Authorization: `Bearer ${token.trim()}` },
        },
      );

      setMessage("success:Food created successfully.");
      setName("");
      setDescription("");
      setPrice("5");
      setCategory("");
    } catch {
      setMessage(
        "error:Could not create food. Check your admin token, category ID, and API connection.",
      );
    } finally {
      setSaving(false);
    }
  }

  const messageType = message.startsWith("success:")
    ? "success"
    : "error";
  const messageText = message.replace(/^(success|error):/, "");

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="menu-eyebrow">LIIBAAN MANAGEMENT</p>
        <h1>Food <span>studio.</span></h1>
        <p>
          Add something delicious to the menu. Your new dish will
          be marked as available.
        </p>
      </header>

      <div className="admin-layout">
        <aside className="admin-side-note">
          <span className="admin-note-mark">✳</span>
          <h2>Every dish has a story.</h2>
          <p>
            Keep your menu fresh with clear descriptions, accurate
            prices, and the right category.
          </p>
          <div className="admin-note-rule" />
          <p className="admin-note-small">
            YOUR KITCHEN. YOUR MENU. YOUR STANDARD.
          </p>
        </aside>

        <section className="admin-form-card">
          <div className="admin-form-heading">
            <span className="admin-step">01 / NEW ITEM</span>
            <h2>Add a dish</h2>
            <p>Complete the details below to publish a menu item.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-field">
              <label htmlFor="admin-token">Admin bearer token</label>
              <div className="token-field">
                <input
                  id="admin-token"
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="Enter your admin token"
                  autoComplete="off"
                  required
                />
                <button
                  className="token-toggle"
                  type="button"
                  onClick={() => setShowToken((visible) => !visible)}
                >
                  {showToken ? "Hide" : "Show"}
                </button>
              </div>
              <small>Used to authorize this request to your API.</small>
            </div>

            <div className="admin-field">
              <label htmlFor="food-name">Dish name</label>
              <input
                id="food-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Grilled chicken platter"
                minLength={2}
                maxLength={100}
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="food-description">Description</label>
              <textarea
                id="food-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the dish and what makes it special..."
                maxLength={1000}
              />
            </div>

            <div className="admin-fields-row">
              <div className="admin-field">
                <label htmlFor="food-price">Price (USD)</label>
                <div className="price-field">
                  <span>$</span>
                  <input
                    id="food-price"
                    type="number"
                    value={price}
                    min="0.01"
                    max="100000"
                    step="0.01"
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="admin-field">
                <label htmlFor="food-category">Category ID</label>
                <input
                  id="food-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="MongoDB ID"
                  required
                />
              </div>
            </div>

            {message && (
              <div
                className={`admin-feedback ${messageType}`}
                role="status"
              >
                <span>{messageType === "success" ? "✓" : "!"}</span>
                {messageText}
              </div>
            )}

            <button
              className="admin-submit"
              type="submit"
              disabled={saving}
            >
              {saving ? "Publishing..." : "Publish menu item"}
              {!saving && <span>↗</span>}
            </button>

            <p className="admin-form-footnote">
              New items are created as available and can appear on the menu.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
