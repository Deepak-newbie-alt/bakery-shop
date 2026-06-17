import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

import "./AdminProducts.css";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await API.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load products"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {

    const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

      await API.delete(
        `/products/${id}`
      );

      toast.success(
        "Product deleted"
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-products-page">
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="admin-products-page">

      <h1 className="admin-products-title">
        Manage Products
      </h1>

      <div className="admin-products-grid">

        {products.map((product) => (

          <div
            className="admin-product-card"
            key={product._id}
          >

            <img
              src={product.image}
              alt={product.name}
              className="admin-product-img"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/f8efe6/6f5b52?text=Bakery+Item";
              }}
            />

            <div className="admin-product-info">

              <h3 className="admin-product-name">
                {product.name}
              </h3>

              <p className="admin-product-price">
                ₹{product.price}
              </p>

              <p className="admin-product-stock">
                Stock: {product.stock}
              </p>

              <div className="admin-product-actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin/edit-product/${product._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminProducts;