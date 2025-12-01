const navShell = document.querySelector(".nav-shell");
const toggleBtn = document.querySelector(".menu-toggle");
const body = document.body;
const yearLabel = document.getElementById("year");
const navLinks = document.querySelectorAll(".nav-links a");
const logoTrack = document.getElementById("logo-track");
const navProductGrid = document.getElementById("nav-product-grid");
const productsToggle = document.querySelector(".products-toggle");
const productPanel = document.querySelector(".product-panel");
const productsNavItem = document.querySelector(".products-nav");
const previewBrandContainer = document.getElementById(
  "brand-preview-sections"
);
const catalogBrandContainer = document.getElementById(
  "catalog-brand-sections"
);

const productCatalog = [
  {
    id: "kent-supreme",
    brand: "Kent",
    name: "Supreme Mineral RO",
    subtitle: "Mineral guard + zero water wastage",
    description:
      "Nine-stage RO + UV + UF purification with 9L storage, auto-flush, and in-tank UV LED protection.",
    image: "product/kent/71jQhMgf1xL._AC_UF1000,1000_QL80_.jpg",
    features: [
      "9L cold-forged tank",
      "Mineral Guard & TDS control",
      "Smart leak + filter alerts",
    ],
    price: "Rs. 22,499",
  },
  {
    id: "kent-grand-n",
    brand: "Kent",
    name: "Grand N RO+UV",
    subtitle: "Digital display with live purity stats",
    description:
      "Dual purification stages plus zero water-wastage recirculation in a sleek black chassis.",
    image: "product/kent/A_Info_KENT_Grand__N_1024x1024@2x.webp",
    features: [
      "Real-time purity monitor",
      "RO + UV + UF + TDS control",
      "Wall or counter placement",
    ],
    price: "Rs. 21,999",
  },
  {
    id: "kent-grand-star",
    brand: "Kent",
    name: "Grand Star",
    subtitle: "LED touch UI with inbuilt storage",
    description:
      "A flagship purifier with hot key water, multi-stage purification, and 9L high-gloss tank.",
    image:
      "product/kent/kent-grand-star-11101-wall-mounted-9-l-ro-water-filter-1.jpeg",
    features: [
      "Hot & cold dispensing",
      "Zero water wastage tech",
      "UV LED in tank",
    ],
    price: "Rs. 28,499",
  },
  {
    id: "kent-pearl",
    brand: "Kent",
    name: "Pearl 8L",
    subtitle: "Detachable tank for effortless cleaning",
    description:
      "A curved countertop design with RO + UV + UF purification and mineral retaining features.",
    image:
      "product/kent/kent-pearl-11098-wall-mounted-8-l-ro-water-filter-1.jpeg",
    features: [
      "8L detachable tank",
      "TDS control valve",
      "Smart filter change alarm",
    ],
    price: "Rs. 19,999",
  },
  {
    id: "kent-super-plus",
    brand: "Kent",
    name: "Super Plus",
    subtitle: "Classic RO+UF wall mount",
    description:
      "A reliable workhorse featuring multi-stage filtration, perfect for municipal water supply.",
    image:
      "product/kent/kent-super-plus-11005-wall-mounted-8-l-ro-water-filter-1.jpeg",
    features: [
      "RO + UF purification",
      "8L storage tank",
      "Push-fit components",
    ],
    price: "Rs. 17,499",
  },
  {
    id: "kent-ultra-storage",
    brand: "Kent",
    name: "Ultra Storage UF",
    subtitle: "Chemical-free UF with 8L reserve",
    description:
      "Ideal for low TDS zones, this UF-based purifier removes bacteria and cysts without electricity.",
    image: "product/kent/kent-ultra-storage-mobile-banner.png",
    features: [
      "8L storage",
      "UF membrane + carbon block",
      "Gravity-fed design",
    ],
    price: "Rs. 12,499",
  },
];

const groupProductsByBrand = () =>
  productCatalog.reduce((acc, product) => {
    const brand = product.brand || "Featured";
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(product);
    return acc;
  }, {});

const isMobile =
  /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

if (isMobile) {
  body.classList.add("reduce-animations");
}

toggleBtn?.addEventListener("click", () => {
  navShell?.classList.toggle("nav-open");
  const expanded = navShell?.classList.contains("nav-open");
  toggleBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  if (!expanded) {
    setProductPanelState(false);
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navShell?.classList.contains("nav-open")) {
      navShell.classList.remove("nav-open");
      toggleBtn?.setAttribute("aria-expanded", "false");
    }
    setProductPanelState(false);
  });
});

function attachCardInteractions(card) {
  if (!card || card.dataset.enhanced === "true") return;
  const toggleCard = () => card.classList.toggle("is-flipped");
  const handleKeypress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  };

  card.addEventListener("click", toggleCard);
  card.addEventListener("keypress", handleKeypress);
  card.dataset.enhanced = "true";
}

