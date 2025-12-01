import { Link } from "react-router-dom";

export default function Hero({ variant = "home" }) {
  const isProduct = variant === "product";
  return (
    <section className={`hero${isProduct ? " product-page-hero" : ""}`}>
      <div className="hero-copy">
        <p className="eyebrow">{isProduct ? "Complete Catalog" : "Hydration Intelligence"}</p>
        <h1>{isProduct ? "Every purifier in one place." : "Purify every drop with confidence."}</h1>
        <span className="contactn"> <img src="/Phone-Icon-PNG-Transparent.png" width={65} alt="" /><h3><a href="tel:9852908810">Contact : +91 9852908810 , </a> 9934102710</h3></span>
        <p>
          {isProduct
            ? "Browse the entire Kent-powered lineup with immersive, flip-ready cards that reveal specs, feature highlights, and transparent pricing."
            : "Visit our Office Cum Shop in Chiraundi,Morahbadi,Ranchi,Jharkhand/834008"}
        </p>
        
        <div className="hero-cta">
          {isProduct ? (
            <>
              <a href="#products" className="btn primary">Browse Systems</a>
              <Link to="/" className="btn ghost"><a href="tel:9852908810">Talk to Experts</a></Link>
            </>
          ) : (
            <>
              <Link to="/products" className="btn primary">Explore Products</Link>
              <a href="#services" className="btn ghost"><a href="tel:9852908810">Call us ?</a></a>
              <a href="https://maps.app.goo.gl/nhwoWUM9YeXN89Rd8" target="_blank" className="btn ghost">Location<img src="/4192052.png" alt="" width={45} /></a>
              
            </>
          )}
        </div>
      </div>
      <div className="hero-visual">
        <div className="orbital">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="pulse"></div>
      </div>
    </section>
  );
}
