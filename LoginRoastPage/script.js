const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roast = document.getElementById('roast');
const avatar = document.getElementById('avatar');
const card = document.getElementById('card');
const body = document.body;

function triggerShake() {
  card.classList.remove('shake');
  void card.offsetWidth; // Trigger reflow
  card.classList.add('shake');
}

// Validate Email on Blur
emailInput.addEventListener('blur', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value && !emailRegex.test(emailInput.value)) {
    triggerShake();
    avatar.textContent = '💀';
    roast.textContent = "Bruh, that's not even an email.";
  }
});

// Evaluate Password Strength on Input
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;

  if (val.length === 0) {
    body.className = '';
    avatar.textContent = '🤨';
    roast.textContent = 'Type something... if you dare.';
    return;
  }

  if (val.length < 6) {
    body.className = 'weak-bg';
    avatar.textContent = '👵';
    roast.textContent = 'My grandma can hack this.';
  } else if (val.length < 10 || !/[A-Z]/.test(val) || !/[0-9]/.test(val)) {
    body.className = 'medium-bg';
    avatar.textContent = '😒';
    roast.textContent = 'Getting warmer, but still weak...';
  } else {
    body.className = 'strong-bg';
    avatar.textContent = '😎';
    roast.textContent = 'Okay okay, you got it! 🔥';
    
    // Trigger Confetti
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  }
});