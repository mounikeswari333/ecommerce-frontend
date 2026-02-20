import "./Pagination.css";

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const total = Math.min(pages, 4);

  return (
    <div className="pagination">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index + 1}
          type="button"
          className={page === index + 1 ? "pagination-active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
