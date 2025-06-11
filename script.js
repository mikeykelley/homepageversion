const personaData = {
  "Food & Drink": [
    {
      maxOrders: 1000,
      persona: "Food & Drink Startup",
      businessExample: "Alex's Apples",
      challenges: ["📦 Managing storage for perishable goods", "⏱ Fulfilling orders quickly during peak demand", "💰 Keeping delivery costs low for small orders"],
      quote: "Zenstores helped us streamline everything from packaging to dispatch. It was a game-changer for our small team."
    },
    {
      maxOrders: 5000,
      persona: "Taste Explorer",
      businessExample: "Tom's Tomatoes",
      challenges: ["📦 Managing rapid growth", "⏱ Juggling multiple courier services", "💰 Avoiding missed deliveries"],
      quote: "As we scaled, Zenstores scaled with us. It's like having a fulfilment assistant built into our operations."
    },
    {
      maxOrders: Infinity,
      persona: "Food Industry Leader",
      businessExample: "Mikey's Munch",
      challenges: ["📦 Multi-site dispatch management", "⏱ High-volume peak periods", "💰 Streamlining courier integrations"],
      quote: "Zenstores keeps our logistics efficient even on our busiest weeks. It’s our secret weapon."
    }
  ],
  "Beauty & Fitness": [
    {
      maxOrders: 1000,
      persona: "Beauty Beginner",
      businessExample: "Alex's Algae",
      challenges: ["🧴 Packing small, fragile items", "🚚 Choosing the right shipping options", "📊 Understanding customer delivery expectations"],
      quote: "Zenstores made it easy to turn fulfilment from a stress into a strength. Highly recommend!"
    },
    {
      maxOrders: 5000,
      persona: "Health Enthusiast",
      businessExample: "Tom's Training",
      challenges: ["🧴 Managing varied SKUs", "🚚 Next-day delivery coordination", "📊 Balancing service and speed"],
      quote: "Shipping used to be the bottleneck. Now it’s one of our strongest points thanks to Zenstores."
    },
    {
      maxOrders: Infinity,
      persona: "Industry Icon",
      businessExample: "Mikey's Mascara",
      challenges: ["🧴 Handling thousands of daily orders", "🚚 Maintaining fast dispatch at scale", "📊 Centralising fulfilment analytics"],
      quote: "With Zenstores, we fulfil faster, analyse better, and support more customers every day."
    }
  ],
  "Fashion": [
    {
      maxOrders: 1000,
      persona: "Fashion Founder",
      businessExample: "Alex's Accessories",
      challenges: ["👗 High return rates", "📦 Managing varied stock sizes", "⏱ Dispatching promo campaign orders"],
      quote: "I used to dread busy periods. Zenstores handles them effortlessly now."
    },
    {
      maxOrders: 5000,
      persona: "Style Seller",
      businessExample: "Tom's Threads",
      challenges: ["👗 Multi-size inventory", "📦 Complex order bundling", "⏱ Limited packing space"],
      quote: "Zenstores has helped us cut down fulfilment time and improve delivery consistency."
    },
    {
      maxOrders: Infinity,
      persona: "Trend Leader",
      businessExample: "Mikey's Moda",
      challenges: ["👗 International shipping coordination", "📦 Real-time stock tracking", "⏱ High daily order volumes"],
      quote: "Zenstores allows our ops team to focus on growth, not admin."
    }
  ],
  "Other": [
    {
      maxOrders: 1000,
      persona: "Online Entrepreneur",
      businessExample: "Alex's Art Supplies",
      challenges: ["📦 Niche packaging needs", "⏱ Organising solo dispatch", "💰 Avoiding courier overcharges"],
      quote: "The setup was quick and the impact was instant. Zenstores just works."
    },
    {
      maxOrders: 5000,
      persona: "Growing Operator",
      businessExample: "Tom's Tools",
      challenges: ["📦 Inventory accuracy", "⏱ Managing fulfilment alongside daily ops", "💰 Keeping fulfilment lean"],
      quote: "It’s like having a fulfilment team without needing to hire one."
    },
    {
      maxOrders: Infinity,
      persona: "Scaling Brand",
      businessExample: "Mikey's Market",
      challenges: ["📦 Scaling physical space", "⏱ Dispatching across channels", "💰 Forecasting courier costs"],
      quote: "Zenstores keeps everything ticking. We’ve grown twice as fast with it in place."
    }
  ]
};

const categoryButtons = document.querySelectorAll('.category-btn');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const personaMessage = document.getElementById('personaMessage');
const challengesContainer = document.getElementById('challengesContainer');
const similarBusinesses = document.getElementById('similarBusinesses');

let selectedCategory = "Fashion";

function updateCalculator() {
  const orderCount = parseInt(orderSlider.value, 10);
  orderValueDisplay.textContent = orderCount;

  const data = personaData[selectedCategory];
  const persona = data.find(p => orderCount <= p.maxOrders);

  // Update persona message with quote
  personaMessage.innerHTML = You're a <strong>${persona.persona}</strong><br/><em>"${persona.quote}"</em>;

  // Update challenges
  challengesContainer.innerHTML = "";
  persona.challenges.forEach(challenge => {
    const li = document.createElement("li");
    li.textContent = challenge;
    challengesContainer.appendChild(li);
  });

  // Update similar businesses
  similarBusinesses.innerHTML = "";
  const exampleDiv = document.createElement("div");
  exampleDiv.classList.add("business-box");
  exampleDiv.textContent = persona.businessExample;
  similarBusinesses.appendChild(exampleDiv);
}

// Event listeners
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedCategory = btn.dataset.category;
    updateCalculator();
  });
});

orderSlider.addEventListener('input', updateCalculator);

// Initial call
updateCalculator();
