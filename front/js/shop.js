'use strict';

// Basket management functions using localStorage to persist the shopping cart across page reloads
function getBasket() {
  return JSON.parse(localStorage.getItem('basket') || '[]');
}

function saveBasket(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
  updateCartCount();
}

// Update the cart count in the header based on the total quantity of items in the basket
function updateCartCount() {
  const total = getBasket().reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

// Add a product to the basket, or increase quantity if it already exists
function addToBasket(product) {
  const basket   = getBasket();
  const existing = basket.find(i => i.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    basket.push({
      id:       product.id,
      name:     product.name,
      brand:    product.brand,
      price:    product.price,
      image:    product.image,
      quantity: 1
    });
  }

  saveBasket(basket);
}

// Load products from the server and render them in the shop grid
async function loadProducts() {
  const grid = document.getElementById('productsGrid');

  try {
    const products = await fetch('http://localhost:3000/api/products').then(r => r.json());
    grid.innerHTML  = '';

    products.forEach(p => { // For each product, create a card element and append it to the grid
      const card = document.createElement('div');
      card.className = 'shop-card';
      card.innerHTML = `
        <img
          src="${p.image}"
          alt="${p.name}"
          onerror="this.src='https://placehold.co/480x320/f0eeee/999?text=No+Image'"
        />
        <div class="shop-card-body">
          <span class="shop-card-brand">${p.brand}</span>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="shop-card-footer">
            <strong class="shop-price">€${p.price.toFixed(2)}</strong>
            <button class="join-btn add-btn" data-id="${p.id}">
              <i class="bi bi-cart-plus-fill"></i> Add to basket
            </button>
          </div>
        </div>`;
      grid.appendChild(card);
    });

    // Add click event listeners to all "Add to basket" buttons after rendering the products
    grid.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', () => {// When an "Add to basket" button is clicked, find the corresponding product and add it to the basket
        const product = products.find(p => p.id === btn.dataset.id);
        addToBasket(product);

        // Provide visual feedback by changing the button text and disabling it briefly after adding to the basket
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Added!';
        btn.disabled  = true;
        setTimeout(() => { // Reset the button text and state after 1.2 seconds
          btn.innerHTML = '<i class="bi bi-cart-plus-fill"></i> Add to basket';
          btn.disabled  = false;
        }, 1200);
      });
    });

  } catch {
    grid.innerHTML = '<p> Could not load products. Make sure the server is running.</p>';
  }
}

// Initial load of products and cart count when the page is loaded
loadProducts();
updateCartCount();