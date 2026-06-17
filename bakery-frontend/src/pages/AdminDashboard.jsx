import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-page">

      <div className="admin-dashboard-wrapper">

        {/* Header */}
        <div className="dashboard-header">

          <span className="dashboard-badge">
            Bakery Admin Panel
          </span>

          <h1 className="dashboard-title">
            Admin Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Manage products, monitor orders,
            and maintain your bakery store
            experience.
          </p>

        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-grid">

          {/* Add Product */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/admin/add-product")
            }
          >

            <div className="dashboard-icon">
              🍰
            </div>

            <h3>Add Product</h3>

            <p>
              Upload and manage bakery items
              for your customers.
            </p>

            <button className="dashboard-btn">
              Open Panel
            </button>

          </div>

          {/* Orders */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/admin/orders")
            }
          >

            <div className="dashboard-icon">
              📦
            </div>

            <h3>View Orders</h3>

            <p>
              Track customer orders and monitor
              bakery deliveries.
            </p>

            <button className="dashboard-btn">
              View Orders
            </button>

          </div>
          {/* Manage Products */}
          <div
          className="dashboard-card"
          onClick={() =>
            navigate("/admin/products")
          }
        >

          <div className="dashboard-icon">
            🛒
          </div>

          <h3>Manage Products</h3>

          <p>
            Edit prices, stock, product details and product images.
          </p>

          <button className="dashboard-btn">
            Manage Products
          </button>

        </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;