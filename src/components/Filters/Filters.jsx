import "./Filters.css";

const Filters = ({ filters, setFilters, categories }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search products"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />
      <select
        value={filters.minRating}
        onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
      >
        <option value="">Any rating</option>
        <option value="4">4 stars and up</option>
        <option value="3">3 stars and up</option>
        <option value="2">2 stars and up</option>
      </select>
    </div>
  );
};

export default Filters;
