import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageZoom from "../../components/ImageZoom/ImageZoom";
import RatingStars from "../../components/RatingStars/RatingStars";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import Toast from "../../components/Toast/Toast";
import PageTransition from "../../components/PageTransition/PageTransition";
import { fetchProduct, fetchProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import useToast from "../../hooks/useToast";
import dummyProducts from "../../data/dummyProducts";
import formatPrice from "../../utils/formatPrice";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {
    products: wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();
  const { message, showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProduct(id);
        if (!data) throw new Error("No product from API");
        setProduct(data);
        const list = await fetchProducts({ category: data.category, page: 1 });
        const relatedItems = list?.products?.length
          ? list.products
          : dummyProducts.filter((item) => item.category === data.category);
        setRelated(
          relatedItems.filter((item) => item._id !== data._id).slice(0, 4),
        );

        const recent = JSON.parse(localStorage.getItem("nc_recent") || "[]");
        const updated = [
          data,
          ...recent.filter((item) => item._id !== data._id),
        ].slice(0, 5);
        localStorage.setItem("nc_recent", JSON.stringify(updated));
      } catch (error) {
        const fallback = dummyProducts.find((item) => item._id === id);
        if (fallback) {
          setProduct(fallback);
          const relatedItems = dummyProducts.filter(
            (item) => item.category === fallback.category,
          );
          setRelated(
            relatedItems
              .filter((item) => item._id !== fallback._id)
              .slice(0, 4),
          );

          const recent = JSON.parse(localStorage.getItem("nc_recent") || "[]");
          const updated = [
            fallback,
            ...recent.filter((item) => item._id !== fallback._id),
          ].slice(0, 5);
          localStorage.setItem("nc_recent", JSON.stringify(updated));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const recentlyViewed = useMemo(() => {
    return JSON.parse(localStorage.getItem("nc_recent") || "[]");
  }, [id]);

  if (loading || !product) return <Loader label="Loading product" />;

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const toggleWishlist = async () => {
    if (isWishlisted) {
      await removeFromWishlist(product);
      showToast("Removed from wishlist");
    } else {
      await addToWishlist(product);
      showToast("Saved to wishlist");
    }
  };

  const handleAdd = async () => {
    await addToCart(product, 1);
    showToast("Added to cart");
    navigate("/cart");
  };

  return (
    <PageTransition>
      <div className="product-details">
        <section className="product-details-main">
          <ImageZoom src={product.image.url} alt={product.name} />
          <div className="product-details-info">
            <p className="product-details-category">{product.category}</p>
            <h2>{product.name}</h2>
            <RatingStars rating={product.rating} />
            <p className="product-details-description">{product.description}</p>
            <div className="product-details-price-row">
              <span>{formatPrice(product.price)}</span>
              <button type="button" onClick={toggleWishlist}>
                {isWishlisted ? "Saved" : "Save"}
              </button>
            </div>
            <AddToCartButton onClick={handleAdd} />
          </div>
        </section>

        <section className="product-details-section">
          <h3>Related products</h3>
          <div className="grid product-details-grid">
            {related.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onAddToCart={(selected) => addToCart(selected, 1)}
                onWishlistToggle={() => {}}
                isWishlisted={false}
              />
            ))}
          </div>
        </section>

        <section className="product-details-section">
          <h3>Recently viewed</h3>
          <div className="grid product-details-grid">
            {recentlyViewed.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onAddToCart={(selected) => addToCart(selected, 1)}
                onWishlistToggle={() => {}}
                isWishlisted={false}
              />
            ))}
          </div>
        </section>

        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
