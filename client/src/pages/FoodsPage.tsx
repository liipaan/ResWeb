import { useEffect, useState } from "react";
import api from "../services/api";
import type { Food } from "../types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../components/features/cart/cartSlice";

const FoodsPage = () => {
const [foods, setFoods] = useState<Food[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const dispatch = useAppDispatch();

useEffect(() => {
    api
    .get<Food[]>("/foods")
    .then((response) => setFoods(response.data))
    .catch(() =>
        setError("Could not load the menu. Check that the API is running."),
    )
    .finally(() => setLoading(false));
}, []);

if (loading) return <p className="container">Loading menu...</p>;
if (error) return <p className="container error">{error}</p>;

return (
    <section className="container">
    <h1>Our Menu</h1>
    <div className="food-grid">
        {foods
        .filter((food) => food.available)
        .map((food) => (
            <article className="food-card" key={food._id}>
            {food.imageUrl && <img src={food.imageUrl} alt={food.name} />}
            <div className="food-card-content">
                <h2>{food.name}</h2>
                <p>{food.description}</p>
                <strong>${food.price.toFixed(2)}</strong>
                <button onClick={() => dispatch(addToCart(food))}>
                Add to cart
                </button>
            </div>
            </article>
        ))}
    </div>
    {foods.length === 0 && (
        <p>No food items yet. Add some from the admin API.</p>
    )}
    </section>
);
}

export default FoodsPage;