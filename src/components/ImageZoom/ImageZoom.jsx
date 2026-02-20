import { useState } from "react";
import "./ImageZoom.css";

const ImageZoom = ({ src, alt }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div
      className={`image-zoom ${zoomed ? "image-zoom--active" : ""}`}
      onClick={() => setZoomed(!zoomed)}
    >
      <img src={src} alt={alt} />
      <span className="image-zoom-hint">
        {zoomed ? "Tap to zoom out" : "Tap to zoom"}
      </span>
    </div>
  );
};

export default ImageZoom;
