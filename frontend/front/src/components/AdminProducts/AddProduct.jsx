import React, { useState } from "react";
import "./AddProduct.css";
import AdminDashboard from "./AdminDashBoard";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    customId: "",
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/adddelete/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product added successfully");
        setFormData({
          customId: "",
          name: "",
          category: "",
          description: "",
          price: "",
          image: "",
        });
      } else {
        const errorData = await response.json();
        alert(
          `Error: ${errorData.message || "An error occurred while adding the product"}`
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
    }
  };

  return (
    <>
    <div className="container">
    <AdminDashboard />
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2 className="form-title">Add Product</h2>
      <input
        type="text"
        name="customId"
        value={formData.customId}
        onChange={handleChange}
        placeholder="Product ID"
        required
        className="form-input"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="form-input"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Product Category"
        required
        className="form-input"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        className="form-textarea"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product Price"
        required
        className="form-input"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="form-input"
      />
      <button type="submit" className="form-button">
        Add Product
      </button>
    </form>
    </div>
    </>
  );
};

export default AddProduct;
