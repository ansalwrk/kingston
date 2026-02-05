document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const pickupDate = document.getElementById("pickupDate").value;
    const pickupTime = document.getElementById("pickupTime").value;
    const dropDate = document.getElementById("dropDate").value;
    const dropTime = document.getElementById("dropTime").value;

    const result = document.getElementById("result");
    result.style.display = "block";

    result.innerHTML = `
        <h3>✅ Booking Confirmed</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Pickup location:</strong> ${pickup}</p>
        <p><strong>Drop location:</strong> ${drop}</p>
        <p><strong>Pickup date & time:</strong> ${pickupDate} at ${pickupTime}</p>
        <p><strong>Drop date & time :</strong> ${dropDate} at ${dropTime}</p>
        <p> for more details call +916282753288</p>
    `;
});
