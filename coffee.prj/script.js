const products = [
    { id: 1, name: 'HOT COFFEE', price: 79, img: 'image/coffee.png' },
    { id: 2, name: 'COLD COFFEE', price: 199, img: 'image/cold coffee.png' },
    { id: 3, name: 'FRESH JUICE', price: 199, img: 'image/fresh juice.png' },
    { id: 4, name: 'VADAI', price: 49, img: 'image/vadai.png' },
    { id: 5, name: 'PAANI POORI', price: 99, img: 'image/pani poori.png' },
    { id: 6, name: 'SAMOSA', price: 49, img: 'image/samosa.png' }
];

let cart = [];

window.onload = () => {
    renderProducts();
    generateInvoice();
};

// Generate a random invoice number
function generateInvoice() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('invoiceNum').value = 'KC-' + randomNum;
}

// Display products in the grid
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1">
            <button onclick="addToBill(${p.id})">Add Item</button>
        </div>
    `).join('');
}

// Add item to the billing table
function addToBill(id) {
    const product = products.find(p => p.id === id);
    const qtyField = document.getElementById(`qty-${id}`);
    const quantity = parseInt(qtyField.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ ...product, qty: quantity });
    }

    // Reset quantity input to 1
    qtyField.value = 1;
    updateBillTable();
}

// Update the table and total
function updateBillTable() {
    const tbody = document.getElementById('billBody');
    let grandTotal = 0;

    tbody.innerHTML = cart.map((item, index) => {
        const rowTotal = item.price * item.qty;
        grandTotal += rowTotal;
        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>₹${item.price}</td>
                <td>₹${rowTotal}</td>
            </tr>
        `;
    }).join('');

    document.getElementById('grandTotal').innerText = grandTotal;
}