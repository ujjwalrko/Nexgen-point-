import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { productCatalog } from "../data/productCatalog.js";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setPanelOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!navRef.current) return;
      if (panelOpen && !navRef.current.contains(e.target)) setPanelOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  return (
    <header className={`nav-shell${menuOpen ? " nav-open" : ""}`} ref={navRef}>
      <div className="nav-brand">
        <span className="brand-mark">NP</span>
        <span className="brand-name">NexGen Point</span>
        <span className="nav-announce">
          <svg className="pin" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
          </svg>
          Ranchi-Jharkhand
        </span>
      </div>
      <nav className="nav-links">
        <div className={`nav-item products-nav${panelOpen ? " is-open" : ""}`}>
          <button
            className="nav-link products-toggle"
            aria-expanded={panelOpen ? "true" : "false"}
            onClick={(e) => {
              e.stopPropagation();
              setPanelOpen((v) => !v);
            }}
          >
            Products
            <span className="chevron" aria-hidden="true"></span>
          </button>
          <div
            className="product-panel"
            role="region"
            aria-label="Featured products"
            hidden={!panelOpen}
          >
            <div className="product-panel-grid" id="nav-product-grid">
              {productCatalog.map((p) => (
                <article key={p.id} className="panel-card">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <h4>{p.name}</h4>
                  <p>{p.subtitle}</p>
                </article>
              ))}
            </div>
            <Link to="/products" className="panel-cta">View full catalog</Link>
          </div>
        </div>
        <Link to="/products" className="nav-link">Product Page</Link>
        <Link to="/" className="nav-link">Services</Link>
        <Link to="/" className="nav-link">Contact</Link>
      </nav>
      <button
        className="menu-toggle"
        aria-label="Open navigation"
        aria-expanded={menuOpen ? "true" : "false"}
        onClick={() => {
          setMenuOpen((v) => !v);
          if (menuOpen) setPanelOpen(false);
        }}
      >
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
