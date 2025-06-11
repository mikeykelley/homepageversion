const categories = {
  "Fashion": {
    cases: ["Alex's Aprons", "Tom's Tees", "Mikey's Mitten's"],
    personas: {
      low: "👗 Starting out? Fashion brands often juggle packaging & stock. Zenstores simplifies it so you can focus on trends.",
      mid: "🧵 Scaling up? Zenstores streamlines fashion fulfilment so you can stay on top of demand.",
      high: "🛍️ Shipping thousands? Zenstores keeps your seasonal stock moving and customers coming back."
    }
  },
  "Food & Drink": {
    cases: ["Alex's Apples", "Tom's Tomatoes", "Mikey's Munch"],
    personas: {
      low: "🍏 Fresh start? Small food businesses need reliability — we’ve got your back.",
      mid: "🥦 Mid-growth? Zenstores keeps perishable orders precise and on-time.",
      high: "🚚 High-volume? Zenstores helps you ship fast and scale fearlessly."
    }
  },
  "Beauty & Fitness": {
    cases: ["Alex's Algae", "Tom's Training", "Mikey's Mascara"],
    personas: {
      low: "💄 New brand? We help beauty businesses look polished from the first parcel.",
      mid: "📦 Growing? Zenstores makes fulfilment seamless as orders rise.",
      high: "💪 Big brand? Get speed, automation, and reliability at scale."
    }
  },
  "Other": {
    cases: ["Alex's Antiques", "Tom's Tools", "Mikey's Machines"],
    personas: {
      low: "🛠️ Just starting? Zenstores gets your operation off the ground.",
      mid: "⚙️ Growing brand? We simplify shipping and save you hours.",
      high: "🏭 High-volume? Zenstores powers your next stage of growth."
    }
  }
};

const categoriesButtonsDiv = document.getElementById("categories-buttons");
const personaSection = document.getElementById("persona-section");
const personaCopy = document.getElementById("persona-copy");
const businessesCardsDiv = document.getElementById("businesses-cards");

let selectedCategory = null;

// Create category buttons
for (const category in categories) {
  const btn = document.createElement("button");
  btn.className = "category-button";
  btn.textContent = category;
  btn.addEventListener("click", () => {
    selectCategory(category, btn);
  });
  categoriesButtonsDiv.appendChild(btn);
}

function selectCategory(category, buttonEl) {
  selectedCategory = category;
  // Remove selected class from all buttons
  Array.from(categoriesButtonsDiv.children).forEach(btn => btn.classList.remove("selected"));
  // Add selected class to clicked button
  buttonEl.classList.add("selected");

  // Show persona section
  personaSection.style.display = "block";

  // Clear businesses cards
  businessesCardsDiv.innerHTML = "";

  // Show "Businesses We've Helped" cards for selected category
  const cases = categories[category].cases;
  cases.forEach(business => {
    const card = document.createElement("div");
    card.className = "business-card";
    card.textContent = business;
    businessesCardsDiv.appendChild(card);
  });

  // Reset persona copy until volume selected
  personaCopy.textContent = "Select your order volume below to see your Zenstores persona.";

  // Add order volume buttons below persona copy
  addVolumeButtons();
}

// Add order volume buttons (low/mid/high) below persona copy
function addVolumeButtons() {
  // Remove existing volume buttons if any
  const existing = document.getElementById("volume-buttons");
  if (existing) {
    existing.remove();
  }

  const volDiv = document.createElement("div");
  volDiv.id = "volume-buttons";
  volDiv.style.marginTop = "1rem";
  volDiv.style.display = "flex";
  volDiv.style.gap = "1rem";

  ["low", "mid", "high"].forEach(vol => {
    const volBtn = document.createElement("button");
    volBtn.textContent = vol.charAt(0).toUpperCase() + vol.slice(1);
    volBtn.style.flex = "1";
    volBtn.style.padding = "0.6rem 1rem";
    volBtn.style.border = "2px solid #0047ba";
    volBtn.style.borderRadius = "6px";
    volBtn.style.background = "white";
    volBtn.style.color = "#0047ba";
    volBtn.style.fontWeight = "600";
    volBtn.style.cursor = "pointer";
    volBtn.addEventListener("click", () => {
      selectVolume(vol, volBtn);
    });
    volDiv.appendChild(volBtn);
  });

  personaCopy.after(volDiv);
}

// When user selects volume (low/mid/high)
function selectVolume(vol, buttonEl) {
  // Highlight selected volume button
  const volButtons = document.getElementById("volume-buttons").children;
  for (const btn of volButtons) {
    btn.style.background = "white";
    btn.style.color = "#0047ba";
  }
  buttonEl.style.background = "#0047ba";
  buttonEl.style.color = "white";

  // Show persona text for selected category and volume
  personaCopy.textContent = categories[selectedCategory].personas[vol];
}
