import "./Loader.css";

const Loader = ({ label = "Loading" }) => {
  return (
    <div className="loader">
      <div className="loader-spinner" />
      <p>{label}...</p>
    </div>
  );
};

export default Loader;