const createProductCard = (product) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.tabIndex = 0;
  if (product.id) {
    card.id = product.id;
  }

  const front = document.createElement("div");
  front.className = "card-face card-front";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";

  const frontInfo = document.createElement("div");
  frontInfo.className = "front-info";

  const brand = document.createElement("p");
  brand.className = "product-brand";
  brand.textContent = product.brand;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const subtitle = document.createElement("p");
  subtitle.textContent = product.subtitle;

  const frontPrice = document.createElement("p");
  frontPrice.className = "front-price";
  frontPrice.textContent = product.price;

  const reminder = document.createElement("span");
  reminder.className = "reveal-reminder";
  reminder.textContent = "Tap to reveal price & details";

  const badgeFront = document.createElement("span");
  badgeFront.className = "service-badge";
  badgeFront.textContent = "1Y Service • 1Y Warranty · NexGen Point";

  frontInfo.append(brand, title, subtitle, frontPrice, reminder, badgeFront);
  front.append(img, frontInfo);

  const back = document.createElement("div");
  back.className = "card-face card-back";

  const tabLabel = document.createElement("span");
  tabLabel.className = "tab-label";
  tabLabel.textContent = "Details · Revealed";

  const badgeBack = document.createElement("span");
  badgeBack.className = "service-badge";
  badgeBack.textContent = "1Y Service • 1Y Warranty · NexGen Point";

  const description = document.createElement("p");
  description.textContent = product.description;

  const featureList = document.createElement("ul");
  featureList.className = "feature-list";
  product.features?.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featureList.appendChild(li);
  });

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = product.price;

  const link = document.createElement("a");
  link.className = "learn-more";
  link.href = `products.html#${product.id}`;
  link.textContent = "See full specs";

  back.append(tabLabel, badgeBack, description, featureList, price, link);
  card.append(front, back);
  attachCardInteractions(card);
  return card;
};

const createBrandSection = ({
  brand,
  products,
  container,
  limit,
  variant = "preview",
}) => {
  const section = document.createElement("div");
  section.className = "brand-preview";
  if (variant === "catalog") {
    section.classList.add("brand-catalog");
  }

  const heading = document.createElement("div");
  heading.className = "brand-heading";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = `${brand} Spotlight`;

  const title = document.createElement("h3");
  title.textContent =
    variant === "catalog" ? `${brand} Filtration Range` : `${brand} Preview`;

  const slug = (products[0]?.image.match(/^product\/([^/]+)/i) || [])[1];
  const subtext = document.createElement("p");
  subtext.className = "brand-subtext";
  subtext.textContent = slug
    ? `Assets pulled directly from /product/${slug}/`
    : "Live data from your product vault.";

  heading.append(eyebrow, title, subtext);

  const grid = document.createElement("div");
  grid.className = "product-grid";
  if (variant === "catalog") {
    grid.classList.add("product-page-grid");
  }

  products.slice(0, limit ?? products.length).forEach((product) => {
    grid.appendChild(createProductCard(product));
  });

  section.append(heading, grid);
  container.appendChild(section);
};

const renderBrandPreview = () => {
  if (!previewBrandContainer) return;
  previewBrandContainer.innerHTML = "";
  const grouped = groupProductsByBrand();
  Object.entries(grouped).forEach(([brand, products]) => {
    createBrandSection({
      brand,
      products,
      container: previewBrandContainer,
      limit: 3,
    });
  });
};

const renderCatalogBrandSections = () => {
  if (!catalogBrandContainer) return;
  catalogBrandContainer.innerHTML = "";
  const grouped = groupProductsByBrand();
  Object.entries(grouped).forEach(([brand, products]) => {
    createBrandSection({
      brand,
      products,
      container: catalogBrandContainer,
      variant: "catalog",
    });
  });
};

const renderNavProducts = () => {
  if (!navProductGrid || !productCatalog.length) return;
  navProductGrid.innerHTML = "";
  productCatalog.forEach((product) => {
    const card = document.createElement("article");
    card.className = "panel-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";

    const title = document.createElement("h4");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = product.subtitle;

    card.append(img, title, desc);
    navProductGrid.appendChild(card);
  });
};

function setProductPanelState(open) {
  if (!productsToggle || !productPanel || !productsNavItem) return;
  productsToggle.setAttribute("aria-expanded", open ? "true" : "false");
  productPanel.hidden = !open;
  productsNavItem.classList.toggle("is-open", open);
}

productsToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isExpanded = productsToggle.getAttribute("aria-expanded") === "true";
  setProductPanelState(!isExpanded);
});

document.addEventListener("click", (event) => {
  if (!productsNavItem || productPanel?.hidden) return;
  if (!productsNavItem.contains(event.target)) {
    setProductPanelState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setProductPanelState(false);
  }
});

yearLabel.textContent = new Date().getFullYear();

renderNavProducts();
renderBrandPreview();
renderCatalogBrandSections();

// product select options were removed

const localLogoFiles = [
  "havells-logo.png",
  "kent.png",
  "download.jpg",
  "6AEE25F50725BD7-FABER_Logo_P3435C-scaled.jpg",
  "main_logo.jpg",
  "OIP.webp",
];

const formatAltText = (fileName) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const shuffleArray = (array) =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

const createLogoSources = () =>
  shuffleArray(localLogoFiles).map((src) => ({
    src,
    alt: formatAltText(src),
  }));

if (logoTrack && localLogoFiles.length) {
  const logoSources = createLogoSources();

  const appendLogo = (logo, duplicated = false) => {
    const figure = document.createElement("figure");
    figure.className = "logo-entry";
    figure.setAttribute("role", "listitem");
    if (duplicated) {
      figure.setAttribute("aria-hidden", "true");
    }
    const img = document.createElement("img");
    img.src = logo.src;
    img.alt = logo.alt;
    img.loading = "lazy";
    figure.appendChild(img);
    logoTrack.appendChild(figure);
  };

  logoSources.forEach((logo) => appendLogo(logo));
  logoSources.forEach((logo) => appendLogo(logo, true));
}

