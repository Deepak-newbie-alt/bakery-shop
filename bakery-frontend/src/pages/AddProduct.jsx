import { useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import "./AddProduct.css";

const AddProduct = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // Basic image validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setImage(file);
  };

  const resetForm = () => {

    setName("");
    setPrice("");
    setCategory("");
    setStock("");

    setImage(null);
  };

  const handleAddProduct = async () => {

    if (
      !name ||
      !price ||
      !category ||
      !stock ||
      !image
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("image", image);

      await API.post(
        "/products",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      toast.success(
        "Product added successfully"
      );

      resetForm();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to add product"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">

      <div className="add-product-wrapper">

        {/* Header */}
        <div className="add-product-header">

          <span className="admin-badge">
            Admin Product Panel
          </span>

          <h1>Add New Product</h1>

          <p>
            Add fresh bakery items to your store
            collection.
          </p>

        </div>

        {/* Form Card */}
        <div className="add-product-card">

          <div className="form-grid">

            {/* Product Name */}
            <div className="input-group">

              <label>Product Name</label>

              <input
                type="text"
                className="admin-input"
                placeholder="Chocolate Cake"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            {/* Price */}
            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                className="admin-input"
                placeholder="499"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />
            </div>

            {/* Category */}
            <div className="input-group">

              <label>Category</label>

              <input
                type="text"
                className="admin-input"
                placeholder="Cake"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />
            </div>

            {/* Stock */}
            <div className="input-group">

              <label>Stock</label>

              <input
                type="number"
                className="admin-input"
                placeholder="20"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
              />
            </div>
          </div>

          {/* Upload */}
          <div className="upload-section">

            <label className="upload-label">
              Product Image
            </label>

            <label className="upload-box">

              <input
                type="file"
                className="file-input"
                onChange={handleImageChange}
              />

              <span>
                Upload bakery product image
              </span>

            </label>

            {/* Preview */}
            {image && (

              <div className="preview-container">

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="preview-img"
                />

              </div>
            )}
          </div>

          {/* Button */}
          <button
            className="add-product-btn"
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;