import { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../../services/productService";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loader from "../../../components/Loader/Loader";
import formatPrice from "../../../utils/formatPrice";
import "./AdminManageProducts.css";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts({ page: 1 });
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error loading products:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load products",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  const startEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      costPrice: product.costPrice ?? 0,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
    });
  };

  const submitEdit = async (id) => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);
    await updateProduct(id, formData);
    setEditing(null);
    setImage(null);
    loadProducts();
  };

  if (loading) return <Loader label="Loading products" />;

  if (error) {
    return (
      <PageTransition>
        <div className="admin-manage-products">
          <h2>Manage products</h2>
          <div
            className="error-message"
            style={{
              padding: "20px",
              background: "#fee",
              color: "#c33",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Error:</strong> {error}
            </p>
            <button onClick={loadProducts} style={{ marginTop: "10px" }}>
              Retry
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="admin-manage-products">
        <h2>Manage products</h2>
        <div className="admin-manage-products-list">
          {products.map((product) => (
            <div key={product._id} className="admin-manage-products-card">
              <img src={product.image.url} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <p>{formatPrice(product.price)}</p>
                <p>Cost: {formatPrice(product.costPrice ?? 0)}</p>
              </div>
              <div className="admin-manage-products-actions">
                <button type="button" onClick={() => startEdit(product)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
              {editing === product._id && (
                <div className="admin-manage-products-edit-form">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={form.costPrice}
                    onChange={(e) =>
                      setForm({ ...form, costPrice: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: e.target.value })
                    }
                  />
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="admin-manage-products-edit-actions">
                    <button
                      type="button"
                      onClick={() => submitEdit(product._id)}
                    >
                      Save
                    </button>
                    <button type="button" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminManageProducts;
