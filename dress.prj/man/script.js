function openCategory(name) {
    // Premium feedback: Add a small delay and a console log
    console.log("Navigating to collection:", name);
    
    // Create a smooth transition effect
    document.querySelector('.container').style.opacity = "0.5";
    
    setTimeout(() => {
        alert("Redirecting to the " + name + " Premium Collection...");
        document.querySelector('.container').style.opacity = "1";
        
        // In the future, you can use:
        // window.location.href = "category.html?type=" + name;
    }, 400);
}