const personaData = {
  "Food & Drink": [
    {
      maxOrders: 1000,
      persona: "Food & Drink Startup",
      businessExample: "Alex's Apples",
      challenges: ["📦 Challenge 1", "⏱ Challenge 2", "💰 Challenge 3"]
    },
    {
      maxOrders: 5000,
      persona: "Taste Explorer",
      businessExample: "Tom's Tomatoes",
      challenges: ["📦 Challenge 4", "⏱ Challenge 5", "💰 Challenge 6"]
    },
    {
      maxOrders: Infinity,
      persona: "Food Industry Leader",
      businessExample: "Mikey's Munch",
      challenges: ["📦 Challenge 7", "⏱ Challenge 8", "💰 Challenge 9"]
    }
  ],
  "Beauty & Fitness": [
    {
      maxOrders: 1000,
      persona: "Beauty Beginner",
      businessExample: "Alex's Algae",
      challenges: ["🧴 Challenge 1", "🚚 Challenge 2", "📊 Challenge 3"]
    },
    {
      maxOrders: 5000,
      persona: "Health Enthusiast",
      businessExample: "Tom's Training",
      challenges: ["🧴 Challenge 4", "🚚 Challenge 5", "📊 Challenge 6"]
    },
    {
      maxOrders: Infinity,
      persona: "Industry Icon",
      businessExample: "Mikey's Mascara",
      challenges: ["🧴 Challenge 7", "🚚 Challenge 8", "📊 Challenge 9"]
    }
  ],
  "Fashion": [
    {
      maxOrders: 1000,
      persona: "Style Starter",
      businessExample: "Alex's Aprons",
      challenges: ["👕 Challenge 1", "📦 Challenge 2", "💸 Challenge 3"]
    },
    {
      maxOrders: 5000,
      persona: "Fashion Enthusiast",
      businessExample: "Tom's Tees",
      challenges: ["👕 Challenge 4", "📦 Challenge 5", "💸 Challenge 6"]
    },
    {
      maxOrders: Infinity,
      persona: "Fashion Powerhouse",
      businessExample: "Mikey's Mittens",
      challenges: ["👕 Challenge 7", "📦 Challenge 8", "💸 Challenge 9"]
    }
  ]
};

const categoryButtons = document.querySelectorAll('.category-btn');
const personaMessage = document.getElementById('personaMessage');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const similarBusinessesContainer = document.getElementById('similarBusinesses');
const challengesContainer = document.getElementById('challengesContainer');

let selectedCategory = 'Fashion';

function updatePersonaAndBusinesses() {
  const orders = Number(orderSlider.value);
  orderValueDisplay.textContent = orders.toLocaleString();

  const categoryArray = personaData[selectedCategory];
  if (!categoryArray) {
    personaMessage.textContent = You're in a unique category. We'd love to learn more!;
    similarBusinessesContainer.innerHTML = '';
    challengesContainer.innerHTML = '';
    return;
  }

  let personaObj = categoryArray.find(item => orders <= item.maxOrders) || categoryArray[categoryArray.length - 1];
  personaMessage.textContent = You’re a "${personaObj.persona}".;

  // Similar business
  similarBusinessesContainer.innerHTML = '';
  const businessDiv = document.createElement('div');
  businessDiv.className = 'business-box';
  businessDiv.textContent = personaObj.businessExample;
  similarBusinessesContainer.appendChild(businessDiv);

  // Challenges
  challengesContainer.innerHTML = '';
  personaObj.challenges.forEach(challenge => {
    const li = document.createElement('li');
    li.textContent = challenge;
    challengesContainer.appendChild(li);
  });
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

updatePersonaAndBusinesses();
