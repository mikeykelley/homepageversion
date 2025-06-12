// Sample data structure for personas and challenges, per category & order volume tiers
const data = {
  "Fashion & Apparel": [
    {
      min: 0,
      max: 1500,
      persona: "Small Boutique",
      challenges: [
        { text: "High shipping costs", cost: 200 },
        { text: "Slow fulfillment times", cost: 150 },
        { text: "Limited carrier options", cost: 100 },
      ],
      similarBusinesses: ["Boutique A", "Boutique B"],
    },
    {
      min: 1501,
      max: 5000,
      persona: "Growing Apparel Brand",
      challenges: [
        { text: "Inventory syncing issues", cost: 500 },
        { text: "Shipping errors", cost: 400 },
        { text: "Scaling fulfillment", cost: 300 },
      ],
      similarBusinesses: ["Brand X", "Brand Y"],
    },
    {
      min: 5001,
      max: Infinity,
      persona: "Established Fashion Retailer",
      challenges: [
        { text: "Complex carrier contracts", cost: 1000 },
        { text: "International shipping delays", cost: 800 },
        { text: "High returns rate", cost: 600 },
      ],
      similarBusinesses: ["Retailer 1", "Retailer 2"],
    },
  ],
  // Add similar objects for Food & Drink, Health & Beauty, Other...
};

const categoryButtons = document.querySelectorAll('.category-btn');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const personaMessage = document.getElementById('personaMessage');
const challengesContainer = document.getElementById('challengesContainer');
const similarBusinessesContainer = document.getElementById('similarBusinesses');
const problemSizeEl = document.getElementById('problemSize');

let selectedCategory = "Fashion & Apparel";

function updateUI() {
  const orderVal = parseInt(orderSlider.value, 10);
  orderValueDisplay.textContent = orderVal;

  // Find the persona & challenges for the selected category and order volume
  const tiers = data[selectedCategory];
  let tier = tiers.find(t => orderVal >= t.min && orderVal <= t.max);

  if (!tier) {
    // fallback if none found
    tier = tiers[0];
  }

  // Update persona message
  personaMessage.textContent = `Persona: ${tier.persona}`;

  // Update challenges list
  challengesContainer.innerHTML = '';
  tier.challenges.forEach(challenge => {
    const li = document.createElement('li');
    li.textContent = challenge.text;
    li.setAttribute('data-cost', challenge.cost);
    challengesContainer.appendChild(li);
  });

  // Update similar businesses
  similarBusinessesContainer.innerHTML = '';
  tier.similarBusinesses.forEach(business => {
    const div = document.createElement('div');
    div.textContent = business;
    similarBusinessesContainer.appendChild(div);
  });

  // Update problem size
  updateProblemSize();
}

function updateProblemSize() {
  const challenges = challengesContainer.querySelectorAll('li[data-cost]');
  let total = 0;
  challenges.forEach(challenge => {
    const cost = parseFloat(challenge.getAttribute('data-cost'));
    if (!isNaN(cost)) total += cost;
  });

  problemSizeEl.textContent = `Size of the problem: £${total.toLocaleString()}`;
}

// Event listeners
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove selected class from all
    categoryButtons.forEach(btn => btn.classList.remove('selected'));
    // Add to clicked button
    button.classList.add('selected');
    selectedCategory = button.getAttribute('data-category');
    updateUI();
  });
});

orderSlider.addEventListener('input', () => {
  updateUI();
});

// Initial UI render
updateUI();
