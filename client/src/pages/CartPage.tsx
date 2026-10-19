
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  changeQuantity,
  clearCart,
  removeFromCart,
} from "../components/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <section className="cart-banner">
        <p className="menu-eyebrow">YOUR LIIBAAN ORDER</p>
        <h1>Your Cart<span>.</span></h1>
        <p>Everything you've chosen, gathered in one place.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-items-panel">
          <div className="cart-section-heading">
            <div>
              <p className="section-kicker">READY WHEN YOU ARE</p>
              <h2>Your selection</h2>
            </div>
            <span className="cart-items-count">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">✳</span>
              <h2>Your table is waiting.</h2>
              <p>
                Your cart is empty for now. Explore our menu and
                find something delicious.
              </p>
              <Link to="/foods" className="button button-primary">
                Explore the menu <span>↗</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-item-list">
                {items.map(({ food, quantity }) => (
                  <article className="cart-item" key={food._id}>
                    <div className="cart-item-image">
                      {food.imageUrl ? (
                        <img src={food.imageUrl} alt={food.name} />
                      ) : (
                        <span>LIIBAAN</span>
                      )}
                    </div>

                    <div className="cart-item-details">
                      <h3>{food.name}</h3>
                      <p>{food.description}</p>
                      <strong>${food.price.toFixed(2)} each</strong>

                      <button
                        className="cart-remove"
                        type="button"
                        onClick={() => dispatch(removeFromCart(food._id))}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="cart-item-right">
                      <strong className="cart-line-price">
                        ${(food.price * quantity).toFixed(2)}
                      </strong>

                      <div
                        className="quantity-control"
                        aria-label={`Quantity for ${food.name}`}
                      >
                        <button
                          type="button"
                          aria-label={`Decrease ${food.name} quantity`}
                          disabled={quantity <= 1}
                          onClick={() =>
                            dispatch(
                              changeQuantity({
                                foodId: food._id,
                                quantity: quantity - 1,
                              }),
                            )
                          }
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase ${food.name} quantity`}
                          disabled={quantity >= 50}
                          onClick={() =>
                            dispatch(
                              changeQuantity({
                                foodId: food._id,
                                quantity: quantity + 1,
                              }),
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-bottom-actions">
                <Link to="/foods" className="text-link">
                  ← Continue browsing
                </Link>
                <button
                  className="cart-clear"
                  type="button"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear cart
                </button>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <aside className="order-summary">
            <p className="section-kicker">THE TOTAL</p>
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Items ({itemCount})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="summary-pending">Calculated at checkout</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <p className="summary-note">
              Delivery charges and any applicable fees are not included yet.
            </p>

            <button
              className="checkout-button"
              type="button"
              onClick={() =>
                window.alert(
                  "Your order is ready to proceed. Checkout and payment must be connected before orders can be submitted.",
                )
              }
            >
              Proceed to checkout <span>↗</span>
            </button>

            <div className="summary-trust">
              <span>✳</span>
              Prepared with care by Liibaan Restaurant
            </div>
          </aside>
        )}
      </section>
    </div>
  );
}
