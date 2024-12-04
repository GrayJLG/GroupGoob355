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
