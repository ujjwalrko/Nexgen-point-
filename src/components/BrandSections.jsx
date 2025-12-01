import ProductCard from "./ProductCard.jsx";
import { groupProductsByBrand } from "../data/productCatalog.js";

export function BrandPreviewSections() {
  const grouped = groupProductsByBrand();
  return (
    <section id="products" className="products">
      <div className="section-heading">
        <p className="eyebrow">Featured Systems</p>
        <h2>Preview the NexGen catalog.</h2>
        <p>
          Tap a card to flip for specs and transparent pricing pulled directly from your product vault.
        </p>
      </div>
      <div className="brand-preview-sections" id="brand-preview-sections">
        {Object.entries(grouped).map(([brand, products]) => (
          <div className="brand-preview" key={brand}>
            <div className="brand-heading">
              <p className="eyebrow">{brand} Spotlight</p>
              <h3>{brand} Preview</h3>
              <p className="brand-subtext">Assets pulled directly from /product/{products[0]?.image.match(/product\/([^/]+)/i)?.[1] || ""}/</p>
            </div>
            <div className="product-grid">
              {products.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CatalogBrandSections() {
  const grouped = groupProductsByBrand();
  return (
    <section id="products" className="products catalog-page">
      <div className="section-heading">
        <p className="eyebrow">Full Lineup</p>
        <h2>Compare specs before installation.</h2>
        <p>
          Each card flips to showcase the story, feature stack, and price for every purifier stored in your product directory.
        </p>
      </div>
      <div className="catalog-brand-sections" id="catalog-brand-sections">
        {Object.entries(grouped).map(([brand, products]) => (
          <div className="brand-preview brand-catalog" key={brand}>
            <div className="brand-heading">
              <p className="eyebrow">{brand} Spotlight</p>
              <h3>{brand} Filtration Range</h3>
              <p className="brand-subtext">Assets pulled directly from /product/{products[0]?.image.match(/product\/([^/]+)/i)?.[1] || ""}/</p>
            </div>
            <div className="product-grid product-page-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
