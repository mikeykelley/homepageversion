const categories = {
  "Fashion": "Fashion businesses often deal with fast-moving trends and seasonal stock. Optimise your fulfilment to keep customers happy and returns low.",
  "Food & Drink": "Food & Drink requires precision and speed to maintain freshness. Zenstores helps you deliver on time, every time.",
  "Beauty & Fitness": "Beauty & Fitness brands benefit from streamlined packaging and tracking to enhance customer loyalty.",
  "Home & Garden": "Home & Garden orders often include bulky or fragile items. Zenstores helps you manage these efficiently and reduce damage."
};

const categoryButtons = document.querySelectorAll(".category-btn");
const personaMessage = document.getElementById("personaMessage");
const ordersInput = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const aovInput = document.getElementById("aov");
const errorsCost = document.getElementById("errorsCost");
const timeCost = document.getElementById("timeCost");
const missedRevenue = document.getElementById("missedRevenue");
const total = document.getElementById("total");

let selectedCategory = "Fashion";

function updatePersona() {
  personaMessage.textContent = categories[selectedCategory] || "";
}

function calculateSavings() {
  const orders = parseInt(ordersInput.value, 10);
  const aov = parseFloat(aovInput.value);

  // Constants
  const errorRate = 0.005; // 0.5%
  const manualMinutes = 3;
  const conversionRateBaseline = 0.03;
  const conversionUplift = 0.10; // 10%

  // Cost calculations
  const errorsCostVal = orders * errorRate * aov;
  const timeCostVal = (orders * manualMinutes / 60) * 12; // £12 per hour wage
  const revenueBaseline = orders * aov * conversionRateBaseline;
  const upliftRevenue = revenueBaseline * conversionUplift;

  // Update UI
  errorsCost.textContent = errorsCostVal.toFixed(0);
  timeCost.textContent = timeCostVal.toFixed(0);
  missedRevenue.textContent = upliftRevenue.toFixed(0);

  const totalSavings = errorsCostVal + timeCostVal + upliftRevenue;
  total.textContent = totalSavings.toFixed(0);
}

// Category button click handler
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedCategory = button.getAttribute("data-category");
    updatePersona();
    calculateSavings();
  });
});

// Input event handlers
ordersInput.addEventListener("input", () => {
  orderValue.textContent = ordersInput.value;
  calculateSavings();
});

aovInput.addEventListener("input", () => {
  calculateSavings();
});

// Initial setup
updatePersona();
calculateSavings();
