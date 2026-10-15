const inputs = document.querySelectorAll('.otp-input');
const verifyBtn = document.getElementById('verifyBtn');
const otpCard = document.getElementById('otpCard');
const successCard = document.getElementById('successCard');
const cardTitle = document.getElementById('cardTitle');
const cardSubtitle = document.getElementById('cardSubtitle');

// Input auto-focus logic
inputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    const val = e.target.value;
    
    if (!/^\d*$/.test(val)) {
      e.target.value = '';
      return;
    }

    if (val && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    checkCompletion();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

function checkCompletion() {
  const isFilled = Array.from(inputs).every(input => input.value.length === 1);
  verifyBtn.disabled = !isFilled;
}

// Verification with slot-machine/shuffle animation
verifyBtn.addEventListener('click', () => {
  verifyBtn.disabled = true;
  verifyBtn.textContent = 'Verifying...';
  cardTitle.textContent = 'Verifying Code';
  cardSubtitle.textContent = 'Please wait while we check your code...';

  // Disable typing during animation
  inputs.forEach(input => {
    input.readOnly = true;
    input.classList.add('shuffling');
  });

  // Rapidly cycle random digits in each box
  const shuffleInterval = setInterval(() => {
    inputs.forEach(input => {
      input.value = Math.floor(Math.random() * 10);
    });
  }, 70);

  // Stop shuffling after 2 seconds and reveal success
  setTimeout(() => {
    clearInterval(shuffleInterval);

    otpCard.classList.add('hidden');
    successCard.classList.remove('hidden');
  }, 2000);
});