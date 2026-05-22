'use strict';

// Simple Express server with lowdb for data storage, serving product data and handling checkout orders with validation
const express  = require('express');
const low      = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path     = require('path');
const cors     = require('cors');
const app = express();
const PORT = 3000;

// Initialize lowdb with a JSON file for storage
const db = low(new FileSync(path.join(__dirname, 'db.json')));

// Middleware setup: enable CORS, parse JSON bodies, and serve static files from the current directory
app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// *****  Routes for fetching products and handling checkout *****//

// GET /api/products — return all products
app.get('/api/products', (req, res) => {
    res.json(db.get('products').value());
  });
  
// GET /api/products/:id — return a single product by ID
  app.get('/api/products/:id', (req, res) => {
    const product = db.get('products').find({ id: req.params.id }).value();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  });

// POST /api/checkout — validate the order data and save the order if valid
app.post('/api/checkout', (req, res) => {
  const { name, email, phone, address, items } = req.body;
  console.log(`[checkout] ${name} — ${items.length} items`);
  const errors = {};

  if (!name || name.trim().length < 2)
    errors.name = 'Full name is required (min 2 characters).';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Enter a valid email address.';

  if (!phone || !/^\d{9,10}$/.test(phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid phone number (9–10 digits).';

  if (!address || address.trim().length < 10)
    errors.address = 'Enter a full delivery address (min 10 characters).';

  if (!items || items.length === 0)
    errors.items = 'Your basket is empty.';

  if (Object.keys(errors).length > 0)
    return res.status(422).json({ errors }); // If there are validation errors, return a 422 status with the error messages

  // Calculate the total price of the order by summing the price * quantity for each item, and format it to 2 decimal places
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2); 

  const order = { // Create an order object with a unique ID, customer info, items, total price, and timestamp
    id:       `Mov2U-${Date.now()}`,
    name:     name.trim(),
    email:    email.trim(),
    phone:    phone.trim(),
    address:  address.trim(),
    items,
    total,
    placedAt: new Date().toISOString()
  };

  db.get('orders').push(order).write(); // Save the order to the 'orders' collection in the database
  console.log(`[order] ${order.id} — €${order.total}`); // Log the order ID and total price to the console for tracking

  res.status(201).json({ ok: true, order }); // Return a 201 status with the order details in the response if the order was successfully created
});

// Start the server and listen on the specified port, logging a message to the console when it's running
app.listen(PORT, () => console.log(`move2U running on ->  http://localhost:${PORT}`));