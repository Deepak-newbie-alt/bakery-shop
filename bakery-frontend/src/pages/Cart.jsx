import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {

  const [isPaying, setIsPaying] = useState(false);

  const total =cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
  )

  const totalItems = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
  );

const removeFromCart = (productId) => {
  const updatedCart = cart
    .map((item) =>
      item._id === productId
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCart(updatedCart);
};

const placeOrder = async () => {
    try {

      const orderData = {
        products: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          productId: item._id
        })),

        totalPrice: total
      };

      await API.post("/orders", orderData);

      setCart([]);

    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (productId) => {

    const product = cart.find(
      (item) => item._id === productId
    );

    if (
      product.quantity >= product.stock
    ) {
      toast.error(
        `Only ${product.stock} items available`
      );
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  };

  const handlePayment = async () => {

    if (cart.length === 0) return;

    try {

      setIsPaying(true);

      // Create Razorpay Order
      const { data } = await API.post(
        "/payment/create-order",
        {
          amount: total
        }
      );

      const options = {
        key: "rzp_test_SstrVmmiP75UW3",

        amount: data.amount,
        currency: data.currency,

        name: "Bakery Shop",

        description: "Bakery Order Payment",

        order_id: data.id,

        handler: async function (response) {

          const verifyRes = await API.post(
            "/payment/verify",
            {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature
            }
          );

          if (verifyRes.data.success) {

            await placeOrder();

          } else {
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#c97b63"
        }
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log("PAYMENT ERROR:", error);

      alert("Payment failed");

    } finally {

      setIsPaying(false);
    }
  };
  return (
    <div className="cart-container">

      <div className="cart-wrapper">

        {/* Header */}
        <div className="cart-header">

          <h1 className="cart-title">
            Your Bakery Cart
          </h1>

          <p className="cart-subtitle">
            Freshly selected treats waiting for checkout
          </p>

        </div>

        {cart.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🥐
            </div>

            <h3>Your cart feels a little empty</h3>

            <p>
              Add some delicious bakery items to continue.
            </p>

          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-list">

              {cart.map((item, index) => (

                <div className="cart-item" key={index}>

                  <div className="cart-item-left">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/200x200/f8efe6/6f5b52?text=Bakery";
                      }}
                    />

                    <div className="cart-item-info">

                      <h4>
                        {item.name}
                        <span className="quantity-badge">{item.quantity}</span>
                        </h4>

                      <p className="item-price">
                        ₹{item.price}
                      </p>

                    </div>
                  </div>

                <div className="quantity-controls">

                  <button
                    className="qty-btn"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    -
                  </button>

                  <span className="qty-value">{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>

                </div>

                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">

              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                className="order-btn"
                onClick={handlePayment}
                disabled={isPaying}
              >
                {isPaying
                  ? "Processing..."
                  : "Pay Now"}
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;