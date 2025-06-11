const categories = {
  "Fashion": "Fashion businesses often deal with fast-moving trends and seasonal stock. Optimise your fulfilment to keep customers happy and returns low.",
  "Food & Drink": "Food & Drink requires precision and speed to maintain freshness. Zenstores helps you deliver on time, every time.",
  "Beauty & Fitness": "Beauty & Fitness brands benefit from streamlined packaging and tracking to enhance customer loyalty.",
  "Other": "Various other business types can benefit from Zenstores’ streamlined fulfilment and delivery optimisation."
};

const similarBusinesses = {
  "Fashion": ["Alex's Aprons", "Tom's Tees", "Mikey's Mittens"],
  "Food & Drink": ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"],
  "Beauty & Fitness": ["Alex's Algae", "Tom's Training", "Mikey's Mascara"],
  "Other": ["Alex's Antiques", "Tom's Tools", "Mikey's Market"]
};

const categoryButtons = document.querySelectorAll(".category-btn");
const personaMessage = document.getElementById("personaMessage");
const ordersInput = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const similarBusinessesContainer = document.getElementById("similarBusinesses");

let selectedCategory = "Fashion";

function updatePersona() {
  personaMessage.textContent = categories[selectedCategory] || "";
}

function updateSimilarBusinesses() {
  similarBusinessesContainer.innerHTML = "";
  const businesses = similarBusinesses[selectedCategory] || [];
  businesses.forEach(name => {
    const div = document.createElement("div");
    div.classList.add("business-box");
    div.textContent = name;
    similarBusinessesContainer.appendChild(div);
  });
}

function updateOrderValueLabel() {
  const val = parseInt(ordersInput.value, 10);
  if (val >= 20000) {
    orderValue.textContent = "20,000+";
  } else {
    orderValue.textContent = val.toLocaleString();
  }
}

function handleOrderInputStep() {
  let val = parseInt(ordersInput.value, 10);

  if (val < 5000) {
    ordersInput.step = 250;
  } else {
    ordersInput.step = 1000;
    // Snap to nearest 1000 above 5k for clean UX
    if (val % 1000 !== 0) {
      val = Math.round(val / 1000) * 1000;
      if (val < 5000) val = 5000;
      ordersInput.value = val;
    }
  }
  updateOrderValueLabel();
}

function onCategoryChange(newCategory) {
  selectedCategory = newCategory;
  updatePersona();
  updateSimilarBusinesses();

  // Highlight selected button
  categoryButtons.forEach(btn => {
    if (btn.textContent.trim() === newCategory) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

// Initialize UI with default category
onCategoryChange(selectedCategory);

// Add event listeners for category buttons
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    onCategoryChange(button.textContent.trim());
  });
});

// Add event listener for orders slider input
ordersInput.addEventListener("input", () => {
  handleOrderInputStep();
});

// Initialize order slider label on page load
updateOrderValueLabel();
