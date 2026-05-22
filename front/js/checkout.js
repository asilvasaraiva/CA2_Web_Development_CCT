'use strict';

/*  Basket Functions  */
function getBasket() {
  return JSON.parse(localStorage.getItem('basket') || '[]');
}

function saveBasket(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
}

function clearBasket() {
  localStorage.removeItem('basket');
}

// Update the cart count in the header based on the total quantity of items in the basket
function updateCartCount() {
  const total = getBasket().reduce((sum, i) => sum + i.quantity, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

// Remove an item from the basket by its product ID
function removeItem(productId) {
  const basket = getBasket().filter(i => i.id !== productId);
  saveBasket(basket);
  renderSummary();
  updateCartCount();
}

// Render the order summary on the checkout page
function renderSummary() {
  const basket    = getBasket();
  const itemsEl   = document.getElementById('summaryItems');
  const totalEl   = document.getElementById('summaryTotal');
  const submitBtn = document.getElementById('placeOrderBtn');

  if (basket.length === 0) {
    itemsEl.innerHTML   = '<p class="empty-basket">Your basket is empty. <a href="shop.html">Go to Shop</a></p>';
    totalEl.textContent = '€0.00';
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (submitBtn) submitBtn.disabled = false;

  const total = basket.reduce((s, i) => s + i.price * i.quantity, 0);
  totalEl.textContent = `€${total.toFixed(2)}`; //fractionDigits — Number of digits after the decimal point. Must be in the range 0 - 20 inclusive.

  // Render each item in the basket as a summary item in the checkout page
  itemsEl.innerHTML = basket.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}"
           onerror="this.src='https://placehold.co/60x60/f0eeee/999?text=img'" />
      <div class="summary-item-info">
        <p><strong>${item.name}</strong></p>
        <p class="summary-item-brand">${item.brand}</p>
        <p>€${item.price.toFixed(2)} × ${item.quantity}</p>
      </div>
      <div class="summary-item-right">
        <span class="summary-item-sub">€${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-item-btn" data-id="${item.id}">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  `).join('');

// Add event listeners to the remove buttons after rendering the items
  itemsEl.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => removeItem(btn.dataset.id));
  });
}

// Handle form submission for checkout
document.getElementById('checkoutForm').addEventListener('submit', async e => {
  e.preventDefault(); //avoid the default behaviour of reload the page after submitting the form
  clearErrors(); //clear all error messages before validating the form again

  const payload = { //get the form data and basket items to send to the server
    name:    document.getElementById('chkName').value,
    email:   document.getElementById('chkEmail').value,
    phone:   document.getElementById('chkPhone').value,
    address: document.getElementById('chkAddress').value,
    items:   getBasket()
  };

  try { //send the form data to the server and handle the response
    const res  = await fetch('http://localhost:3000/api/checkout', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });
    const data = await res.json(); //parse the response as JSON

    if (!res.ok) {
      displayErrors(data.errors || {});
      return;
    }

    showConfirmation(data.order); //show the order confirmation and clear the basket

  } catch {
    alert('Server error. Please make sure the server is running.');
  }
});

// Show order confirmation and clear the basket
function showConfirmation(order) {
  clearBasket(); //clear the basket after successful order
  updateCartCount();//update the cart count after clearing the basket
alert(`Thank you for your order, ${order.name}!\n\nYour order ID is ${order.id} and the total amount is €${order.total}.\n\nA confirmation email has been sent to ${order.email}.`);
}

// Map of form field names to their corresponding error message element IDs
const ERROR_MAP = { //map the field names to the corresponding error message element IDs
  name:    'chkNameErr',
  email:   'chkEmailErr',
  phone:   'chkPhoneErr',
  address: 'chkAddressErr'
};

function displayErrors(errors) { //display the error messages returned from the server under the corresponding form fields
  Object.entries(errors).forEach(([field, msg]) => { //loop through the errors and display the message for each field
    const el = document.getElementById(ERROR_MAP[field]);
    if (el) { el.textContent = msg; el.classList.add('visible'); }
  });
}

function clearErrors() { //clear all error messages and hide them before validating the form again
  Object.values(ERROR_MAP).forEach(id => { //loop through all error message element IDs and clear their text content and hide them
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  });
}

// Initial render of the page
renderSummary(); //render the order summary when the page loads
updateCartCount(); //update the cart count in the header when the page loads