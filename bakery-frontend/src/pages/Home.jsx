import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import "./Home.css";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =useState("All");
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
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

      // Stock validation
    if (
      existingProduct &&
      existingProduct.quantity >= product.stock
    ) {
      toast.error(
        `Only ${product.stock} items available`
      );
      return;
    }

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
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

  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const categories = [
  "All",
  ...new Set(
    products.map((product) => product.category)
  )
  ];

  return (
    <div className="home-container">
      {/* 🔥 Hero Section */}
      <div className="hero">
        <h1>Freshly Baked Luxury</h1>
        <p>Experience premium handcrafted delights</p>
      </div>

      {/* Title */}
      <h2 className="title">Our Collection</h2>

      {/* 🔍 Search Bar */}
    <div className="search-container">
      <input
      type="text"
      className="search-input"
      placeholder="Search cakes, pastries, cupcakes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>

    {/* Category Filter Buttons */}
    <div className="category-filter">

      {categories.map((category) => (

        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-btn active-category"
              : "category-btn"
          }
          onClick={() =>
            setSelectedCategory(category)
          }
        >
          {category}
        </button>

      ))}

    </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-products">
          <h3>No bakery items found.</h3>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
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

                <p className="stock-text">
                  Stock: {p.stock}
                </p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(p)}
                  disabled={p.stock <= 0}
                >
                  {p.stock <= 0
                    ? "Out of Stock"
                    : "Add to Cart"}
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