const personas = [
  { max: 1500, persona: "Growing Shopify brand", challenges: [1200, 900, 600] },
  { max: 10000, persona: "Scaling direct-to-consumer label", challenges: [3500, 2400, 1200] },
  { max: Infinity, persona: "Fast-growth business", challenges: [7200, 4100, 2300] },
];

const categoryQuirks = {
  "Fashion & Apparel": ["Frequent returns", "Sizing complexity"],
  "Food & Drink": ["Chilled/frozen deliveries", "Alcohol regulations"],
  "Health & Beauty": ["Hazardous goods restrictions", "Sensitive packaging"],
  "Other": ["Bulky items", "Irregular delivery times"]
};

const categories = {
  "Fashion & Apparel": {
    similarBusiness: {
      name: "Holland's Country Clothing",
      image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4ac80a2384710e0e4b73b_Holland%27s%20Country%20Clothing-p-500.png",
      url: "https://www.zenstores.com/case-study/hollands-country-clothing"
    }
  },
  "Food & Drink": {
    similarBusiness: {
      name: "Arbor Ales",
      image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b425b091117c133ee9ac_case-study-arbor-ales-p-800.png",
      url: "https://www.zenstores.com/case-study/arbor-ales"
    }
  },
  "Health & Beauty": {
    similarBusiness: {
      name: "The Vitamin",
      image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b67b0341cd7e7e5e941a_The%20Vitamin-p-500.png",
      url: "https://www.zenstores.com/case-study/the-vitamin"
    }
  },
  "Other": {
    similarBusiness: {
      name: "FNX Bathrooms",
      image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b477a18735bf49ed0e7737_FNX%20Bathrooms.png",
      url: "https://www.zenstores.com/case-study/fnx-bathrooms"
    }
  }
};

let selectedCategory = "Fashion & Apparel";

const ordersSlider = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const personaMessage = document.getElementById("personaMessage");
const challengesContainer = document.getElementById("challengesContainer");
const quirksContainer = document.getElementById("quirksContainer");
const similarBusinessesContainer = document.getElementById("similarBusinesses");
const categoryButtons = document.querySelectorAll(".category-btn");
const sizeLine = document.getElementById("size-of-problem");

// --- Maps slider value (0–37) to actual order count ---
function getOrderCount(sliderValue) {
  if (sliderValue <= 10) {
    return sliderValue * 250;
  } else if (sliderValue <= 25) {
    return 2500 + (sliderValue - 10) * 500;
  } else {
    return 10000 + (sliderValue - 25) * 1000;
  }
}

// --- Animation function ---
function animateValue(el, start, end, duration = 800, prefix = "£") {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = `${prefix}${value.toLocaleString()}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function updateUI() {
  const sliderValue = parseInt(ordersSlider.value);
  const orderCount = getOrderCount(sliderValue);
  orderValue.textContent = orderCount.toLocaleString();

  const persona = personas.find((p) => orderCount <= p.max);

  // Update persona message
  personaMessage.textContent = persona ? `You're a: ${persona.persona}` : "";

  // Update challenges
  const challengeTitles = ["Delivery anxiety", "Time wasted on shipping", "Undercharging for delivery"];
  const values = persona.challenges;

  challengesContainer.innerHTML = "";
  let totalChallengeValue = 0;

  challengeTitles.forEach((title, i) => {
    const prevElement = document.getElementById(`challenge-${i}`);
    const previousValue = prevElement ? parseInt(prevElement.dataset.value) || 0 : 0;

    const value = values[i];
    totalChallengeValue += value;

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.id = `challenge-${i}`;
    span.dataset.value = value;
    li.innerHTML = `<strong>${title}:</strong> `;
    li.appendChild(span);
    challengesContainer.appendChild(li);

    animateValue(span, previousValue, value);
  });

  // Animate total challenge value
  const previousTotal = parseInt(sizeLine.dataset.value) || 0;
  sizeLine.dataset.value = totalChallengeValue;

  let valueSpan = sizeLine.querySelector("span");
  if (!valueSpan) {
    valueSpan = document.createElement("span");
    sizeLine.textContent = "Size of the prize: ";
    sizeLine.appendChild(valueSpan);
  }
  animateValue(valueSpan, previousTotal, totalChallengeValue);

  // Update quirks
  quirksContainer.innerHTML = "";
  const quirks = categoryQuirks[selectedCategory] || [];
  quirks.forEach((quirk) => {
    const li = document.createElement("li");
    li.textContent = quirk;
    quirksContainer.appendChild(li);
  });

  // Update similar business section
  similarBusinessesContainer.innerHTML = "";

  const biz = categories[selectedCategory].similarBusiness;
  if (biz) {
    const a = document.createElement("a");
    a.href = biz.url;
    a.target = "_blank";
    a.classList.add("case-study-card");

    const img = document.createElement("img");
    img.src = biz.image;
    img.alt = biz.name;

    a.appendChild(img);
    similarBusinessesContainer.appendChild(a);
  }
}

ordersSlider.addEventListener("input", updateUI);

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedCategory = btn.dataset.category;
    updateUI();
  });
});

updateUI();
