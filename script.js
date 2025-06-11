// Data for personas by category and order count
const personaData = {
  Fashion: [
    { maxOrders: 1000, persona: "Style Starter", businessExamples: ["DressCo", "Trendline"] },
    { maxOrders: 5000, persona: "Fashion Enthusiast", businessExamples: ["UrbanVogue", "ShoeBuzz"] },
    { maxOrders: 10000, persona: "Retail Pro", businessExamples: ["ClothWorks", "ModaMart"] },
    { maxOrders: Infinity, persona: "Fashion Powerhouse", businessExamples: ["GlamHaus", "EliteStyles"] }
  ],
  "Food & Drink": [
    { maxOrders: 1000, persona: "Foodie Newbie", businessExamples: ["SnackJoy", "BrewMaster"] },
    { maxOrders: 5000, persona: "Taste Explorer", businessExamples: ["Sip & Savor", "FreshFeast"] },
    { maxOrders: 10000, persona: "Culinary Pro", businessExamples: ["GourmetGoods", "DailyDelights"] },
    { maxOrders: Infinity, persona: "Food Industry Leader", businessExamples: ["Epicurean", "FlavorFactory"] }
  ],
  "Beauty & Fitness": [
    { maxOrders: 1000, persona: "Beauty Beginner", businessExamples: ["GlowUp", "FitFam"] },
    { maxOrders: 5000, persona: "Health Enthusiast", businessExamples: ["ZenWell", "Radiance"] },
    { maxOrders: 10000, persona: "Beauty Pro", businessExamples: ["PureEssence", "ActiveLife"] },
    { maxOrders: Infinity, persona: "Industry Icon", businessExamples: ["VitalGlow", "PowerFit"] }
  ],
  Other: [
    { maxOrders: 1000, persona: "Starter", businessExamples: ["HomeBasics", "DailyNeeds"] },
    { maxOrders: 5000, persona: "Growing Business", businessExamples: ["EcoGoods", "CraftSpace"] },
    { maxOrders: 10000, persona: "Established Brand", businessExamples: ["ProSolutions", "MarketLeaders"] },
    { maxOrders: Infinity, persona: "Enterprise", businessExamples: ["GlobalCorp", "MegaBrands"] }
  ]
};

const categoryButtons = document.querySelectorAll('.category-btn');
const personaMessage = document.getElementById('personaMessage');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const aovInput = document.getElementById('aov');
const similarBusinessesContainer = document.getElementById('similarBusinesses');

let selectedCategory = 'Fashion';

// Update persona message and examples based on category and orders
function updatePersonaAndBusinesses() {
  const orders = Number(orderSlider.value);
  orderValueDisplay.textContent = orders.toLocaleString();

  const categoryArray = personaData[selectedCategory];
  let personaObj = categoryArray.find(item => orders <= item.maxOrders);

  if (!personaObj) {
    personaObj = categoryArray[categoryArray.length - 1];
  }

  personaMessage.textContent = `You’re a "${personaObj.persona}". Similar businesses:`;
  renderSimilarBusinesses(personaObj.businessExamples);
}

// Render similar business examples
function renderSimilarBusinesses(businesses) {
  similarBusinessesContainer.innerHTML = '';
  businesses.forEach(biz => {
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

// Input change handlers
orderSlider.addEventListener('input', updatePersonaAndBusinesses);
aovInput.addEventListener('input', () => {
  // Could add logic if needed based on AOV input
});

// Initialize on load
updatePersonaAndBusinesses();
