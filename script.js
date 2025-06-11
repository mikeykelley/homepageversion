const personaData = {
  "Food & Drink": [
    { maxOrders: 1000, persona: "Food & Drink Startup", businessExample: "Alex's Apples" },
    { maxOrders: 5000, persona: "Taste Explorer", businessExample: "Tom's Tomatoes" },
    { maxOrders: Infinity, persona: "Food Industry Leader", businessExample: "Mikey's Munch" }
  ],
  "Beauty & Fitness": [
    { maxOrders: 1000, persona: "Beauty Beginner", businessExample: "Alex's Algae" },
    { maxOrders: 5000, persona: "Health Enthusiast", businessExample: "Tom's Training" },
    { maxOrders: Infinity, persona: "Industry Icon", businessExample: "Mikey's Mascara" }
  ],
  "Fashion": [
    { maxOrders: 1000, persona: "Style Starter", businessExample: "Alex's Aprons" },
    { maxOrders: 5000, persona: "Fashion Enthusiast", businessExample: "Tom's Tees" },
    { maxOrders: Infinity, persona: "Fashion Powerhouse", businessExample: "Mikey's Mittens" }
  ]
};

const categoryButtons = document.querySelectorAll('.category-btn');
const personaMessage = document.getElementById('personaMessage');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
// Assuming you still want the AOV input and business container, just one business now
const aovInput = document.getElementById('aov');
const similarBusinessesContainer = document.getElementById('similarBusinesses');

let selectedCategory = 'Fashion';

function updatePersonaAndBusinesses() {
  const orders = Number(orderSlider.value);
  orderValueDisplay.textContent = orders.toLocaleString();

  const categoryArray = personaData[selectedCategory];
  let personaObj = categoryArray.find(item => orders <= item.maxOrders);

  if (!personaObj) {
    personaObj = categoryArray[categoryArray.length - 1];
  }

  personaMessage.textContent = `You’re a "${personaObj.persona}".`;

  // Clear previous content
  similarBusinessesContainer.innerHTML = '';

  // Create and append single business box
  const div = document.createElement('div');
  div.className = 'business-box';
  div.textContent = personaObj.businessExample;
  similarBusinessesContainer.appendChild(div);
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedCategory = button.getAttribute('data-category');
    updatePersonaAndBusinesses();
  });
});

orderSlider.addEventListener('input', updatePersonaAndBusinesses);

aovInput.addEventListener('input', () => {
  // Add logic here if needed
});

updatePersonaAndBusinesses();
