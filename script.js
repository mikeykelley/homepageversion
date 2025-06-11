const categories = {
  "Fashion": {
    cases: ["Alex's Aprons", "Tom's Tees", "Mikey's Mitten's"],
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

const categoryButtons = document.querySelectorAll(".category-btn");
const personaMessage = document.getElementById("personaMessage");
const ordersInput = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const case1 = document.getElementById("case1");
const case2 = document.getElementById("case2");
const case3 = document.getElementById("case3");

let selectedCategory = "Fashion";

function getVolumeTier(orders) {
  if (orders <= 2000) return "low";
  if (orders <= 10000) return "mid";
  return "high";
}

function updatePersona() {
  const orders = parseInt(ordersInput.value, 10);
  const tier = getVolumeTier(orders);
  const persona = categories[selectedCategory].personas[tier];
  personaMessage.textContent = persona;
}

function updateCases() {
  const cases = categories[selectedCategory].cases;
  case1.textContent = cases[0];
  case2.textContent = cases[1];
  case3.textContent = cases[2];
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedCategory = button.getAttribute("data-category");
    updatePersona();
    updateCases();
  });
});

ordersInput.addEventListener("input", () => {
  orderValue.textContent = ordersInput.value >= 20000 ? "20,000+" : ordersInput.value;
  updatePersona();
});

// Initial setup
updatePersona();
updateCases();
