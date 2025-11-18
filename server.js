// server.js
// Building a simple restaurant menu API using Express
// I’m keeping everything in-memory since no database is needed for this assignment.

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// --------------------------------------------
// My menu data (just stored in an array here)
// --------------------------------------------

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Main Course",
    price: 350,
    isVegetarian: true,
    description: "Classic wood-fired pizza with mozzarella and basil."
  },
  {
    id: 2,
    name: "Butter Chicken",
    category: "Main Course",
    price: 420,
    isVegetarian: false,
    description: "Creamy tomato gravy with soft chicken pieces."
  },
  {
    id: 3,
    name: "Masala Fries",
    category: "Appetizer",
    price: 180,
    isVegetarian: true,
    description: "Crispy fries tossed in spicy Indian masala."
  },
  {
    id: 4,
    name: "Tandoori Chicken Tikka",
    category: "Appetizer",
    price: 260,
    isVegetarian: false,
    description: "Smoky chicken tikka served with mint chutney."
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 230,
    isVegetarian: true,
    description: "Warm chocolate cake with a gooey molten center."
  },
  {
    id: 6,
    name: "Fresh Lime Soda",
    category: "Beverage",
    price: 120,
    isVegetarian: true,
    description: "Refreshing lime soda (sweet or salty)."
  }
];

// -------------------------------------------------------------------
// Middlewares
// Serving the public folder so my HTML/CSS/JS works properly
// -------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

// -------------------------------------------------------------------
// 1) GET /menu → return everything
// -------------------------------------------------------------------
app.get("/menu", (req, res) => {
  res.json(menuItems);
});

// -------------------------------------------------------------------
// 2) GET /menu/vegetarian → filter veg items only
// -------------------------------------------------------------------
app.get("/menu/vegetarian", (req, res) => {
  const vegItems = menuItems.filter((item) => item.isVegetarian);
  res.json(vegItems);
});

// -------------------------------------------------------------------
// 3) GET /menu/categories → unique categories + item count
// -------------------------------------------------------------------
app.get("/menu/categories", (req, res) => {
  const categoryMap = {};

  // Counting items for each category
  menuItems.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = 0;
    }
    categoryMap[item.category] += 1;
  });

  // Convert object into array to match required format
  const categories = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    itemCount: categoryMap[cat]
  }));

  res.json({ categories });
});

// -------------------------------------------------------------------
// Starting the server
// ---------------------------------------------
