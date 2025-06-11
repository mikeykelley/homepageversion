const categories = {
  "Fashion": {
    baseText:
      "Fashion businesses often deal with fast-moving trends and seasonal stock. Optimise your fulfilment to keep customers happy and returns low.",
    volumeTexts: [
      "Small-scale fashion shops focusing on niche items with steady seasonal demand.",
      "Mid-volume fashion brands juggling multiple product lines and seasonal spikes.",
      "High-demand fashion businesses managing large-scale stock and quick turnaround times.",
    ],
    caseStudies: ["Alex's Aprons", "Tom's Tees", "Mikey's Mittens"],
  },
  "Food & Drink": {
    baseText:
      "Food & Drink requires precision and speed to maintain freshness. Zenstores helps you deliver on time, every time.",
    volumeTexts: [
      "Local food vendors ensuring fresh delivery with small batch orders.",
      "Mid-size food & drink brands managing inventory and seasonal trends.",
      "Large-scale fresh food businesses needing streamlined cold-chain fulfilment.",
    ],
    caseStudies: ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"],
  },
  "Beauty & Fitness": {
    baseText:
      "Beauty & Fitness brands benefit from streamlined packaging and tracking to enhance customer loyalty.",
    volumeTexts: [
      "Small beauty startups focusing on organic and handmade products.",
      "Growing fitness brands with expanding product ranges and memberships.",
      "Major beauty & fitness companies balancing high order volumes with personalised service.",
    ],
    caseStudies: ["Alex's Algae", "Tom's Training", "Mikey's Mascara"],
  },
  "Other": {
    baseText:
      "Various businesses with unique fulfilment needs. Zenstores adapts to keep your operations smooth.",
    volumeTexts: [
      "Small businesses with bespoke products and limited runs.",
      "Mid-sized operations scaling their order volumes carefully.",
      "High-volume sellers balancing multiple channels and stock locations.",
    ],
    caseStudies: ["Alex's Artifacts", "Tom's Tools", "Mikey's Misc"],
  },
};

const categoryButtons = document.querySelectorAll(".category-btn");
const personaMessage = document.getElementById("personaMessage");
const caseCardsContainer = document.getElementById("caseCards");
const ordersSlider = document.getElementById("orders");
const orderValueDisplay = document.getElementById("orderValue");
const aovInput = document.getElementById("aov");

let selectedCategory = "Fashion";

function updatePersonaAndCases() {
  const data = categories[selectedCategory];

  // Determine volume index based on order slider value
  const orderVal = parseInt(ordersSlider.value);
  let volumeIndex = 0;
  if (orderVal >= 15000) {
    volumeIndex = 2;
  } else if (orderVal >= 5000) {
    volumeIndex = 1;
  }

  // Update persona message
  personaMessage.textContent =
    data.baseText + " " + data.volumeTexts[volumeIndex];

  // Update case studies
  caseCardsContainer.innerHTML = "";
  data.caseStudies.forEach((caseName) => {
    const div = document.createElement("div");
    div.className = "case-box";
    div.textContent = caseName;
    caseCardsContainer.appendChild(div);
  });

  // Update displayed order value
  orderValueDisplay.textContent = orderVal.toLocaleString();
}

// Handle category button clicks
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove selected class from all buttons
    categoryButtons.forEach((b) => b.classList.remove("selected"));

    // Add selected class to clicked button
    btn.classList.add("selected");

    selectedCategory = btn.dataset.category;
    updatePersonaAndCases();
  });
});

// Handle slider input
ordersSlider.addEventListener("input", () => {
  updatePersonaAndCases();
});

// Initial update on page load
updatePersonaAndCases();
