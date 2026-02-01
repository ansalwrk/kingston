// script.js — simple donation prototype logic
// This file is intentionally lightweight and uses mocked flows.
// In production, replace mocked payment with a secure provider (Stripe/Razorpay/etc.)

document.addEventListener('DOMContentLoaded', () => {
  const presets = document.querySelectorAll('.preset');
  const amountInput = document.getElementById('amount');
  const payLabel = document.getElementById('payLabel');
  const donationForm = document.getElementById('donationForm');
  const feedList = document.getElementById('feedList');

  // Progress campaign (mocked initial values)
  const raisedEducationEl = document.getElementById('raisedEducation');
  const progressEducationEl = document.getElementById('progressEducation');

  // Money trail elements
  const trailDonated = document.getElementById('trailDonated');
  const trailCause = document.getElementById('trailCause');
  const trailOps = document.getElementById('trailOps');

  // Keep a tiny in-memory ledger (could use localStorage)
  let ledger = {
    educationRaised: parseInt(raisedEducationEl.textContent.replace(/,/g,''), 10) || 45000
  };

  // Update pay label when amount changes
  function updatePayLabel() {
    const val = Number(amountInput.value) || 0;
    payLabel.textContent = val.toLocaleString();
  }
  amountInput.addEventListener('input', updatePayLabel);
  updatePayLabel();

  // Preset buttons set amount
  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = Number(btn.dataset.amount);
      amountInput.value = amt;
      updatePayLabel();
      // visual feedback
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 250);
    });
  });

  // Append a message to live feed
  function addFeedMessage(text) {
    const li = document.createElement('li');
    li.className = 'feed-item';
    li.textContent = text;
    feedList.prepend(li);
    // keep feed reasonable
    while (feedList.children.length > 30) feedList.removeChild(feedList.lastChild);
  }

  // Mock "one-tap" to create some activity
  const oneTapMock = document.getElementById('oneTapMock');
  oneTapMock.addEventListener('click', () => {
    // Choose a random preset and simulate donation
    const amounts = [250,500,1000,2500];
    const amt = amounts[Math.floor(Math.random() * amounts.length)];
    simulateDonation(amt, 'One‑Tap Patron', true);
  });

  // Form submit (minimal fields)
  donationForm.addEventListener('submit', e => {
    e.preventDefault();
    const amt = Math.max(10, Math.round(Number(amountInput.value) || 0));
    const nameInput = document.getElementById('donorName').value.trim();
    const anonymous = document.getElementById('anonymous').checked;
    const displayName = anonymous ? 'An anonymous King' : (nameInput || 'A Generous Patron');

    // Simple validation
    if (!amt || amt <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    // Simulate payment processing UI
    addFeedMessage(`Processing donation of ₹${amt.toLocaleString()}…`);
    setTimeout(() => {
      simulateDonation(amt, displayName, false);
      donationForm.reset();
      amountInput.value = 500;
      updatePayLabel();
    }, 900);
  });

  // Simulate a donation success: update ledger, feed, progress, and money trail
  function simulateDonation(amount, displayName, isMock) {
    // Add success feed entry
    const publicName = displayName || 'An anonymous donor';
    addFeedMessage(`${publicName} donated ₹${amount.toLocaleString()} to Education`);

    // Update campaign totals (Education)
    ledger.educationRaised += amount;
    raisedEducationEl.textContent = ledger.educationRaised.toLocaleString();
    // Assume goal is 100000 (from markup); compute percent
    const goal = 100000;
    const pct = Math.min(100, Math.round((ledger.educationRaised / goal) * 100));
    progressEducationEl.style.width = pct + '%';

    // Update money trail example: 95% to cause, 5% ops
    const toCause = Math.round(amount * 0.95);
    const ops = amount - toCause;
    trailDonated.textContent = amount.toLocaleString();
    trailCause.textContent = toCause.toLocaleString();
    trailOps.textContent = ops.toLocaleString();

    // Small celebratory feedback (temporary)
    if (!isMock) {
      showToast(`Thank you — your donation of ₹${amount.toLocaleString()} was received.`);
    }
  }

  // Small toast to acknowledge donation
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3500);
  }

  // Seed the feed with a humane example
  addFeedMessage('An anonymous King from Delhi just donated ₹1,000 to Education');

  // OPTIONAL: simulate external donations every 10s to give life to the feed (kept light)
  setInterval(() => {
    const names = ['A Kind Patron','An anonymous Queen','A Merciful Donor','A Generous Ally'];
    const causes = ['Education','Food Security','Health'];
    const amt = [500,1000,1500,2000][Math.floor(Math.random()*4)];
    const name = names[Math.floor(Math.random()*names.length)];
    const cause = causes[Math.floor(Math.random()*causes.length)];
    addFeedMessage(`${name} donated ₹${amt.toLocaleString()} to ${cause}`);
  }, 12000);
});