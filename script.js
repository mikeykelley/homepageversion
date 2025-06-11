const categories = {
  "Fashion": "Fashion businesses often deal with fast-moving trends and seasonal stock. Optimise your fulfilment to keep customers happy and returns low.",
  "Food & Drink": "Food & Drink requires precision and speed to maintain freshness. Zenstores helps you deliver on time, every time.",
  "Beauty & Fitness": "Beauty & Fitness brands benefit from streamlined packaging and tracking to enhance customer loyalty.",
  "Other": "Other businesses have unique needs. Zenstores adapts to help you fulfil efficiently and scale smoothly."
};

const similarBusinesses = {
  "Fashion": ["Alex's Aprons", "Tom's Tees", "Mikey's Mittens"],
  "Food & Drink": ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"],
  "Beauty & Fitness": ["Alex's Algae", "Tom's Training", "Mikey's Mascara"],
  "Other": ["Alex's Accessories", "Tom's Tools", "Mikey's Motors"]
};

const personaMessage = document.getElementById("personaMessage");
const categoryButtons = document.querySelectorAll(".category-btn");
const similarBusinessesContainer = document.getElementById("similarBusinesses");
const ordersInput = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");

let selectedCategory = "Fashion"; // default on load

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
  orderValue.textContent = val >= 20000 ? "20,000+" : val.toLocaleString();
}

function handleOrderInputStep() {
  let val = parseInt(ordersInput.value, 10);

  if (val < 5000) {
    ordersInput.step = 250;
  } else {
    ordersInput.step = 1000;
    if (val % 1000 !== 0) {
      val = Math.round(val / 1000) * 1000;
      if (val < 5000) val = 5000;
      ordersInput.value = val;
    }
  }
  updateOrderValueLabel();
}

// Category button click handler
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove selected class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove("selected"));

    // Add selected class to clicked button
    button.classList.add("selected");

    // Update selected category
    selectedCategory = button.dataset.category;

    // Update persona message and businesses
    updatePersona();
    updateSimilarBusinesses();
  });
});

// Orders slider event
ordersInput.addEventListener("input", () => {
  handleOrderInputStep();
});

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  updatePersona();
  updateSimilarBusinesses();
  handleOrderInputStep();

  // Also highlight default category button on load
  categoryButtons.forEach(btn => {
    if (btn.dataset.category === selectedCategory) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
});
