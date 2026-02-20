import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/productService";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Toast from "../../../components/Toast/Toast";
import useToast from "../../../hooks/useToast";
import "./AdminAddProduct.css";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    costPrice: "",
    category: "",
    stock: "",
    rating: "4.5",
    imageUrl: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { message, showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) {
      formData.append("image", image);
    }
    try {
      await createProduct(formData);
      navigate("/admin/products");
    } catch (error) {
      const text =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create product";
      showToast(text);
    }
  };

  return (
    <PageTransition>
      <div className="admin-add-product">
        <h2>Add product</h2>
        <form className="admin-add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Cost price"
            value={form.costPrice}
            onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button className="button" type="submit">
            Create product
          </button>
        </form>
        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default AdminAddProduct;
