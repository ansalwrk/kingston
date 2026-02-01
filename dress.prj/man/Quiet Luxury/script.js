const grid = document.getElementById('product-grid');

// Generate 30 products
for (let i = 1; i <= 30; i++) {
    grid.innerHTML += `
        <div class="product-card">
            <img src="image/dress (${i}).jpeg" alt="Dress ${i}" class="product-img">
            <h3>Luxury Dress ${i}</h3>
            
            <div class="controls">
                <select id="size-${i}">
                    <option value="S">Size S</option>
                    <option value="M">Size M</option>
                    <option value="L">Size L</option>
                    <option value="XL">Size XL</option>
                </select>
                
                <input type="number" id="qty-${i}" value="1" min="1">
            </div>

            <button onclick="placeOrder(${i})">Add to Order</button>
        </div>
    `;
}

function placeOrder(id) {
    const size = document.getElementById(`size-${id}`).value;
    const qty = document.getElementById(`qty-${id}`).value;
    const note = document.getElementById('notification');

    // Show confirmation with details in console
    console.log(`Order for Item ${id}: Size ${size}, Quantity ${qty}`);
    
    note.innerText = `Order Placed: ${qty}x Dress (${size})`;
    note.style.display = 'block';
    
    setTimeout(() => {
        note.style.display = 'none';
    }, 3000);
}