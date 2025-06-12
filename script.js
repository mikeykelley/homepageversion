const categories = {
  "Fashion & Apparel": {
    personas: [
      { max: 1500, persona: "Growing Shopify brand", challenges: [1200, 900, 600] },
      { max: 5000, persona: "Scaling direct-to-consumer label", challenges: [3500, 2400, 1200] },
      { max: Infinity, persona: "Fast-growth fashion business", challenges: [7200, 4100, 2300] },
    ],
    similarBusinesses: [
      { name: "Perseverance London", url: "https://www.perseverancelondon.com/" },
      { name: "Cortili", url: "https://www.instagram.com/cortili/" },
      { name: "No One True Anything", url: "https://www.instagram.com/noonetrueanything/" },
    ],
  },
  "Food & Drink": {
    personas: [
      { max: 1500, persona: "Growing Shopify brand", challenges: [800, 700, 500] },
      { max: 5000, persona: "Scaling direct-to-consumer producer", challenges: [2600, 1800, 1400] },
      { max: Infinity, persona: "Fast-growth food business", challenges: [5400, 2900, 2000] },
    ],
    similarBusinesses: [
      { name: "Flavourly", url: "https://www.flavourly.com/" },
      { name: "Root Kitchen", url: "https://www.rootkitchen.uk/" },
      { name: "Pasta Evangelists", url: "https://pastaevangelists.com/" },
    ],
  },
  "Health & Beauty": {
    personas: [
      { max: 1500, persona: "Growing Shopify brand", challenges: [1000, 750, 500] },
      { max: 5000, persona: "Scaling skincare/beauty business", challenges: [3000, 2200, 1600] },
      { max: Infinity, persona: "Fast-growth wellness brand", challenges: [6600, 3600, 2400] },
    ],
    similarBusinesses: [
      { name: "UpCircle Beauty", url: "https://upcirclebeauty.com/" },
      { name: "AKT London", url: "https://www.aktlondon.com/" },
      { name: "Woody's", url: "https://www.instagram.com/woodys_uk/" },
    ],
  },
  "Other": {
    personas: [
      { max: 1500, persona: "Growing online seller", challenges: [900, 600, 500] },
      { max: 5000, persona: "Scaling business", challenges: [2800, 2000, 1300] },
      { max: Infinity, persona: "Fast-growth brand", challenges: [6000, 3500, 2100] },
    ],
    similarBusinesses: [
      { name: "Wave Spas", url: "https://wavespas.com/" },
      { name: "Grind", url: "https://grind.co.uk/" },
      { name: "Climbing Van", url: "https://climbingvan.co.uk/" },
    ],
  },
};

const ordersSlider = document.getElementById("orders");
const orderValue = document.getElementById("orderValue");
const personaMessage = document.getElementById("personaMessage");
const challengesContainer = document.getElementById("challengesContainer");
const similarBusinessesContainer = document.getElementById("similarBusinesses");
const categoryButtons = document.querySelectorAll(".category-btn");
const sizeLine = document.getElementById("size-of-problem");

let selectedCategory = "Fashion & Apparel";

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
  const orderCount = parseInt(ordersSlider.value * 50);
  orderValue.textContent = orderCount;

  const categoryData = categories[selectedCategory];
  const persona = categoryData.personas.find((p) => orderCount <= p.max);

  // Update persona message
  personaMessage.textContent = persona ? `You're a: ${persona.persona}` : "";

  // Update challenges
  const challengeTitles = ["Delivery anxiety", "Time wasted on shipping", "Undercharging for delivery"];
  const multipliers = [1, 2, 3];

  challengesContainer.innerHTML = "";
  let totalChallengeValue = 0;

  challengeTitles.forEach((title, i) => {
    const prevElement = document.getElementById(`challenge-${i}`);
    const previousValue = prevElement ? parseInt(prevElement.dataset.value) || 0 : 0;

    const value = orderCount * multipliers[i];
    totalChallengeValue += value;

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.id = `challenge-${i}`;
    span.dataset.value = value; // store the value for animation comparison
    li.innerHTML = `<strong>${title}:</strong> `;
    li.appendChild(span);
    challengesContainer.appendChild(li);

    animateValue(span, previousValue, value);
  });

  // Animate total challenge value
  const previousTotal = parseInt(sizeLine.dataset.value) || 0;
  sizeLine.dataset.value = totalChallengeValue;
  animateValue(sizeLine, previousTotal, totalChallengeValue);

  // Update similar businesses
  similarBusinessesContainer.innerHTML = "";
  categoryData.similarBusinesses.forEach((biz) => {
    const a = document.createElement("a");
    a.href = biz.url;
    a.target = "_blank";
    a.textContent = biz.name;
    a.classList.add("similar-business");
    similarBusinessesContainer.appendChild(a);
  });
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

// Initialize
updateUI();
