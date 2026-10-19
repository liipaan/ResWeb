
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import type { Food } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../components/features/cart/cartSlice";

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [addedId, setAddedId] = useState("");
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    api
      .get<Food[]>("/foods")
      .then((response) => setFoods(response.data))
      .catch(() =>
        setError("We couldn't load the menu. Please try again shortly."),
      )
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        foods
          .filter((food) => food.available)
          .map((food) => food.category)
          .filter(
            (value): value is string =>
              typeof value === "string" && value.length > 0,
          ),
      ),
    ],
    [foods],
  );

  const visibleFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return food.available && matchesSearch && matchesCategory;
  });

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  function handleAdd(food: Food) {
    dispatch(addToCart(food));
    setAddedId(food._id);
    window.setTimeout(() => setAddedId(""), 1200);
  }

  return (
    <div className="menu-page">
      <section className="menu-banner">
        <p className="menu-eyebrow">GOOD FOOD, GOOD COMPANY</p>
        <h1>Our Menu<span>.</span></h1>
        <p>
          Thoughtfully prepared favorites, made to bring everyone
          to the table.
        </p>
        <div className="menu-banner-bottom">
          <span>{foods.filter((food) => food.available).length} dishes to discover</span>
          <span className="menu-banner-dot">✳</span>
          <span>Made with care at Liibaan</span>
        </div>
      </section>

      <section className="menu-content">
        <div className="menu-toolbar">
          <div>
            <p className="section-kicker">FROM OUR KITCHEN</p>
            <h2>Find your favorite</h2>
          </div>

          <a className="menu-cart-summary" href="/cart">
            <span className="menu-cart-icon">🛒</span>
            Your cart <strong>{cartCount}</strong>
          </a>
        </div>

        <div className="menu-controls">
          <label className="menu-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search dishes..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search dishes"
            />
          </label>

          <div className="category-filters" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`category-chip ${category === item ? "selected" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="menu-message">
            <span className="loading-mark">✳</span>
            <p>Preparing your menu...</p>
          </div>
        )}

        {error && (
          <div className="menu-message menu-error" role="alert">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="menu-results-line">
              <span>
                {visibleFoods.length} {visibleFoods.length === 1 ? "dish" : "dishes"}
              </span>
              <span>Freshly selected for you</span>
            </div>

            {visibleFoods.length > 0 ? (
              <div className="food-grid">
                {visibleFoods.map((food) => (
                  <article className="food-card" key={food._id}>
                    <div className="food-card-image">
                      {food.imageUrl ? (
                        <img src={food.imageUrl} alt={food.name} />
                      ) : (
                        <div className="food-image-placeholder">
                          <span>LIIBAAN</span>
                          <span>Prepared with care</span>
                        </div>
                      )}
                      {food.category && typeof food.category === "string" && (
                        <span className="food-category-label">
                          {food.category}
                        </span>
                      )}
                    </div>

                    <div className="food-card-content">
                      <div className="food-card-heading">
                        <h2>{food.name}</h2>
                        <strong className="food-price">
                          ${food.price.toFixed(2)}
                        </strong>
                      </div>

                      <p className="food-description">
                        {food.description || "A delicious favorite from our kitchen."}
                      </p>

                      <button
                        className="food-add-button"
                        type="button"
                        onClick={() => handleAdd(food)}
                      >
                        {addedId === food._id ? (
                          <>Added to cart <span>✓</span></>
                        ) : (
                          <>Add to cart <span>+</span></>
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="menu-empty">
                <span>✳</span>
                <h3>No dishes found</h3>
                <p>Try another search or select a different category.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Show all dishes
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
