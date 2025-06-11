const categories = {
  "Fashion": {
    cases: ["Alex's Aprons", "Tom's Tees", "Mikey's Mittens"],
    personas: {
      low: "👗 Starting out? Fashion brands often juggle packaging & stock. Zenstores simplifies it so you can focus on trends.",
      mid: "🧵 Scaling up? Zenstores streamlines fashion fulfilment so you can stay on top of demand.",
      high: "🛍️ Shipping thousands? Zenstores keeps your seasonal stock moving and customers coming back."
    }
  },
  "Food & Drink": {
    cases: ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"],
    personas: {
      low: "🍏 Fresh start? Small food businesses need reliability — we’ve got your back.",
      mid: "🥦 Mid-growth? Zenstores keeps perishable orders precise and on-time.",
      high: "🚚 High-volume? Zenstores helps you ship fast and scale fearlessly."
    }
  },
  "Beauty & Fitness": {
    cases: ["Alex's Algae", "Tom's Training", "Mikey's Mascara"],
    personas: {
      low: "💄 New brand? We help beauty businesses look polished from the first parcel.",
      mid: "📦 Growing? Zenstores makes fulfilment seamless as orders rise.",
      high: "💪 Big brand? Get speed, automation, and reliability at scale."
    }
  },
  "Other": {
    cases: ["Alex's Antiques", "Tom's Tools", "Mikey's Machines"],
    personas: {
      low: "🛠️ Just starting? Zenstores gets your operation off the ground.",
      mid: "⚙️ Growing brand? We simplify shipping and save you hours.",
      high: "🏭 High-volume? Zenstores powers your next stage of growth."
    }
  }
};

const categoryButtons = document.querySelectorAll('.category-btn');
const personaMessage = document.getElementById('personaMessage');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const similarBusinessesContainer = document.getElementById('similarBusinesses');

let selectedCategory = 'Fashion';

function getOrderTier(orders) {
  if (orders < 1000) return 'low';
  if (orders < 5000) return 'mid';
  return 'high';
}

function updatePersonaAndBusinesses() {
  const orders = Number(orderSlider.value);
  orderValueDisplay.textContent = orders.toLocaleString();

  const cat = categories[selectedCategory];
  const tier = getOrderTier(orders);

  // Update persona text
  personaMessage.textContent = cat.personas[tier];

  // Update example businesses
  similarBusinessesContainer.innerHTML = '';
  cat.cases.forEach(biz => {
    const div = document.createElement('div');
    div.className = 'business-box';
    div.textContent = biz;
    similarBusinessesContainer.appendChild(div);
  });
}

// Category button click handler
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedCategory = button.getAttribute('data-category');
    updatePersonaAndBusinesses();
  });
});

// Input change handler
orderSlider.addEventListener('input', updatePersonaAndBusinesses);

// Initialize on load
updatePersonaAndBusinesses();
