import { useEffect, useState } from "react";
import API from "../services/api";
import "./Home.css";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert("Added to cart");
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted");
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      {/* 🔥 Hero Section */}
      <div className="hero">
        <h1>Freshly Baked Luxury</h1>
        <p>Experience premium handcrafted delights</p>
      </div>

      {/* Title */}
      <h2 className="title">Our Collection</h2>

      {products.length === 0 ? (
        <div className="empty-products">
          <h3>No bakery items available right now.</h3>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p._id}>
              <div className="image-container">
                <img
                  src={p.image}
                  alt={p.name}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400/f8efe6/6f5b52?text=Bakery+Item";
                  }}
                />
              </div>

              <div className="product-info">
                <h3>{p.name}</h3>
                <p className="price">₹{p.price}</p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>

                {user?.isAdmin && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;