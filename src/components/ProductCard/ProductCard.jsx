import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import formatPrice from "../../utils/formatPrice";
import "./ProductCard.css";

const ProductCard = ({
  product,
  onAddToCart,
  onWishlistToggle,
  isWishlisted,
  showDelete = false,
  onDelete,
  showSave = true,
  size = "default",
}) => {
  return (
    <motion.div
      className={`product-card ${size === "compact" ? "compact" : ""}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Link to={`/products/${product._id}`} className="product-card-image">
        <img
          src={product.image.url}
          alt={product.name}
          crossOrigin="anonymous"
        />
      </Link>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-card-category">{product.category}</p>
        <RatingStars rating={product.rating} />
        <div className="product-card-bottom">
          <span className="product-card-price">
            {formatPrice(product.price)}
          </span>
          <div className="product-card-actions">
            {showDelete && onDelete ? (
              <button
                type="button"
                className="product-card-delete"
                onClick={() => onDelete(product)}
              >
                Delete
              </button>
            ) : null}
            {showSave ? (
              <button type="button" onClick={() => onWishlistToggle(product)}>
                {isWishlisted ? "Saved" : "Save"}
              </button>
            ) : null}
            <button type="button" onClick={() => onAddToCart(product)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
