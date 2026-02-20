import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    feedback:
      "Absolutely love the quality and fast shipping! Best shopping experience ever.",
  },
  {
    id: 2,
    name: "Michael Chen",
    feedback: "Amazing products and customer service. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    feedback:
      "The product quality exceeded my expectations. Will definitely shop again!",
  },
  {
    id: 4,
    name: "David Kim",
    feedback:
      "Fast delivery and beautiful packaging. Very impressed with everything!",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    feedback: "Great selection and smooth checkout process. Five stars!",
  },
  {
    id: 6,
    name: "James Wilson",
    feedback: "Outstanding quality and value for money. Couldn't be happier!",
  },
  {
    id: 7,
    name: "Maria Garcia",
    feedback: "Love the modern design and user-friendly interface. Perfect!",
  },
  {
    id: 8,
    name: "Tom Anderson",
    feedback:
      "Excellent customer support and premium products. Highly satisfied!",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">What Our Customers Say</h2>
      <div className="testimonials-container">
        <div className="testimonials-track">
          {/* Duplicate items for seamless infinite scroll */}
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card"
              >
                <div className="testimonial-content">
                  <p className="testimonial-feedback">
                    "{testimonial.feedback}"
                  </p>
                  <p className="testimonial-name">— {testimonial.name}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
