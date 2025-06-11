// Update displayed orders and recalc
function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

// Calculate the cheapest Zenstores plan price
function calculateZenstoresPrice(orders) {
  const planA = 79 + orders * 0.07;
  const planB = 159 + orders * 0.04;
  return Math.min(planA, planB);
}

// Determine persona tier and message based on orders and category
function getPersonaMessage(orders, category) {
  let baseMsg = '';
  if (orders < 2000) {
    baseMsg = "You're running a startup-level business, focusing on establishing your operations and optimizing early growth.";
  } else if (orders < 10000) {
    baseMsg = "Your business is growing steadily. With more orders to manage, efficiency and error prevention are crucial.";
  } else {
    baseMsg = "You operate at enterprise scale with high order volumes. Zenstores offers advanced automation and insights to maximize ROI and keep fulfilment seamless at scale.";
  }

  let categoryMsg = '';
  switch (category) {
    case 'fashion':
      categoryMsg = "Fashion businesses often deal with seasonal trends and returns — automation helps keep your supply chain agile.";
      break;
    case 'food':
      categoryMsg = "Food & Drink requires fast, accurate fulfilment with temperature controls and expiry date tracking.";
      break;
    case 'beauty':
      categoryMsg = "Beauty & Fitness brands benefit from streamlined inventory and multi-channel sales management.";
      break
