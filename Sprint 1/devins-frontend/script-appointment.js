let selectedAppointment = null; // Variable to store the selected appointment

// Arrow function to handle appointment selection
const selectAppointment = (box) => {
    // Remove 'selected' class from all appointment boxes
    const boxes = document.querySelectorAll('.available-box');
    boxes.forEach(b => b.classList.remove('selected')); // Clear previous selection
  
    // Add 'selected' class to the clicked appointment box
    box.classList.add('selected');
    selectedAppointment = box; // Store the currently selected appointment
  };
  
  // Attach event listeners to each appointment box
  document.querySelectorAll('.available-box').forEach(box => {
    box.addEventListener('click', () => selectAppointment(box));
});

const handleSubmit = document.querySelector(".submit");
const handleCancel = document.querySelector(".cancel");
  
handleSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!selectedAppointment) { // Check if no appointment is selected
      alert("Please select an appointment before submitting."); // Alert user
      return; // Prevent further execution if no selection
    }
  
    // Get the details of the selected appointment
    const appointmentDetails = selectedAppointment.querySelector('.available-text').innerText;
    const confirmation = window.confirm(`You have selected:\n${appointmentDetails}\n\nIs this correct?`); // Confirmation dialog
  
    if (confirmation) { // If user confirms
      const url = "calendar.html"; // URL to redirect to
      window.location.href = url; // Redirect to the calendar page
    }
});

handleCancel.addEventListener("click", (e) => {
    e.preventDefault();
    const url = "calendar.html"; // URL to redirect to
    window.location.href = url; // Redirect to the calendar page
});
