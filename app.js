const WHATSAPP_PHONE = "5493496503349";
const STORAGE_KEY = "servicell-urbancase-cart-static";
const categories = ["Todos", "Celulares", "Smartwatch", "Fundas", "Audio", "Cargadores", "Protección"];

let state = {
  search: "",
  category: "Todos",
  sort: "destacados",
  cart: loadCart(),
  activeImage: 0,
  quantity: 1,
  selections: {},
  comment: "",
};

const app = document.getElementById("app");
const cartDrawer = document.getElementById("cart-drawer");
const backdrop = document.getElementById("drawer-backdrop");
const cartBody = document.getElementById("cart-body");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function money(price) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function byId(id) {
  return products.find((product) => product.id === Number(id));
}

function defaultSelections(product) {
  return Object.fromEntries(product.variants.map((variant) => [variant.name, variant.options[0]]));
}

function productCard(product, index = 0) {
  return `
    <article class="product-card reveal" style="animation-delay: ${Math.min(index * 70, 420)}ms">
      <a href="#producto-${product.id}" class="product-image-wrap">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <span class="view-product">Ver detalle ↗</span>
      </a>
      <div class="product-card-body">
        <span class="product-category">${product.category}</span>
        <a href="#producto-${product.id}"><h3>${product.name}</h3></a>
        <p>${product.shortDescription}</p>
        <div class="product-card-footer">
          <div><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}</div>
          ${
            product.commentPrompt
              ? `<a href="#producto-${product.id}" class="add-icon" aria-label="Elegir ${product.name}">↗</a>`
              : `<button class="add-icon" data-add="${product.id}" aria-label="Agregar ${product.name}">+</button>`
          }
        </div>
      </div>
    </article>
  `;
}

function footer() {
  return `
    <footer>
      <div class="footer-brands">
        <img src="assets/servicell-logo-transparent.png" alt="Servicell Paraná" />
        <b class="urban-wordmark"><strong>URBAN</strong>CASE</b>
      </div>
      <p>Dos locales para celulares, accesorios, fundas y tecnología en Paraná.</p>
      <div>
        <a href="#productos">Productos</a>
        <a href="https://wa.me/5493496503349?text=Hola%20Servicell%20Paran%C3%A1%20y%20UrbanCase" target="_blank" rel="noreferrer">WhatsApp ↗</a>
      </div>
      <small>© 2026 Servicell Paraná + UrbanCase</small>
    </footer>
  `;
}

