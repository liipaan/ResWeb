import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function Navbar() {
const count = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
);

return (
    <nav className="navbar">
    <Link className="brand" to="/">
        Liibaan Restaurant
    </Link>
    <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/foods">Menu</Link>
        <Link to="/login">Login</Link>
        <span className="cart-count">Cart: {count}</span>
    </div>
    </nav>
);
}