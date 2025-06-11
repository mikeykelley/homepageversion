const categories = {
  "Fashion": {
    baseText: "Fashion businesses often deal with fast-moving trends and seasonal stock. Optimise your fulfilment to keep customers happy and returns low.",
    volumeTexts: [
      "Small-scale fashion shops focusing on niche items with steady seasonal demand.",
      "Mid-volume fashion brands juggling multiple product lines and seasonal spikes.",
      "High-demand fashion businesses managing large-scale stock and quick turnaround times."
    ],
    caseStudies: ["Alex's Aprons", "Tom's Tees", "Mikey's Mittens"]
  },
  "Food & Drink": {
    baseText: "Food & Drink requires precision and speed to maintain freshness. Zenstores helps you deliver on time, every time.",
    volumeTexts: [
      "Local food vendors ensuring fresh delivery with small batch orders.",
      "Mid-size food & drink brands managing inventory and seasonal trends.",
      "Large-scale fresh food businesses needing streamlined cold-chain fulfilment."
    ],
    caseStudies: ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"]
  },
  "Beauty & Fitness": {
    baseText: "Beauty & Fitness brands benefit from streamlined packaging and tracking to enhance customer loyalty.",
    volumeTexts: [
      "Small beauty startups focusing on organic and handmade products.",
      "Growing fitness brands with expanding product ranges and memberships.",
      "Major beauty & fitness companies balancing high order volumes with personalised service."
    ],
    caseStudies: ["Alex's Algae", "Tom's Training", "Mikey's Mascara"]
  },
  "Other": {
    baseText: "Various businesses with unique fulfilment needs. Zenstores adapts to keep your operations smooth.",
    volumeTexts: [
      "Small businesses with tailored, hands-on fulfilment requirements.",
      "Mid-sized companies balancing complexity and efficiency in orders.",
      "Large operations with diverse product ranges and high order volumes."
    ],
    caseStudies: ["Business A", "Business B", "Business C"]
  }
};

const categoryButtons = document.querySelectorAll(".category-btn");
const personaMessage = document.getElementById("personaMessage");
const ordersInput = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const caseCardsContainer = document.getElementById("caseCards");

let selectedCategory = "Fashion";

function getVolumeTier(orders) {
  if (orders < 5000) return 0;
  if (orders < 15000) return 1;
  return 2;
}

function updatePersona() {
  const orders = parseInt(ordersInput.value, 10);
  const categoryData = categories[selectedCategory];
  if (!categoryData) {
    personaMessage.textContent = "";
    return;
  }
  const volumeTier = getVolumeTier(orders);
  const volumeText = categoryData.volumeTexts[volumeTier];
  personaMessage.textContent = volumeText || categoryData.baseText;
}

function updateCaseStudies() {
  caseCardsContainer.innerHTML = "";
  const caseStudies = categories[selectedCategory]?.caseStudies || [];
  caseStudies.forEach(name => {
    const div = document.createElement("div");
    div.className = "case-box";
    div.textContent = name;
    caseCardsContainer.appendChild(div);
  });
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedCategory = button.getAttribute("data-category");
    updatePersona();
    updateCaseStudies();
  });
});

ordersInput.addEventListener("input", () => {
  orderValue.textContent = Number(ordersInput.value).toLocaleString();
  updatePersona();
});

// Set initial display
orderValue.textContent = Number(ordersInput.value).toLocaleString();
updatePersona();
updateCaseStudies();
