const categories = {
  Fashion: [
    {
      volumeMax: 2000,
      persona: "Small fashion startups needing quick turnaround for seasonal trends.",
      example: "We've helped indie boutiques increase shipping speed by 30%."
    },
    {
      volumeMax: 10000,
      persona: "Growing fashion brands managing multiple SKUs and seasonal peaks.",
      example: "We supported brands scaling from 5k to 15k orders/month."
    },
    {
      volumeMax: Infinity,
      persona: "Large fashion retailers with complex fulfilment needs.",
      example: "Helping enterprise brands cut fulfilment errors by 50%."
    }
  ],
  "Food & Drink": [
    {
      volumeMax: 2000,
      persona: "Local food producers focused on freshness and fast delivery.",
      example: "Enabled artisan food shops to reduce delivery delays by 20%."
    },
    {
      volumeMax: 10000,
      persona: "Regional food & drink companies optimizing cold-chain logistics.",
      example: "Helping brands scale with real-time delivery tracking."
    },
    {
      volumeMax: Infinity,
      persona: "National food distributors managing complex shipping routes.",
      example: "Reducing wastage and improving customer satisfaction at scale."
    }
  ],
  "Beauty & Fitness": [
    {
      volumeMax: 2000,
      persona: "Boutique beauty brands with personalized packaging needs.",
      example: "Streamlined order packing to boost customer retention."
    },
    {
      volumeMax: 10000,
      persona: "Mid-sized fitness and beauty companies expanding product lines.",
      example: "Helped businesses launch new SKUs without disruption."
    },
    {
      volumeMax: Infinity,
      persona: "Large beauty and fitness brands managing high volume fulfilment.",
      example: "Reducing returns and errors for national distribution."
    }
  ],
  "Home & Garden": [
    {
      volumeMax: 2000,
      persona: "Small homeware brands focusing on quality and care in packing.",
      example: "Improved packaging speed and reduced damage rates."
    },
    {
      volumeMax: 10000,
      persona: "Growing garden and home product sellers expanding online.",
      example: "Supported scale-up with integrated shipping solutions."
    },
    {
      volumeMax: Infinity,
      persona: "Large home & garden retailers with multi-warehouse fulfilment.",
      example: "Optimised logistics to cut delivery times by 40%."
    }
  ]
};

const categoryButtons = document.querySelectorAll(".category-btn");
const ordersSlider = document.getElementById("orders");
const orderValueDisplay = document.getElementById("orderValue");
const aovInput = document.getElementById("aov");
const personaMessage = document.getElementById("personaMessage");
const businessExamples = document.getElementById("businessExamples");

let selectedCategory = "Fashion";

// Utility to get tier info by orders for category
function getTier(category, orders) {
  const tiers = categories[category];
  for (const tier of tiers) {
    if (orders <= tier.volumeMax) return tier;
  }
  return tiers[tiers.length - 1]; // fallback to last tier (Infinity)
}

function updateUI() {
  // Clamp orders slider max to 20000
  let orders = parseInt(ordersSlider.value, 10);
  if (orders >= 20000) {
    orderValueDisplay.textContent = "20,000+";
    orders = 20000;
  } else {
    orderValueDisplay.textContent = orders.toLocaleString();
  }

  // Update persona & examples
  const tier = getTier(selectedCategory, orders);
  personaMessage.textContent = tier.persona || "";

  // Update example businesses content
  businessExamples.textContent = tier.example || "";
}

// Handle category button clicks
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedCategory = btn.getAttribute("data-category");
    updateUI();
  });
});

// Update on slider or AOV input change (AOV kept in UI for future use)
ordersSlider.addEventListener("input", updateUI);
aovInput.addEventListener("input", () => {
  // You could use AOV in calculations later if needed
});

// Initialize UI on load
updateUI();
