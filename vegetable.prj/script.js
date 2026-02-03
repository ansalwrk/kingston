const vegetableData = [
    { name: "Tomato", price: 40, img: "https://images.unsplash.com/photo-1546473427-e1871457733e?w=200" },
    { name: "Potato", price: 35, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200" },
    { name: "Onion", price: 50, img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=200" },
    { name: "Green Chilli", price: 80, img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=200" },
    { name: "Cabbage", price: 30, img: "https://images.unsplash.com/photo-1591584250647-99c44f8f9a27?w=200" },
    { name: "Ginger", price: 160, img: "https://images.unsplash.com/photo-1599940824399-b87987cb94e0?w=200" }
];

const productGrid = document.getElementById('productGrid');
const grandTotalDisplay = document.getElementById('grandTotal');

function loadProducts() {
    vegetableData.forEach((veg, i) => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${veg.img}" alt="${veg.name}">
                <h3>${veg.name}</h3>
                <p>₹${veg.price} / KG</p>
                <input type="number" step="0.1" min="0" value="0" 
                    id="qty-${i}" class="qty-input" oninput="calculate()">
            </div>
        `;
    });
}

function calculate() {
    let total = 0;
    vegetableData.forEach((veg, i) => {
        const qty = document.getElementById(`qty-${i}`).value;
        total += (qty * veg.price);
    });
    grandTotalDisplay.innerText = total.toFixed(2);
}

function printInvoice() {
    const name = document.getElementById('custName').value || "Cash Customer";
    const phone = document.getElementById('custPhone').value || "N/A";
    const billItems = document.getElementById('billItems');
    let total = 0;

    billItems.innerHTML = "";
    document.getElementById('billDetails').innerText = `Date: ${new Date().toLocaleString()}\nCust: ${name} | Ph: ${phone}`;

    vegetableData.forEach((veg, i) => {
        const qty = document.getElementById(`qty-${i}`).value;
        if (qty > 0) {
            const amt = qty * veg.price;
            total += amt;
            billItems.innerHTML += `
                <tr>
                    <td>${veg.name}</td>
                    <td align="center">${qty} KG</td>
                    <td align="right">₹${amt.toFixed(2)}</td>
                </tr>
            `;
        }
    });

    if (total === 0) return alert("Please add at least one item!");

    document.getElementById('billGrandTotal').innerText = `TOTAL: ₹${total.toFixed(2)}`;
    window.print();
}

window.onload = loadProducts;