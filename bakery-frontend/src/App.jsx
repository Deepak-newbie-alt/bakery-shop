import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminRoute from "./components/AdminRoute";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart =
        localStorage.getItem("cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch {
      return [];
    }
  });
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
);

  const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  localStorage.setItem("theme", theme);
}, [theme]);


  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#fffaf5",
            color: "#3e2c23",
            border: "1px solid rgba(120,90,70,0.12)",
            borderRadius: "14px"
          }
        }}
      />
      <Navbar
        cartCount={cartCount}
        user={user}
        setUser={setUser}
        theme={theme}
        setTheme={setTheme}
      />

      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
          <AdminRoute>
          <AdminDashboard />
          </AdminRoute>
          } 
          />
        <Route 
          path="/admin/add-product" 
          element={
          <AdminRoute>
          <AddProduct />
          </AdminRoute>
        } 
        />

        <Route 
          path="/admin/orders" 
          element={
            <AdminRoute>
              <AdminOrders/>
            </AdminRoute>
          }
        />

        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;