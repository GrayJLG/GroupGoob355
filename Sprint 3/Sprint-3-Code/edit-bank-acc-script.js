document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the data from localStorage
    const storedData = localStorage.getItem("bankAccount");

    if (storedData) {
        // Parse the JSON string into an object
        const accountData = JSON.parse(storedData);

        // Reference to the container where the data will be displayed
        const detailsContainer = document.getElementById("account-details");

        // Create HTML content dynamically
        detailsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${accountData.firstName}</p>
        <p><strong>Last Name:</strong> ${accountData.lastName}</p>
        <p>
            <strong>Account Number:</strong>
            <span class="hidden-numbers">
                <span id="account-number-hidden">${"*".repeat(accountData.accountNumber.length)}</span>
                <span id="account-number-visible" style="display: none;">${accountData.accountNumber}</span>
                <button id="toggle-account-number" class="toggle-show">
                    <i id="toggle-account-number-icon" class="fas fa-eye"></i>
                </button>
            </span>
        </p>
        <p>
            <strong>Routing Number:</strong>
            <span class="hidden-numbers">
                <span id="routing-number-hidden">${"*".repeat(accountData.routingNumber.length)}</span>
                <span id="routing-number-visible" style="display: none;">${accountData.routingNumber}</span>
                <button id="toggle-routing-number" class="toggle-show">
                    <i id="toggle-routing-number-icon" class="fas fa-eye"></i>
                </button>
            </span>
        </p>
        <p><strong>Address:</strong></p>
        <div class="address-container">
            <p class="address-details"><strong>Street:</strong> ${accountData.address.streetAddress}</p>
            <p class="address-details"><strong>City:</strong> ${accountData.address.city}</p>
            <p class="address-details"><strong>State:</strong> ${accountData.address.state}</p>
            <p class="address-details"><strong>ZIP Code:</strong> ${accountData.address.zipCode}</p>
        </div>
        `;

        // Add event listeners to the buttons
        document.getElementById("toggle-account-number").addEventListener("click", () => toggleVisibility('account-number'));
        document.getElementById("toggle-routing-number").addEventListener("click", () => toggleVisibility('routing-number'));
    } else {
        // If no data is found, display a message
        const detailsContainer = document.getElementById("account-details");
        detailsContainer.innerHTML = `<p>No account details found.</p>`;
    }
});

// Toggle visibility of sensitive information
window.toggleVisibility = function (field) {
    const hiddenElement = document.getElementById(`${field}-hidden`);
    const visibleElement = document.getElementById(`${field}-visible`);
    const buttonIcon = document.getElementById(`toggle-${field}-icon`);

    if (hiddenElement.style.display === "none") {
        // Hide sensitive info and show masked version
        hiddenElement.style.display = "inline";
        visibleElement.style.display = "none";
        buttonIcon.classList.remove("fa-eye-slash");
        buttonIcon.classList.add("fa-eye");
    } else {
        // Show sensitive info and hide masked version
        hiddenElement.style.display = "none";
        visibleElement.style.display = "inline";
        buttonIcon.classList.remove("fa-eye");
        buttonIcon.classList.add("fa-eye-slash");
    }
};


function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const accountNumber = document.getElementById("account-number").value;
    const routingNumber = document.getElementById("routing-number").value;
    const streetAddress = document.getElementById("street-address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("select-state").value;
    const zipCode = document.getElementById("zip-code").value;

    // Create a JSON object
    const accountData = {
        firstName,
        lastName,
        accountNumber,
        routingNumber,
        address: {
            streetAddress,
            city,
            state,
            zipCode
        }
    };

    // Store the data in localStorage
    localStorage.setItem("bankAccount", JSON.stringify(accountData));

    // Redirect to a confirmation or another page if needed
    alert("Bank account information saved successfully!");
    const url = "bank-account.html"; // Update the redirection page if needed
    window.location.href = url;
}

function handleBack() {
    // Redirect back to another page
    const url = "bank-account.html"; // Update as needed
    window.location.href = url;
}
