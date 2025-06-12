const sliderSteps = [];
for (let i = 250; i <= 2500; i += 250) sliderSteps.push(i);
for (let i = 3000; i <= 10000; i += 500) sliderSteps.push(i);
for (let i = 11000; i <= 50000; i += 1000) sliderSteps.push(i);

const personaData = {
  "Food & Drink": [
    {
      maxOrders: 1500,
      persona: "Startup Brewery",
      businessExample: {
        name: "Arbor Ales",
        image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b425b091117c133ee9ac_case-study-arbor-ales-p-1080.png",
        link: "https://zenstores.com/case-study/arbor-ales"
      },
      challenges: ["📦 Manual Fulfilment", "⏱ Fragile Goods", "💰 Alcohol Age Verification"]
    },
    {
      maxOrders: 5000,
      persona: "Growing Food Brand",
      businessExample: {
        name: "Sa Brains & Co."
      },
      challenges: ["📦 Scaling fulfilment", "⏱ Lack of integrations", "💰 Perishable products"]
    },
    {
      maxOrders: Infinity,
      persona: "National Supplier",
      businessExample: {
        name: "Clearspring"
      },
      challenges: ["📦 Carrier flexibility", "⏱ Custom Bundles", "💰 Bespoke Orders"]
    }
  ],
  "Health & Beauty": [
    {
      maxOrders: 1500,
      persona: "Indie Skincare Brand",
      businessExample: {
        name: "Glow Botanicals"
      },
      challenges: ["📦 Small batch handling", "⏱ No automation", "💰 Delivery costs"]
    },
    {
      maxOrders: 5000,
      persona: "Wellness Scaleup",
      businessExample: {
        name: "Zen Beauty Co."
      },
      challenges: ["📦 Returns management", "⏱ Multi-channel sales", "💰 Stockouts"]
    },
    {
      maxOrders: Infinity,
      persona: "Global Beauty Brand",
      businessExample: {
        name: "Luna Labs"
      },
      challenges: ["📦 Custom packaging", "⏱ International logistics", "💰 Carrier negotiation"]
    }
  ],
  "Fashion & Apparel": [
    {
      maxOrders: 1500,
      persona: "Boutique Label",
      businessExample: {
        name: "Thread & Needle"
      },
      challenges: ["📦 Manual picking", "⏱ Size variations", "💰 Lost parcels"]
    },
    {
      maxOrders: 5000,
      persona: "Fast Fashion Brand",
      businessExample: {
        name: "Wearly"
      },
      challenges: ["📦 Flash sale spikes", "⏱ Pre-orders", "💰 High return rate"]
    },
    {
      maxOrders: Infinity,
      persona: "UK Clothing Chain",
      businessExample: {
        name: "ModWear"
      },
      challenges: ["📦 Seasonal inventory", "⏱ Store replenishment", "💰 Complex shipping rules"]
    }
  ],
  "Other": [
    {
      maxOrders: 1500,
      persona: "Specialist Retailer",
      businessExample: {
        name: "HobbyHut"
      },
      challenges: ["📦 Unique SKUs", "⏱ Long lead times", "💰 Expensive packaging"]
    },
    {
      maxOrders: 5000,
      persona: "DTC Innovator",
      businessExample: {
        name: "GadgetZone"
      },
      challenges: ["📦 Product bundling", "⏱ Multiple warehouses", "💰 Inventory sync"]
    },
    {
      maxOrders: Infinity,
      persona: "Multi-Category Giant",
      businessExample: {
        name: "OmniStore"
      },
      challenges: ["📦 Carrier APIs", "⏱ Enterprise ERPs", "💰 Custom SLAs"]
    }
  ]
};


const categoryButtons = document.querySelectorAll('.category-btn');
const personaMessage = document.getElementById('personaMessage');
const orderSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const similarBusinessesContainer = document.getElementById('similarBusinesses');
const challengesContainer = document.getElementById('challengesContainer');

let selectedCategory = "Fashion & Apparel";

function updatePersonaAndBusinesses() {
  const sliderIndex = parseInt(orderSlider.value);
  const orders = sliderSteps[sliderIndex];
  orderValueDisplay.textContent = orders.toLocaleString();

  const categoryArray = personaData[selectedCategory];
  if (!categoryArray) return;

  const personaObj = categoryArray.find(item => orders <= item.maxOrders) || categoryArray[categoryArray.length - 1];
  personaMessage.textContent = `You’re a "${personaObj.persona}".`;

  // Challenges with placeholder costs
  challengesContainer.innerHTML = '';
  personaObj.challenges.forEach((challenge, index) => {
    const cost = (index + 1) * orders;
    const li = document.createElement('li');
    li.textContent = `${challenge} – Estimated Cost: £${cost.toLocaleString()}`;
    challengesContainer.appendChild(li);
  });

  // Similar business with image link if available
  similarBusinessesContainer.innerHTML = '';
  if (personaObj.businessExample?.image && personaObj.businessExample?.link) {
    const img = document.createElement('img');
    img.src = personaObj.businessExample.image;
    img.alt = personaObj.businessExample.name;
    img.className = "business-image";

    const link = document.createElement('a');
    link.href = personaObj.businessExample.link;
    link.target = "_blank";
    link.appendChild(img);

    similarBusinessesContainer.appendChild(link);
  } else {
    similarBusinessesContainer.textContent = personaObj.businessExample?.name || '';
  }
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedCategory = button.getAttribute('data-category');
    updatePersonaAndBusinesses();
  });
});

orderSlider.setAttribute("max", sliderSteps.length - 1);
orderSlider.addEventListener("input", updatePersonaAndBusinesses);

updatePersonaAndBusinesses();
