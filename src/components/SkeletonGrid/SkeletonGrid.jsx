import "./SkeletonGrid.css";

const SkeletonGrid = ({ count = 4 }) => {
  return (
    <div className="grid skeleton-grid">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-media" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
          <div className="skeleton-row">
            <div className="skeleton-pill" />
            <div className="skeleton-pill" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
