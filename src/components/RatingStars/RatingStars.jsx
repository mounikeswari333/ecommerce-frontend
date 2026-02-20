import "./RatingStars.css";

const RatingStars = ({ rating }) => {
  const rounded = Math.round(rating);
  return (
    <div className="rating-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rounded ? "rating-stars-filled" : "rating-stars-empty"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
