import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import "./AdminOrders.css";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    try {

      const res = await API.get("/orders");

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    id,
    newStatus
  ) => {

    try {

      await API.put(
        `/orders/${id}`,
        {
          status: newStatus
        }
      );

      toast.success(
        "Order status updated"
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update status"
      );
    }
  };

  const getStatusClass = (status) => {

    switch (status?.toLowerCase()) {

      case "delivered":
        return "status-delivered";

      case "pending":
        return "status-pending";

      case "preparing":
        return "status-preparing";

      default:
        return "status-default";
    }
  };

  return (
    <div className="admin-orders-page">

      <div className="admin-orders-wrapper">

        {/* Header */}
        <div className="admin-orders-header">

          <span className="admin-orders-badge">
            Bakery Order Management
          </span>

          <h1 className="admin-orders-title">
            Manage Orders
          </h1>

          <p className="admin-orders-subtitle">
            Monitor customer purchases and
            update bakery delivery statuses.
          </p>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="orders-loading">
            Loading orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="empty-admin-orders">

            <div className="empty-icon">
              📦
            </div>

            <h3>No orders available</h3>

            <p>
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="admin-orders-list">

            {orders.map((order) => (

              <div
                className="admin-order-card"
                key={order._id}
              >

                {/* Top */}
                <div className="admin-order-top">

                  <div>

                    <p className="order-label">
                      Order ID
                    </p>

                    <h3 className="order-id">
                      #{order._id.slice(-8)}
                    </h3>

                  </div>

                  <span
                    className={`status-badge ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Customer */}
                <div className="customer-section">

                  <h4>
                    Customer Details
                  </h4>

                  <div className="customer-info">

                    <div>
                      <span>Name</span>
                      <p>{order.user?.name}</p>
                    </div>

                    <div>
                      <span>Email</span>
                      <p>{order.user?.email}</p>
                    </div>

                  </div>
                </div>

                {/* Products */}
                <div className="products-section">

                  <h4>Ordered Products</h4>

                  <div className="products-list">

                    {order.products.map(
                      (item, i) => (

                        <div
                          className="product-row"
                          key={i}
                        >

                          <div>

                            <h5>{item.name}</h5>

                            <p>
                              Qty:
                              {" "}
                              {item.quantity}
                            </p>

                          </div>

                          <span>
                            ₹{item.price}
                          </span>

                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Bottom */}
                <div className="admin-order-footer">

                  <h3 className="admin-total">
                    Total: ₹{order.totalPrice}
                  </h3>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="status-dropdown"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="preparing">
                      Preparing
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>
                  </select>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;