function renderHome() {
  const filtered = products
    .filter((product) => {
      const matchesCategory = state.category === "Todos" || product.category === state.category;
      const query = state.search.trim().toLowerCase();
      const matchesSearch = !query || `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (state.sort === "menor") return a.price - b.price;
      if (state.sort === "mayor") return b.price - a.price;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });

  app.innerHTML = `
    <section class="hero" id="inicio">
      <div class="hero-grid-lines"></div>
      <div class="hero-copy">
        <span class="eyebrow"><i></i> Servicell Paraná + UrbanCase</span>
        <h1>Dos locales, una tienda con <em>onda.</em></h1>
        <p>Catálogo actualizado de celulares, fundas, accesorios y tecnología para consultar disponibilidad en cualquiera de nuestros locales.</p>
        <div class="hero-actions">
          <a href="#productos" class="primary-button">Ver productos →</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="orb orb-one"></div>
        <div class="orb orb-two"></div>
        <div class="hero-product-card card-back"><span>URBAN</span><strong>CASE</strong><small>FUNDAS + PROTECCIÓN</small></div>
        <div class="hero-product-card card-front">
          <span class="floating-label">DESTACADO</span>
          <img src="assets/products/iphone-12-pro-128gb-01.png" alt="iPhone 12 Pro" />
          <div><small>Disponible ahora</small><strong>iPhone 12 Pro</strong></div>
        </div>
        <div class="hero-sticker">2<br><small>LOCALES</small></div>
      </div>
      <div class="hero-bottom"><span>SERVICELL PARANÁ</span><span>URBANCASE</span><span>CATÁLOGO 2026</span></div>
    </section>

    <section class="catalog storefront-catalog" id="productos">
      <div class="shop-title">
        <div class="shop-brand-stack">
          <img src="assets/servicell-black-logo-transparent.png" alt="Servicell Paraná" />
          <b class="urban-wordmark"><strong>URBAN</strong>CASE</b>
        </div>
        <h1>Tienda</h1>
      </div>
      <div class="catalog-toolbar">
        <label class="search-box">⌕<input id="search" value="${state.search}" placeholder="Buscar celulares, smartwatch, auriculares..." /></label>
        <div class="category-pills">
          ${categories.map((category) => `<button data-category="${category}" class="${state.category === category ? "active" : ""}">${category}</button>`).join("")}
        </div>
        <select id="sort" aria-label="Ordenar productos">
          <option value="destacados" ${state.sort === "destacados" ? "selected" : ""}>Destacados</option>
          <option value="menor" ${state.sort === "menor" ? "selected" : ""}>Menor precio</option>
          <option value="mayor" ${state.sort === "mayor" ? "selected" : ""}>Mayor precio</option>
        </select>
      </div>
      ${
        filtered.length
          ? `<div class="product-grid">${filtered.map(productCard).join("")}</div>`
          : `<div class="empty-results"><h3>No encontramos esa combinación</h3><p>Probá otra búsqueda o volvé a ver todos los productos.</p><button id="clear-filters">Limpiar filtros</button></div>`
      }
    </section>
    
    ${footer()}
  `;

  wireHome();
}

function renderDetail(id) {
  const product = byId(id);
  if (!product) {
    location.hash = "productos";
    return;
  }

  if (!state.selections[product.id]) state.selections[product.id] = defaultSelections(product);
  const selections = state.selections[product.id];
  const related = products.filter((entry) => entry.id !== product.id && entry.category === product.category).slice(0, 3);

  app.innerHTML = `
    <main class="product-page">
      <div class="product-detail-shell">
        <a href="#productos" class="back-link">← Volver al catálogo</a>
        <div class="product-detail-grid">
          <section class="gallery">
            <div class="gallery-main">
              <img src="${product.images[state.activeImage] || product.images[0]}" alt="${product.name}, vista ${state.activeImage + 1}" />
              ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
              <span class="image-count">0${state.activeImage + 1} / 0${product.images.length}</span>
            </div>
            <div class="gallery-thumbs">
              ${product.images.map((image, index) => `<button data-image="${index}" class="${state.activeImage === index ? "active" : ""}"><img src="${image}" alt="Vista ${index + 1}" /></button>`).join("")}
            </div>
          </section>
          <section class="product-info">
            <span class="product-category">${product.category} / Colección 2026</span>
            <h1>${product.name}</h1>
            <div class="detail-price"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}<span>3 cuotas sin interés</span></div>
            <p class="detail-description">${product.description}</p>
            ${product.variants.map((variant) => `
              <fieldset class="variant-group">
                <legend>${variant.name} <b>${selections[variant.name]}</b></legend>
                <div>${variant.options.map((option) => `<button type="button" data-variant="${variant.name}" data-option="${option}" class="${selections[variant.name] === option ? "active" : ""}">${option}${selections[variant.name] === option ? " ✓" : ""}</button>`).join("")}</div>
              </fieldset>
            `).join("")}
            ${product.commentPrompt ? `<label class="comment-field"><span>${product.commentPrompt}</span><textarea id="comment" placeholder="${product.commentPlaceholder || "Escribí tu comentario"}">${state.comment}</textarea></label>` : ""}
            <div class="purchase-row">
              <div class="quantity-control"><button id="qty-minus" aria-label="Restar">−</button><span>${state.quantity}</span><button id="qty-plus" aria-label="Sumar">+</button></div>
              <button class="primary-button add-cart-wide" id="add-detail">Agregar al carrito</button>
            </div>
            <div class="purchase-benefits"><span><b>Entrega coordinada</b>En Paraná y alrededores</span><span><b>Compra acompañada</b>Atención personalizada</span></div>
            <div class="spec-list"><h2>Detalles que importan</h2>${product.specs.map((spec) => `<span>✓ ${spec}</span>`).join("")}</div>
          </section>
        </div>
      </div>
      ${related.length ? `<section class="related-products"><div class="section-heading"><div><span class="eyebrow">También te puede gustar</span><h2>Completá tu <em>setup.</em></h2></div></div><div class="product-grid">${related.map(productCard).join("")}</div></section>` : ""}
    </main>
    ${footer()}
  `;

  wireDetail(product);
}

function wireHome() {
  document.getElementById("search")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderHome();
    document.getElementById("productos")?.scrollIntoView();
  });
  document.getElementById("sort")?.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderHome();
    document.getElementById("productos")?.scrollIntoView();
  });
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderHome();
      document.getElementById("productos")?.scrollIntoView();
    });
  });
  document.getElementById("clear-filters")?.addEventListener("click", () => {
    state.search = "";
    state.category = "Todos";
    renderHome();
  });
  wireAddButtons();
}

function wireDetail(product) {
  document.querySelectorAll("[data-image]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeImage = Number(button.dataset.image);
      renderDetail(product.id);
    });
  });
  document.querySelectorAll("[data-variant]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selections[product.id][button.dataset.variant] = button.dataset.option;
      renderDetail(product.id);
    });
  });
  document.getElementById("qty-minus")?.addEventListener("click", () => {
    state.quantity = Math.max(1, state.quantity - 1);
    renderDetail(product.id);
  });
  document.getElementById("qty-plus")?.addEventListener("click", () => {
    state.quantity += 1;
    renderDetail(product.id);
  });
  document.getElementById("comment")?.addEventListener("input", (event) => {
    state.comment = event.target.value;
  });
  document.getElementById("add-detail")?.addEventListener("click", () => {
    addItem(product, state.selections[product.id], state.quantity, state.comment);
  });
  wireAddButtons();
}

function wireAddButtons() {
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = byId(button.dataset.add);
      addItem(product, defaultSelections(product), 1, "");
    });
  });
}

function addItem(product, selections = {}, quantity = 1, comment = "") {
  state.cart.push({ productId: product.id, selections, quantity, comment: comment.trim() });
  saveCart();
  renderCart();
  openCart();
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + (byId(item.productId)?.price || 0) * item.quantity, 0);
  cartCount.textContent = count;
  cartTotal.textContent = money(total);

  if (!state.cart.length) {
    cartBody.innerHTML = '<div class="empty-cart"><span>□</span><h3>Tu carrito está vacío</h3><p>Agregá productos del catálogo y consultá disponibilidad por WhatsApp.</p><a class="primary-button" href="#productos" id="empty-close">Ver productos</a></div>';
    document.getElementById("empty-close")?.addEventListener("click", closeCart);
    return;
  }

  cartBody.innerHTML = `<div class="cart-items">${state.cart.map((item, index) => {
    const product = byId(item.productId);
    const variants = Object.values(item.selections).filter(Boolean).join(" · ");
    return `
      <article class="cart-item">
        <img src="${product.images[0]}" alt="${product.name}" />
        <div class="cart-item-info">
          <div class="cart-item-top">
            <div><h3>${product.name}</h3><p>${variants}</p>${item.comment ? `<p class="cart-comment">${item.comment}</p>` : ""}</div>
            <button data-remove="${index}" aria-label="Quitar">×</button>
          </div>
          <div class="cart-item-bottom">
            <div class="quantity-control compact"><button data-dec="${index}">−</button><span>${item.quantity}</span><button data-inc="${index}">+</button></div>
            <strong>${money(product.price * item.quantity)}</strong>
          </div>
        </div>
      </article>
    `;
  }).join("")}</div>`;

  document.querySelectorAll("[data-remove]").forEach((button) => button.addEventListener("click", () => {
    state.cart.splice(Number(button.dataset.remove), 1);
    saveCart();
    renderCart();
  }));
  document.querySelectorAll("[data-dec]").forEach((button) => button.addEventListener("click", () => {
    const index = Number(button.dataset.dec);
    state.cart[index].quantity = Math.max(1, state.cart[index].quantity - 1);
    saveCart();
    renderCart();
  }));
  document.querySelectorAll("[data-inc]").forEach((button) => button.addEventListener("click", () => {
    state.cart[Number(button.dataset.inc)].quantity += 1;
    saveCart();
    renderCart();
  }));
}

function openCart() {
  cartDrawer.classList.add("is-open");
  backdrop.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  backdrop.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function checkout() {
  if (!state.cart.length) return;
  const total = state.cart.reduce((sum, item) => sum + (byId(item.productId)?.price || 0) * item.quantity, 0);
  const lines = state.cart.map((item) => {
    const product = byId(item.productId);
    const variants = Object.values(item.selections).filter(Boolean).join(" · ");
    const details = [variants, item.comment ? `Comentario: ${item.comment}` : ""].filter(Boolean).join(" · ");
    return `• ${item.quantity}x ${product?.name || "Producto"}${details ? ` (${details})` : ""} - ${money((product?.price || 0) * item.quantity)}`;
  });
  const message = ["¡Hola Servicell Paraná! 👋", "Quiero consultar por este pedido:", "", ...lines, "", `Total estimado: ${money(total)}`, "", "¿Me confirman disponibilidad, local de retiro y formas de entrega?"].join("\n");
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function route() {
  const match = location.hash.match(/^#producto-(\d+)/);
  if (match) {
    state.activeImage = 0;
    state.quantity = 1;
    state.comment = "";
    renderDetail(match[1]);
    scrollTo(0, 0);
    return;
  }
  renderHome();
  if (location.hash === "#productos") setTimeout(() => document.getElementById("productos")?.scrollIntoView(), 0);
}

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("drawer-backdrop").addEventListener("click", closeCart);
document.getElementById("checkout-button").addEventListener("click", checkout);
document.getElementById("menu-toggle").addEventListener("click", () => document.querySelector(".main-nav").classList.toggle("is-open"));
window.addEventListener("hashchange", route);

renderCart();
route();
