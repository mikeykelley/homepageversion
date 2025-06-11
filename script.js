document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const personaMessage = document.getElementById('personaMessage');
  const ordersSlider = document.getElementById('orders');
  const orderValueDisplay = document.getElementById('orderValue');
  const aovInput = document.getElementById('aov');
  
  let selectedCategory = 'Fashion';
  let monthlyOrders = Number(ordersSlider.value);
  
  // Persona messages data: nested by category and order volume ranges
  const personaMessages = {
    'Fashion': [
      { max: 1000, text: 'You’re a stylish boutique with emerging online presence.' },
      { max: 5000, text: 'You’re growing fast in fashion e-commerce with loyal customers.' },
      { max: 25000, text: 'You’re an established fashion brand with complex shipping needs.' },
    ],
    'Food & Drink': [
      { max: 1000, text: 'Small but mighty food brand focusing on local deliveries.' },
      { max: 5000, text: 'Growing food & drink business scaling up fulfilment.' },
      { max: 25000, text: 'Large food & drink brand handling multiple channels and orders.' },
    ],
    'Beauty & Fitness': [
      { max: 1000, text: 'Niche beauty brand building your community.' },
      { max: 5000, text: 'You’re expanding your range and customer base steadily.' },
      { max: 25000, text: 'You’re a leading beauty & fitness company with high demand.' },
    ],
    'Home & Garden': [
      { max: 1000, text: 'Home & garden startup with focused local orders.' },
      { max: 5000, text: 'You’re scaling your product range and shipping nationwide.' },
      { max: 25000, text: 'You’re a well-established home & garden brand with complex logistics.' },
    ],
  };
  
  // Update the persona message based on category and volume
  function updatePersonaMessage() {
    const volume = monthlyOrders;
    const messages = personaMessages[selectedCategory];
    let matchedMessage = messages[messages.length - 1].text; // Default to highest
    
    for (const entry of messages) {
      if (volume <= entry.max) {
        matchedMessage = entry.text;
        break;
      }
    }
    
    personaMessage.textContent = matchedMessage;
  }
  
  // Update order volume display and recalc
  function updateOrderVolume(value) {
    monthlyOrders = Number(value);
    orderValueDisplay.textContent = monthlyOrders.toLocaleString();
    updatePersonaMessage();
    calculateSavings();
  }
  
  // Handle category button selection UI
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedCategory = btn.getAttribute('data-category');
      updatePersonaMessage();
      calculateSavings();
    });
  });
  
  // Calculate and update savings display (example, simple calc)
  function calculateSavings() {
    const aov = Number(aovInput.value) || 0;
    // Example logic for savings:
    const errorsCost = (monthlyOrders * 0.005) * aov; // 0.5% error rate cost
    const timeCost = (monthlyOrders * 3/60) * 12; // 3 mins per order, £12/hr wage
    const missedRevenue = (monthlyOrders * aov) * 0.03 * 0.10; // 10% uplift on 3% conv
    
    document.getElementById('errorsCost').textContent = errorsCost.toFixed(0);
    document.getElementById('timeCost').textContent = timeCost.toFixed(0);
    document.getElementById('missedRevenue').textContent = missedRevenue.toFixed(0);
    
    const total = errorsCost + timeCost + missedRevenue;
    document.getElementById('total').textContent = total.toFixed(0);
  }
  
  // Event listeners for slider and AOV input
  ordersSlider.addEventListener('input', (e) => updateOrderVolume(e.target.value));
  aovInput.addEventListener('input', () => calculateSavings());
  
  // Initialize default UI
  updateOrderVolume(monthlyOrders);
  updatePersonaMessage();
  calculateSavings();
});
