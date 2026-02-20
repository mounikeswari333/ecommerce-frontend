import { motion } from "framer-motion";
import "./Toast.css";

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
    >
      {message}
    </motion.div>
  );
};

export default Toast;
