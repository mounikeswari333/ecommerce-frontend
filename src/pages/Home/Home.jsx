import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ProductCard from "../../components/ProductCard/ProductCard";
import SkeletonGrid from "../../components/SkeletonGrid/SkeletonGrid";
import Toast from "../../components/Toast/Toast";
import PageTransition from "../../components/PageTransition/PageTransition";
import { fetchProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import useToast from "../../hooks/useToast";
import dummyProducts from "../../data/dummyProducts";
import "./Home.css";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
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
        const data = await fetchProducts({ page: 1 });
        const list = data?.products?.length ? data.products : dummyProducts;
        setAllProducts(list);
      } catch (error) {
        setAllProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = normalized
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(normalized),
        )
      : allProducts;
    return list.slice(0, 6);
  }, [allProducts, query]);

  const handleAdd = async (product) => {
    await addToCart(product, 1);
    showToast("Added to cart");
    navigate("/cart");
  };

  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => item._id === product._id);
    if (exists) {
      await removeFromWishlist(product);
      showToast("Removed from wishlist");
    } else {
      await addToWishlist(product);
      showToast("Saved to wishlist");
    }
  };

  return (
    <PageTransition>
      <div className="home-page">
        <HeroBanner />
        <section className="home-section">
          <div className="home-section-header">
            <h2>Trending now</h2>
            <p>Hand-picked favorites for the week.</p>
          </div>
          <div className="home-search">
            <input
              type="text"
              placeholder="Search trending products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          {loading ? (
            <SkeletonGrid count={6} />
          ) : (
            <div className="grid home-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAdd}
                  onWishlistToggle={toggleWishlist}
                  isWishlisted={wishlist.some(
                    (item) => item._id === product._id,
                  )}
                />
              ))}
            </div>
          )}
        </section>
        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default Home;
