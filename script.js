// Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const personaMessage = document.getElementById('personaMessage');
const ordersInput = document.getElementById('orders');
const orderValueSpan = document.getElementById('orderValue');
const aovInput = document.getElementById('aov');

const errorsCostSpan = document.getElementById('errorsCost');
const timeCostSpan = document.getElementById('timeCost');
const missedRevenueSpan = document.getElementById('missedRevenue');
const totalSpan = document.getElementById('total');

// Persona messages data
const personaMessages = {
  "Fashion": "Small independent clothing, shoe and accessories brands. High volume, fast shipping, and easy returns are key to keeping your customers happy.",
  "Food & Drink": "Food & drink brands with perishable goods needing fast, reliable delivery and clear communication.",
  "Beauty & Fitness": "Brands focused on beauty, wellness, and fitness products. Customers expect personalisation and fast shipping.",
  "Home & Garden": "Homewares and garden supplies retailers, with varied product sizes and shipping needs."
};

// Selected category (default)
let selectedCategory = "Fashion";

// Update selected category styling and persona message
function updateCategory(category) {
  selectedCategory = category;
  categoryButtons.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.category === category);
  });
  personaMessage.textContent = personaMessages[category];
  calculateSavings();
}

// Calculate and update savings outputs
function calculateSavings() {
  const orders = Number(ordersInput.value);
  const aov = Number(aovInput.value);

  // Prevent invalid input
  if (aov <= 0) {
    errorsCostSpan.textContent = '0';
    timeCostSpan.textContent = '0';
    missedRevenueSpan.textContent = '0';
    totalSpan.textContent = '0';
    return;
  }

  // Constants & assumptions
  const errorRate = 0.005; // 0.5% packing errors
  const wagePerHour = 12;
  const processTimeMinutes = 3;
  const margin = 0.5; // 50%
  const baselineConversion = 0.03;
  const upliftConversion = 0.10; // 10% uplift on baseline

  // Error cost: orders * errorRate * AOV * margin
  const errorsCost = orders * errorRate * aov * margin;

  // Time saved: orders * processTime / 60 (hours) * wage per hour
  const timeCost = orders * (processTimeMinutes / 60) * wagePerHour;

  // Missed revenue: orders * aov * baselineConversion * upliftConversion
  const missedRevenue = orders * aov * baselineConversion * upliftConversion;

  // Total
  const total = errorsCost + timeCost + missedRevenue;

  // Update UI
  errorsCostSpan.textContent = errorsCost.toFixed(0);
  timeCostSpan.textContent = timeCost.toFixed(0);
  missedRevenueSpan.textContent = missedRevenue.toFixed(0);
  totalSpan.textContent = total.toFixed(0);
}

// Event listeners
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => updateCategory(btn.dataset.category));
});
ordersInput.addEventListener('input', () => {
  orderValueSpan.textContent = ordersInput.value;
  calculateSavings();
});
aovInput.addEventListener('input', calculateSavings);

// Initialize
updateCategory(selectedCategory);
calculateSavings();

