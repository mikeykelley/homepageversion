// Current selected category (default 'fashion')
let selectedCategory = 'fashion';

// Update displayed orders and recalc
function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

// Determine persona tier and message based on orders and category
function getPersonaMessage(orders, category) {
  // Simple example with category influence (can expand later)
  let baseMessage = '';
  if (orders < 2000) {
    baseMessage = `<strong>Startup Tier</strong>: You're running a startup-level business, focusing on establishing your operations and optimizing early growth.`;
  } else if (orders < 10000) {
    baseMessage = `<strong>Growing Tier</strong>: Your business is growing steadily. With more orders to manage, efficiency and error prevention are crucial.`;
  } else {
    baseMessage = `<strong>Scaling Tier</strong>: You operate at enterprise scale with high order volumes.`;
  }

  // Add category-specific info
  let categoryMessage = '';
  switch(category) {
    case 'fashion':
      categoryMessage = " Your fashion business can benefit from streamlined inventory and fast shipping.";
      break;
    case 'food':
      categoryMessage = " Food & Drink businesses need strict temperature control and timely delivery.";
      break;
    case 'beauty':
      categoryMessage = " Beauty & Fitness requires careful handling and personalized customer service.";
      break;
    case 'home':
      categoryMessage = " Home & Garden involves diverse product sizes and delivery challenges.";
      break;
  }

  return baseMessage + categoryMessage;
}

// Main calculation function
function calculateAll() {
  const orders = parseInt(document.getElementById('orders').value);
  const aov = parseFloat(document.getElementById('aov').value) || 0;

  const grossMargin = 0.5;
  const hourlyWage = 12;
  const errorRate = 0.005; // 0.5%
  const conversionRate = 0.03;
  const conversionUplift = 0.10; // +10%

  // 1. Cost of fulfilment errors
  const errorLoss = orders * errorRate * aov * grossMargin;

  // 2. Cost of manual time saved (3 minutes/order = 0.05 hour/order)
  const timeSaved = orders * 0.05 * hourlyWage;

  // 3. Missed revenue from delivery uplift
  const baseRevenue = orders * aov;
  const upliftedRevenue = baseRevenue * conversionRate * conversionUplift * grossMargin;

  // Total savings
  const totalSavings = errorLoss + timeSaved +
