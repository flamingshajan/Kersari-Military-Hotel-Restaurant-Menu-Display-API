// script.js
// Frontend logic to call the API endpoints using fetch()
// and display data dynamically on the page.

const btnFullMenu = document.getElementById("btnFullMenu");
const btnVegMenu = document.getElementById("btnVegMenu");
const btnCategories = document.getElementById("btnCategories");
const output = document.getElementById("output");
const statusEl = document.getElementById("status");

// Utility: show status message
function setStatus(message) {
  statusEl.textContent = message;
}

// Utility: clear output
function clearOutput() {
  output.innerHTML = "";
}

// Render full menu items
function renderMenuItems(items) {
  clearOutput();

  if (!items || items.length === 0) {
    output.innerHTML = "<p>No menu items found.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.name;

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `₹${item.price}`;

    header.appendChild(title);
    header.appendChild(price);

    // Badges row
    const badgesRow = document.createElement("div");
    const vegBadge = document.createElement("span");
    vegBadge.className = item.isVegetarian ? "badge-veg" : "badge-nonveg";
    vegBadge.textContent = item.isVegetarian ? "Vegetarian" : "Non-Vegetarian";

    const categoryPill = document.createElement("span");
    categoryPill.className = "category-pill";
    categoryPill.textContent = item.category;

    badgesRow.appendChild(vegBadge);
    badgesRow.appendChild(categoryPill);

    // Description
    const desc = document.createElement("p");
    desc.className = "description";
    desc.textContent = item.description;

    card.appendChild(header);
    card.appendChild(badgesRow);
    card.appendChild(desc);

    output.appendChild(card);
  });
}

// Render categories with counts
function renderCategories(data) {
  clearOutput();

  if (!data || !data.categories || data.categories.length === 0) {
    output.innerHTML = "<p>No categories found.</p>";
    return;
  }

  data.categories.forEach((cat) => {
    const card = document.createElement("article");
    card.className = "category-card";

    const name = document.createElement("div");
    name.className = "category-name";
    name.textContent = cat.name;

    const count = document.createElement("div");
    count.className = "category-count";
    count.textContent = `Items in this category: ${cat.itemCount}`;

    card.appendChild(name);
    card.appendChild(count);

    output.appendChild(card);
  });
}

// Fetch: Full Menu
async function fetchFullMenu() {
  setStatus("Loading full menu...");
  clearOutput();

  try {
    const res = await fetch("/menu");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setStatus(`Showing all menu items (${data.length})`);
    renderMenuItems(data);
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong while fetching the full menu.");
    output.innerHTML = "<p>Please try again later.</p>";
  }
}

// Fetch: Vegetarian Menu
async function fetchVegetarianMenu() {
  setStatus("Loading vegetarian options...");
  clearOutput();

  try {
    const res = await fetch("/menu/vegetarian");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setStatus(`Showing vegetarian items (${data.length})`);
    renderMenuItems(data);
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong while fetching vegetarian options.");
    output.innerHTML = "<p>Please try again later.</p>";
  }
}

// Fetch: Categories
async function fetchCategories() {
  setStatus("Loading categories...");
  clearOutput();

  try {
    const res = await fetch("/menu/categories");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setStatus(`Showing all categories (${data.categories.length})`);
    renderCategories(data);
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong while fetching categories.");
    output.innerHTML = "<p>Please try again later.</p>";
  }
}

// Button event listeners
btnFullMenu.addEventListener("click", fetchFullMenu);
btnVegMenu.addEventListener("click", fetchVegetarianMenu);
btnCategories.addEventListener("click", fetchCategories);

// Optional: load full menu on page load
window.addEventListener("DOMContentLoaded", () => {
  fetchFullMenu();
});
