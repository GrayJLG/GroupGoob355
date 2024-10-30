// make sure code only runs after html is fully loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  let selectedAppointment = null; // Variable to store the selected appointment

  // handle appt selection
  const selectAppointment = (box) => {
      // Remove 'selected' class from all appointment boxes
      document.querySelectorAll('.available-box').forEach(b => b.classList.remove('selected'));
    
      // Add 'selected' class to the clicked appointment box
      box.classList.add('selected');
      selectedAppointment = box; // Store the currently selected appointment
  };

  // Attach click event listeners to each appointment box
  document.querySelectorAll('.available-box').forEach(box => {
      box.addEventListener('click', () => selectAppointment(box));
  });

  // Button elements
  const handleSubmit = document.querySelector(".submit");
  const handleCancel = document.querySelector(".cancel");

  // Submit button event listener
  handleSubmit.addEventListener("click", () => {
      if (!selectedAppointment) { // Check if no appointment is selected
          alert("Please select an appointment before submitting."); // Alert user
          return; // Prevent further execution if no selection
      }
      
      // Get the details of the selected appointment
      const appointmentDetails = selectedAppointment.querySelector('.available-text').innerText;
      const confirmation = window.confirm(`You have selected:\n${appointmentDetails}\n\nIs this correct?`);

      if (confirmation) { // If user confirms
          // Save the selected date and appointment details in localStorage
        localStorage.setItem("selectedAppointment", JSON.stringify({
          date: localStorage.getItem("selectedDay"), // Date already stored from calendar selection
          details: appointmentDetails
      }));

      // Redirect to the calendar page
      window.location.href = "calendar.html";
      }
  });

  // Cancel button event listener
  handleCancel.addEventListener("click", () => {
      window.location.href = "calendar.html"; // Redirect to the calendar page
  });

  // Display selected date from localStorage if available
  const selectedDate = localStorage.getItem("selectedDay");
  if (selectedDate) {
      const dateElement = document.querySelector(".selected-date");
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      dateElement.innerText = `Selected Date: ${formattedDate}`;
  }

  
});
