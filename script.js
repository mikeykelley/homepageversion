// Persona messages data for categories & volume ranges
const personas = {
  "Fashion": [
    { maxOrders: 1000, message: "Small fashion brand - time to scale smartly!" },
    { maxOrders: 5000, message: "Growing fashion biz - optimize your workflow." },
    { maxOrders: Infinity, message: "Enterprise fashion leader - maximize efficiency!" }
  ],
  "Food & Drink": [
    { maxOrders: 1000, message: "Food startup - fresh delivery needs." },
    { maxOrders: 5000, message: "Busy food brand - time savings matter." },
    { maxOrders: Infinity, message: "Food enterprise - scale with confidence." }
  ],
  "Beauty & Fitness": [
    { maxOrders: 1000, message: "Boutique beauty brand - streamline your orders." },
    { maxOrders: 5000, message: "Scaling fitness biz - speed and accuracy." },
    { maxOrders: Infinity, message: "Beauty powerhouse - automate to grow." }
  ],
  "Home & Garden": [
    { maxOrders: 1000, message: "Home goods startup - smart shipping starts here." },
    { maxOrders: 5000, message: "Growing garden brand - reduce errors and save time." },
    { maxOrders: Infinity, message: "Large home brand - scale fulfilment easily." }
  ]
};

const categoryButtons = document.querySelectorAll(".category-btn");
const ordersInput = document.getElementById("orders");
const aovInput = document.getElementById("aov");
const orderValueSpan = document.getElementById("orderValue");
const personaMessageDiv = document.getElementById("personaMessage");
const errorsCostSpan = document.getElementById("errorsCost");
const timeCostSpan = document.getElementById("timeCost");
const missedRevenueSpan = document.getElementById("missedRevenue");
const totalSpan = document.getElementById("total");

let selectedCategory = "Fashion"; // default category

// Update selected category UI and store selected category
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedCategory = btn.dataset.category;
    updatePersonaMessage();
    calculateSavings();
  });
});

// Update persona message based on selected category and orders
function updatePersonaMessage() {
  const orderVolume = parseInt(ordersInput.value, 10);

  const messages = personas[selectedCategory];
  let message = "";

  for (const p of messages) {
    if (orderVolume <= p.maxOrders) {
      message = p.message;
      break;
    }
  }

  personaMessageDiv.textContent = message;
}

// Calculate savings based on inputs
function calculateSavings() {
  const orders = parseInt(ordersInput.value, 10);
  const aov = parseFloat(aovInput.value) || 0;

  // Assumptions
  const errorRate = 0.005; // 0.5%
  const minutesPerOrder = 3;
  const wagePerHour = 12;
  const baselineConversionRate = 0.03; // 3%
  const upliftConversion = 0.10; // 10% uplift
  const grossMargin = 0.5; // 50%

  // Calculate costs
  const errorsCost = orders * errorRate * aov;
  const timeCost = (orders * minutesPerOrder / 60) * wagePerHour;
  const missedRevenue = (orders * aov * baselineConversionRate * upliftConversion) * grossMargin;

  const total = errorsCost + timeCost + missedRevenue;

  // Update UI with fixed 2 decimals
  errorsCostSpan.textContent = errorsCost.toFixed(2);
  timeCostSpan.textContent = timeCost.toFixed(2);
  missedRevenueSpan.textContent = missedRevenue.toFixed(2);
  totalSpan.textContent = total.toFixed(2);
}

// Update order value span and recalc on slider change
ordersInput.addEventListener("input", () => {
  orderValueSpan.textContent = ordersInput.value;
  updatePersonaMessage();
  calculateSavings();
});

// Recalculate on AOV change
aovInput.addEventListener("input", () => {
  calculateSavings();
});

// Initial setup
updatePersonaMessage();
calculateSavings();
