document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age =document.getElementById('age').value;
    const mobile = document.getElementById('mobile').value;
    const reason = document.getElementById('reason').value;

    // Display a premium confirmation message
    alert(`Registration Successful!\n\nDear ${name}, your request for "${reason}" has been recorded at King Hospital.\n\nOur team will contact you at ${mobile} shortly.`);
    
    // Clear the form after submission
    this.reset();
});