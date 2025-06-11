const categories = {
  "Fashion": {
    persona: "Fashion businesses often deal with fast-moving trends and seasonal stock. Optimise your fulfilment to keep customers happy and returns low.",
    examples: ["Alex's Aprons", "Tom's Tees", "Mikey's Mittens"]
  },
  "Food & Drink": {
    persona: "Food & Drink requires precision and speed to maintain freshness. Zenstores helps you deliver on time, every time.",
    examples: ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"]
  },
  "Beauty & Fitness": {
    persona: "Beauty & Fitness brands benefit from streamlined packaging and tracking to enhance customer loyalty.",
    examples: ["Alex's Algae", "Tom's Training", "Mikey's Mascara"]
  },
  "Other": {
    persona: "No matter your business type, Zenstores helps you simplify shipping and scale faster.",
    examples: ["Alex's Anything", "Tom's Tools", "Mikey's Market"]
  }
};

const categoryButtons = document.querySelectorAll(".category-btn");
const personaMessage = document.getElementById("personaMessage");
const ordersInput = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const caseStudyList = document.getElementById("caseStudyList");

let selectedCategory = "Fashion";

function updatePersona() {
  const category = categories[selectedCategory];
  if (category) {
    personaMessage.textContent = category.persona;
  }
}

function updateCaseStudies() {
  const examples = categories[selectedCategory]?.examples || [];
  caseStudyList.innerHTML = examples
    .map(name => `<div class="case-study">${name}</div>`)
    .join("");
}

function updateSliderLabel() {
  const value = parseInt(ordersInput.value, 10);
  orderValue.textContent = value >= 20000 ? "20,000+" : value;
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

ordersInput.addEventListener("input", updateSliderLabel);

// Initial load
updatePersona();
updateCaseStudies();
updateSliderLabel();
