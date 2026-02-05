const amountInput = document.getElementById('amount');
const payLabel = document.getElementById('payLabel');
const qrImage = document.getElementById('qrImage');

function updatePayLabel(){
  payLabel.textContent = Number(amountInput.value).toLocaleString();
  updateQR();
}

function updateQR(){
  const amt = amountInput.value;
  const upi = `upi://pay?pa=donation@upi&pn=GiveLikeAKing&am=${amt}&cu=INR`;
  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(upi);
}

amountInput.addEventListener('input', updatePayLabel);
updatePayLabel();

function printBill(){
  const name = document.getElementById('anonymous').checked
    ? 'Anonymous Donor'
    : document.getElementById('donorName').value || 'Guest';

  const amt = amountInput.value;

  const bill = document.createElement('div');
  bill.id = "printArea";
  bill.innerHTML = `
    <h2>Give Like a King — Donation Receipt</h2>
    <hr>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Amount:</strong> ₹${Number(amt).toLocaleString()}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
  `;

  document.body.appendChild(bill);
  window.print();
  document.body.removeChild(bill);
}
