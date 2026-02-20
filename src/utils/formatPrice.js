const formatPrice = (value) => {
  if (Number.isNaN(Number(value))) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export default formatPrice;
