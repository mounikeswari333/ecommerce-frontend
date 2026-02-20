import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageTransition from "../../components/PageTransition/PageTransition";
import "./Wishlist.css";

const Wishlist = () => {
  const { products, removeFromWishlist } = useWishlist();

  if (products.length === 0) {
    return (
      <PageTransition>
        <div className="wishlist-empty">
          <h2>Your wishlist is empty</h2>
          <p>Save products you love for later.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="wishlist-page">
        <h2>Wishlist</h2>
        <div className="grid wishlist-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => {}}
              onWishlistToggle={removeFromWishlist}
              onDelete={removeFromWishlist}
              showDelete
              showSave={false}
              size="compact"
              isWishlisted
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Wishlist;
