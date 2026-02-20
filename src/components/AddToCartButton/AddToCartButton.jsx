import { motion } from "framer-motion";
import "./AddToCartButton.css";

const AddToCartButton = ({ onClick }) => {
  return (
    <motion.button
      className="add-to-cart-button"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      type="button"
    >
      Add to cart
    </motion.button>
  );
};

export default AddToCartButton;
