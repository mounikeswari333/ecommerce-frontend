import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import SkeletonGrid from "../../components/SkeletonGrid/SkeletonGrid";
import Toast from "../../components/Toast/Toast";
import PageTransition from "../../components/PageTransition/PageTransition";
import { fetchProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import useToast from "../../hooks/useToast";
import dummyProducts from "../../data/dummyProducts";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [usingDummy, setUsingDummy] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    minRating: "",
  });
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const {
    products: wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();
  const { message, showToast } = useToast();

  const categories = useMemo(() => {
    const source = usingDummy ? dummyProducts : products;
    const set = new Set(source.map((p) => p.category));
    return Array.from(set);
  }, [products, usingDummy]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ ...filters, page });
        if (data?.products?.length) {
          setProducts(data.products);
          setPages(data.pages || 1);
          setUsingDummy(false);
        } else {
          throw new Error("No products from API");
        }
      } catch (error) {
        setUsingDummy(true);
        const normalizedSearch = filters.search.trim().toLowerCase();
        const min = Number(filters.minPrice) || 0;
        const max = Number(filters.maxPrice) || Number.POSITIVE_INFINITY;
        const minRating = Number(filters.minRating) || 0;
        const filtered = dummyProducts.filter((product) => {
          const matchesSearch = normalizedSearch
            ? product.name.toLowerCase().includes(normalizedSearch)
            : true;
          const matchesCategory =
            filters.category === "all" || product.category === filters.category;
          const matchesPrice = product.price >= min && product.price <= max;
          const matchesRating = product.rating >= minRating;
          return (
            matchesSearch && matchesCategory && matchesPrice && matchesRating
          );
        });

        const perPage = 12;
        const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
        const currentPage = Math.min(page, totalPages);
        if (currentPage !== page) setPage(currentPage);
        const start = (currentPage - 1) * perPage;
        setProducts(filtered.slice(start, start + perPage));
        setPages(totalPages);
      } finally {
        setLoading(false);
      }
    };
    load();

    // Real-time product updates: Poll every 30 seconds when not using dummy data
    if (!usingDummy) {
      const intervalId = setInterval(() => {
        load();
      }, 30000); // 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [filters, page, usingDummy]);

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
      <div className="product-list">
        <div className="product-list-header">
          <h2>Shop All</h2>
          <p>Filter down to what you love most.</p>
        </div>
        <Filters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />
        {loading ? (
          <SkeletonGrid count={12} />
        ) : (
          <div className="grid product-list-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAdd}
                onWishlistToggle={toggleWishlist}
                isWishlisted={wishlist.some((item) => item._id === product._id)}
              />
            ))}
          </div>
        )}
        <Pagination page={page} pages={pages} onPageChange={setPage} />
        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default ProductList;
