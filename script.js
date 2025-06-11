const categories = {
  "Fashion": {
    cases: ["Alex's Aprons", "Tom's Tees", "Mikey's Mitten's"],
    personas: {
      low: "Fashion brands just starting out often deal with stock organisation and basic fulfilment. We help streamline those first steps.",
      mid: "Scaling fashion brands often find fulfilment eats time. Zenstores frees you up to grow.",
      high: "Established fashion businesses rely on speed and seasonal flexibility. Zenstores keeps you agile."
    }
  },
  "Food & Drink": {
    cases: ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"],
    personas: {
      low: "Smaller food businesses need to nail freshness and timings. Zenstores ensures on-time delivery.",
      mid: "At mid-scale, keeping perishable orders accurate becomes harder. Zenstores gives you precision.",
      high: "For high volume food brands, efficiency is everything. Zenstores helps you scale without slipping."
    }
  },
  "Beauty & Fitness": {
    cases: ["Alex's Algae", "Tom's Training", "Mikey's Mascara"],
    personas: {
      low: "Early-stage beauty brands benefit from polished packaging and fast fulfilment. Zenstores has you covered.",
      mid: "As demand grows, managing shipments gets trickier. Zenstores makes it seamless.",
      high: "High-volume health and beauty brands rely on automation. Zenstores delivers reliability at scale."
    }
  },
  "Other": {
    cases: ["Alex's Antiques", "Tom's Tools", "Mikey's Machines"],
    personas: {
      low: "Getting started? Zenstores simplifies your shipping from day one.",
      mid: "Growing pains? We help streamline your operation.",
      high: "High-volume orders need structure. Zenstores brings it."
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
