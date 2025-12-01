const files = import.meta.glob(
  "/product/*/*.{png,jpg,jpeg,webp}",
  { eager: true, as: "url" }
);
const metaFiles = import.meta.glob(
  "/product/*/*.json",
  { eager: true }
);

const toTitle = (s) =>
  s
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getBase = (p) => p.replace(/\.[^/.]+$/, "");
const parseEntry = (path, url) => {
  const m = path.match(/\/product\/(.*?)\/(.*)$/);
  const brand = m?.[1] || "Featured";
  const file = m?.[2] || path.split("/").pop();
  const id = `${brand}-${file.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  const metaKey = `/product/${brand}/${getBase(file)}.json`;
  const metaMod = metaFiles[metaKey];
  const meta = metaMod && metaMod.default ? metaMod.default : undefined;
  const name = meta?.title || toTitle(file);
  const description = meta?.description || `Trusted ${toTitle(brand)} system curated by NexGen Point. Includes 1Y service and 1Y warranty.`;
  const price = meta?.price || "Request pricing";
  const features = Array.isArray(meta?.features) ? meta.features : [];
  const subtitle = meta?.subtitle || `${toTitle(brand)} premium purifier`;
  return {
    id,
    brand: toTitle(brand),
    name,
    subtitle,
    description,
    image: url,
    features,
    price,
  };
};

export const productCatalog = Object.entries(files).map(([path, url]) =>
  parseEntry(path, url)
);

export const groupProductsByBrand = () =>
  productCatalog.reduce((acc, product) => {
    const brand = product.brand || "Featured";
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(product);
    return acc;
  }, {});
