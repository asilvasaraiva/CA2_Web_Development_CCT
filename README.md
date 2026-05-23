# MOVE2U — Web Development CA2

> **Higher Diploma in Computing**  
> **Web Development Module — Continuous Assessment 2 (CA2)**  
> **September 2025 Cohort**

---

## 📖 Overview

**MOVE2U** is a full-stack web application developed as part of the Web Development module assessment for the Higher Diploma in Computing programme.

The application simulates an online sports and activity gear store, allowing users to browse products, manage a shopping cart, complete a checkout process, and submit feedback through a contact form.

The project includes a lightweight backend built with **Node.js** and **Express**, using **lowdb** as a simple JSON-based database for storing product and order data.

---

## ✨ Features

- Browse a product catalogue
- View product details
- Add and remove items from the shopping cart
- Checkout with form validation
- Submit contact/feedback messages
- Informational About page
- REST API for product retrieval and order processing
- Persistent JSON-based data storage

---

## 🗂️ Project Structure

```text
MOVE2U/
├── front/
│   ├── css/
│   │   └── style.css              # Global stylesheet
│   │
│   ├── html/
│   │   ├── index.html             # Home page
│   │   ├── shop.html              # Product catalogue
│   │   ├── checkout.html          # Checkout page
│   │   ├── contact.html           # Contact / feedback form
│   │   └── about.html             # About page
│   │
│   ├── images/                    # Static image assets
│   │
│   └── js/
│       ├── index.js               # Home page logic
│       ├── shop.js                # Shop & cart functionality
│       ├── checkout.js            # Checkout validation and submission
│       └── contacts.js            # Contact form logic
│
└── server/
    ├── db.json                    # JSON database (products & orders) using a dummy database generated with IA
    ├── package.json               # Node.js dependencies
    └── server.js                  # Express REST API server
```

---

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (version 20 or higher)
- **npm** (comes with Node.js)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/asilvasaraiva/CA2_Web_Development_CCT.git
```

### 2. Navigate to the project folder

```bash
cd MOVE2U/server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the backend server

```bash
npm run start
```

The server will run at:

```text
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | `/api/products`     | Retrieve all available products   |
| GET    | `/api/products/:id` | Retrieve a specific product by ID |
| POST   | `/api/checkout`     | Validate and save a customer order |

---

## 🛠️ Technology Stack

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend  | Node.js, Express.js           |
| Database | lowdb (JSON flat-file storage) |
| Icons    | Bootstrap Icons               |

---

## 📚 Learning Objectives

This project demonstrates practical implementation of:

- Frontend web development with HTML, CSS, and JavaScript
- DOM manipulation and event handling
- Form validation
- REST API development with Express
- Backend routing and request handling
- JSON-based data persistence
- Full-stack application integration

---

## Academic Disclaimer

This project was created for academic assessment purposes.

Some textual content (such as placeholder descriptions and feedback comments) was generated with assistance from **ChatGPT**.

Product images are sourced from **Unsplash** and are used for educational/non-commercial purposes only.

---

## 👨‍💻 Author

Developed as part of the **Higher Diploma in Computing — Web Development CA2**.