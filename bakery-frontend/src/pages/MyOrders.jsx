import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import "./MyOrders.css";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await API.get("/orders/my");

        setOrders(res.data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to fetch orders"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  const getStatusClass = (status) => {

    switch (status?.toLowerCase()) {

      case "delivered":
        return "status-delivered";

      case "pending":
        return "status-pending";

      case "processing":
        return "status-processing";

      default:
        return "status-default";
    }
  };

  const formatDate = (date) => {
  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  );
  };

  return (
    <div className="orders-page">

      <div className="orders-wrapper">

        {/* Header */}
        <div className="orders-header">

          <span className="orders-badge">
            Bakery Order History
          </span>

          <h1 className="orders-title">
            My Orders
          </h1>

          <p className="orders-subtitle">
            Track all your delicious bakery purchases
            in one place.
          </p>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="orders-loading">
            Loading your orders...
          </div>

        ) : orders.length === 0 ? (

          /* Empty State */
          <div className="empty-orders">

            <div className="empty-orders-icon">
              📦
            </div>

            <h3>No orders yet</h3>

            <p>
              Your bakery orders will appear here
              once you place them.
            </p>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order._id}
              >

                {/* Top */}
                <div className="order-top">

                  <div>

                    <p className="order-label">
                      Order ID
                    </p>
                    <p className="order-date">
                      🕒{formatDate(order.createdAt)}
                    </p>

                    <h4 className="order-id">
                      #{order._id.slice(-8)}
                    </h4>

                  </div>

                  <span
                    className={`order-status ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Products */}
                <div className="order-products">

                  {order.products.map(
                    (item, index) => (

                      <div
                        className="order-item"
                        key={index}
                      >

                        <div>

                          <h5>{item.name}</h5>

                          <p>
                            Quantity: {item.quantity}
                          </p>

                        </div>

                        <span>
                          ₹{item.price}
                        </span>

                      </div>
                    )
                  )}
                </div>

                {/* Bottom */}
                <div className="order-footer">

                  <div className="order-total">
                    Total: ₹{order.totalPrice}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;