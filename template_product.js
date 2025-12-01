/* ------------------------------
    PRODUCT TEMPLATE SYSTEM
--------------------------------*/

const PRODUCTS = {
  "Family Systems": [
    {
      img: "images/system1.jpg",
      title: "PureFlow Family 2000",
      description: "High-output filtration for everyday home hydration."
    },
    {
      img: "images/system2.jpg",
      title: "CrystalGuard Home Pro",
      description: "Mineral-balanced clarity for whole-house supply."
    }
  ],

  "Family & Friends": [
    {
      img: "images/portable1.jpg",
      title: "AquaGo Portable",
      description: "Perfect for travel, reunions, and outdoor gatherings."
    },
    {
      img: "images/portable2.jpg",
      title: "HydraChill Buddy",
      description: "Smart personal purifier with refill alerts."
    }
  ]
};

/* ------------------------------
    RENDER SECTIONS + CARDS
--------------------------------*/

function renderProductTemplate() {
  const container = document.getElementById("brand-preview-sections");
  container.innerHTML = "";

  Object.keys(PRODUCTS).forEach((category) => {
    const section = document.createElement("div");
    section.className = "product-category-section";

    section.innerHTML = `
      <h3 class="category-title">${category}</h3>
      <div class="category-grid"></div>
    `;

    const grid = section.querySelector(".category-grid");

    PRODUCTS[category].forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p>${product.description}</p>
      `;

      grid.appendChild(card);
    });

    container.appendChild(section);
  });
}

renderProductTemplate();

/* ------------------------------
    NAV PRODUCT GRID (HEADER)
--------------------------------*/

function renderNavProducts() {
  const grid = document.getElementById("nav-product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.values(PRODUCTS).flat().slice(0, 4).forEach((product) => {
    const item = document.createElement("div");
    item.className = "nav-product-item";
    item.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <p>${product.title}</p>
    `;
    grid.appendChild(item);
  });
}

renderNavProducts();

/* ------------------------------
    LOGO CAROUSEL (unchanged)
--------------------------------*/

const LOGOS = ["logo1.png", "logo2.png", "logo3.png"];
const track = document.getElementById("logo-track");
if (track) {
  LOGOS.forEach((logo) => {
    const img = document.createElement("img");
    img.src = "logos/" + logo;
    track.appendChild(img);
  });
}

/* ------------------------------
    YEAR FOOTER
--------------------------------*/
document.getElementById("year").textContent = new Date().getFullYear();
