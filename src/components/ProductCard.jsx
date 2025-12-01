import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article
      className={`product-card${flipped ? " is-flipped" : ""}`}
      tabIndex={0}
      id={product.id || undefined}
      onClick={() => setFlipped((v) => !v)}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
    >
      <div className="card-face card-front">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="front-info">
          <p className="product-brand">{product.brand}</p>
          <h3>{product.name}</h3>
          <p>{product.subtitle}</p>
          <p className="front-price">{product.price}</p>
          <span className="reveal-reminder">Tap to reveal price & details</span>
          <span className="service-badge">1Y Service • 1Y Warranty · NexGen Point</span>
        </div>
      </div>
      <div className="card-face card-back">
        <span className="tab-label">Details · Revealed</span>
        <span className="service-badge">1Y Service • 1Y Warranty · NexGen Point</span>
        <div className="shine"></div>
        <p>{product.description}</p>
        <ul className="feature-list">
          {(product.features || []).map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <p className="price">{product.price}</p>
        <Link className="learn-more" to={`/products#${product.id}`}>See full specs</Link>
      </div>
    </article>
  );
}
