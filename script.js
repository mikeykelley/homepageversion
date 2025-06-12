const personaData = {
  "Food & Drink": [
    {
      maxOrders: 1500,
      persona: "Food & Drink Startup",
      businessExample: "Arbor Ales",
      challenges: ["📦 Manual Fulfilment - £1,000 in lost time", "⏱ Fragile Goods - £X?", "💰 Alcohol Age Verificiation Regulations - £X?"]
    },
    {
      maxOrders: 5000,
      persona: "Taste Explorer",
      businessExample: "Sa Brains & Co.",
      challenges: ["📦 Challenge 4", "⏱ Challenge 5", "💰 Challenge 6"]
    },
    {
      maxOrders: Infinity,
      persona: "Food Industry Leader",
      businessExample: "Clearspring",
      challenges: ["📦 Challenge 7", "⏱ Challenge 8", "💰 Challenge 9"]
    }
  ],
  "Health & Beauty": [
    {
      maxOrders: 1500,
      persona: "Beauty Beginner",
      businessExample: "My Luxe Beauty",
      challenges: ["🧴 Challenge 1", "🚚 Challenge 2", "📊 Challenge 3"]
    },
    {
      maxOrders: 5000,
      persona: "Health Enthusiast",
      businessExample: "The Vitamin",
      challenges: ["🧴 Challenge 4", "🚚 Challenge 5", "📊 Challenge 6"]
    },
    {
      maxOrders: Infinity,
      persona: "Industry Icon",
      businessExample: "Nutrition Geeks",
      challenges: ["🧴 Challenge 7", "🚚 Challenge 8", "📊 Challenge 9"]
    }
  ],
  "Fashion & Apparel": [
    {
      maxOrders: 1500,
      persona: "Style Starter",
      businessExample: "Abiza",
      challenges: ["👕 Challenge 1", "📦 Challenge 2", "💸 Challenge 3"]
    },
    {
      maxOrders: 5000,
      persona: "Fashion Enthusiast",
      businessExample: "Messina Hembry",
      challenges: ["👕 Challenge 4", "📦 Challenge 5", "💸 Challenge 6"]
    },
    {
      maxOrders: Infinity,
      persona: "Fashion Powerhouse",
      businessExample: "Hollands Country Clothing",
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
    personaMessage.textContent = `You're in a unique category. We'd love to learn more!`;
    similarBusinessesContainer.innerHTML = '';
    challengesContainer.innerHTML = '';
    return;
  }

  let personaObj = categoryArray.find(item => orders <= item.maxOrders) || categoryArray[categoryArray.length - 1];
  personaMessage.textContent = `You’re a "${personaObj.persona}".`;

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
