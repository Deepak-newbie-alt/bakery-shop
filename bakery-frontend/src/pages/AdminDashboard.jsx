import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
  totalProducts: 0,
  totalOrders: 0,
  pendingOrders: 0,
  revenue: 0,
  lowStockProducts: 0
  });

  const navigate = useNavigate();

  useEffect(() => {

  const fetchStats = async () => {

    try {

      const [productsRes, ordersRes] =
        await Promise.all([
          API.get("/products"),
          API.get("/orders")
        ]);

      const products =
        productsRes.data;

      const orders =
        ordersRes.data;

      const revenue =
        orders.reduce(
          (sum, order) =>
            sum + order.totalPrice,
          0
        );

      const pendingOrders =
        orders.filter(
          (order) =>
            order.status === "pending"
        ).length;

      const lowStockProducts =
        products.filter(
          (product) => product.stock <= 5
        ).length;

      setStats({
        totalProducts:
          products.length,

        totalOrders:
          orders.length,

        pendingOrders,

        revenue,
        lowStockProducts
      });

    } catch (error) {

      console.log(error);
    }
  };

  fetchStats();

  }, []);

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

        {/* Stats Cards */}
        <div className="stats-grid">

        <div className="stat-card">
          <h3>{stats.totalProducts}</h3>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalOrders}</h3>
          <p>Orders</p>
        </div>

        <div className="stat-card">
          <h3>{stats.pendingOrders}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>₹{stats.revenue}</h3>
          <p>Revenue</p>
        </div>

        <div className="stat-card low-stock-card">
          <h3>{stats.lowStockProducts}</h3>
          <p>Low Stock</p>
        </div>

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