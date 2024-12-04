// Function to save the selected day rating to localStorage
function saveRating() {
    // Get the selected rating
    const selectedRating = document.querySelector('input[name="dayRating"]:checked');

    if (!selectedRating) {
        alert("Please select a rating for your day.");
        return;
    }

    const ratingValue = selectedRating.value;

    // Save the rating in localStorage
    localStorage.setItem("dayRating", ratingValue);

    // Display confirmation message
    const display = document.getElementById("rating-display");
    display.style.display = "block";
    display.textContent = `You rated your day as ${ratingValue}/10.`;

    // Optionally log to console for debugging
    console.log(`Day rating saved: ${ratingValue}`);
}

// Load the saved rating on page load
window.onload = function () {
    const savedRating = localStorage.getItem("dayRating");

    if (savedRating) {
        const display = document.getElementById("rating-display");
        display.style.display = "block";
        display.textContent = `Your saved day rating is ${savedRating}/10.`;

        // Pre-check the previously selected rating
        const savedRatingElement = document.querySelector(`input[value="${savedRating}"]`);
        if (savedRatingElement) {
            savedRatingElement.checked = true;
        }
    }
};
