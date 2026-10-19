
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function Navbar() {
  const count = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link
          className="brand"
          to="/"
          aria-label="Liibaan Restaurant home"
        >
          <span className="brand-symbol" aria-hidden="true">
            L
          </span>

          <span className="brand-word">
            LIIBAAN
            <small>RESTAURANT</small>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/foods"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Menu
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Login
          </NavLink>

          <Link
  
          to="/cart"
           className="cart-link"
           aria-label={`View cart. ${count} items in cart`}
         >

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            <span>Cart</span>
            <span className="cart-count">{count}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
