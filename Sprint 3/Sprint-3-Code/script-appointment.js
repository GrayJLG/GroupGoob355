document.addEventListener("DOMContentLoaded", () => {
    let selectedAppointment = null;

    // Function to generate a random time between 09:00 and 21:00 in 1-hour intervals
    const generateRandomTime = () => {
        const startHour = 9;
        const endHour = 21;

        // Generate a random hour between startHour and endHour
        const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;

        // Format time as HH:00
        return `${String(randomHour).padStart(2, '0')}:00`;
    };

    // Assign a random time to each available box
    document.querySelectorAll('.available-box').forEach(box => {
        const randomTime = generateRandomTime();
        const timeElement = box.querySelector('.available-text');
        if (timeElement) {
            timeElement.innerText = randomTime;
        }
    });

    // Handle appointment selection
    const selectAppointment = (box) => {
        document.querySelectorAll('.available-box').forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        selectedAppointment = box; // Store the currently selected appointment
    };

    // Attach click event listeners to each appointment box
    document.querySelectorAll('.available-box').forEach(box => {
        box.addEventListener('click', () => selectAppointment(box));
    });

    // Submit button event listener
    document.querySelector(".submit").addEventListener("click", () => {
        if (!selectedAppointment) {
            alert("Please select an appointment before submitting.");
            return;
        }

        // Get the selected date from localStorage and the appointment time
        const selectedDate = localStorage.getItem("selectedDay");
        const selectedTime = selectedAppointment.querySelector('.available-text').innerText;

        if (!selectedDate) {
            alert("Please select a date on the calendar before choosing an appointment time.");
            return;
        }

        const confirmation = window.confirm(`You have selected:\n${selectedDate} at ${selectedTime}\n\nIs this correct?`);
        if (confirmation) {
            // Save the selected date and time in localStorage
            const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
            appointments.push({ date: selectedDate, time: selectedTime, details: "Therapy Appointment Scheduled" });
            localStorage.setItem("appointments", JSON.stringify(appointments));

            // Redirect to the calendar page
            window.location.href = "calendar.html";
        }
    });

    // Cancel button event listener
    document.querySelector(".cancel").addEventListener("click", () => {
        window.location.href = "calendar.html";
    });
});
