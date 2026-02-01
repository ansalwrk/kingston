// Function to handle category navigation
function navigateTo(path) {
    // Removed the "wwwwww" prefix to ensure the path works correctly
    console.log("Opening collection: " + path);
    
    // Redirects the user to the specific folder/file
    window.location.href = path;
}

// Ensure the page loads smoothly
window.onload = () => {
    console.log("King of Fashion online store is ready.");
};
