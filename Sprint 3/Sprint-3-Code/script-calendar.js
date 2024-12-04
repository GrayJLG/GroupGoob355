// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    initCalendar(); // Initialize the calendar for the current month and year
    displaySavedAppointments(); // Display any saved appointments after calendar initializes
  });
  
const today = new Date(); // Get the current date
let month = today.getMonth(); // Current month (0-11)
let year = today.getFullYear(); // Current year

// Array of month names for easy reference
const months = [
"January", "February", "March",
"April", "May", "June",
"July", "August", "September",
"October", "November", "December",
];

// Function to initialize the calendar and populate days based on the current month and year
function initCalendar() {
// Calculate the first and last days of the current month
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);

// Calculate days for the previous month to fill the start of the calendar
const prevLastDay = new Date(year, month, 0);
const prevDays = prevLastDay.getDate();

// Get the last date of the current month
const lastDate = lastDay.getDate();

// Determine the starting day of the week for the first day of the month
const day = firstDay.getDay();

// Calculate the number of days to display from the next month to complete the last row
const nextDays = 7 - lastDay.getDay() - 1;

// Display the current month and year
document.querySelector(".date").innerHTML = `${months[month]} ${year}`;

let days = ""; // String to hold HTML for all calendar days

// Add days from the previous month (grayed out at the start)
for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date"><span class="day-number">${prevDays - x + 1}</span></div>`;
}

// Add days for the current month
for (let i = 1; i <= lastDate; i++) {
    const iterativeDate = new Date(year, month, i);
    const isWeekend = iterativeDate.getDay() === 0 || iterativeDate.getDay() === 6; // Check if day is Saturday or Sunday

    // Display days that are either weekends or past days without a schedule button
    if (isWeekend || iterativeDate < today) {
        days += `<div class="day"><span class="day-number">${i}</span></div>`;
    } 
    else {
        // Display regular days with a "Schedule Therapy Appointment" button
        days += `<div class="day"><span class="day-number">${i}</span>
                    <button class="schedule-btn" data-date="${iterativeDate.toISOString()}">Schedule Therapy Appointment</button>
                </div>`;
    }
}

// Add days from the next month to fill the last row
for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date"><span class="day-number">${j}</span></div>`;
}

// Insert the generated days HTML into the calendar
document.querySelector(".days").innerHTML = days;

// Add event listeners to each "Schedule Therapy Appointment" button to handle date selection
const schedules = document.querySelectorAll(".schedule-btn");

schedules.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering any parent event listeners
        const selectedDate = e.currentTarget.getAttribute("data-date"); // Get the date of the selected day
        localStorage.setItem("selectedDay", selectedDate); // Save selected date in localStorage
        window.location.href = "appointment-times.html"; // Redirect to appointment selection page
    });
});
}

// Function to display saved appointments on the calendar
function displaySavedAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || []; // Get saved appointments from localStorage
    if (appointments.length === 0) return; // Exit if no appointments are saved

    // Iterate over each saved appointment
    appointments.forEach(savedAppointment => {
        const { date, time, details } = savedAppointment;
        const appointmentDate = new Date(date);

        // Check if the saved appointment falls within the currently displayed month and year
        if (appointmentDate.getMonth() === month && appointmentDate.getFullYear() === year) {
            // Select all day elements in the calendar
            const dayElements = document.querySelectorAll(".day");
            dayElements.forEach(dayElement => {
                const dayNumber = parseInt(dayElement.querySelector(".day-number").innerText, 10);

                // Match the saved date with the calendar day
                if (dayNumber === appointmentDate.getDate()) {
                    const scheduleButton = dayElement.querySelector(".schedule-btn");
                    if (scheduleButton) {
                        scheduleButton.remove(); // Remove the schedule button if an appointment is saved
                    }

                    // Create a div to display the appointment details and time
                    const appointmentDiv = document.createElement("div");
                    appointmentDiv.classList.add("appointment-details");
                    appointmentDiv.innerText = `${details} at ${time}`;
                    appointmentDiv.setAttribute("data-date", date);
                    dayElement.appendChild(appointmentDiv); // Add the appointment details to the day
                }
            });
        }
    });

    attachAppointmentListeners(); // Attach listeners for managing appointments
}

// Attach event listeners for rescheduling or canceling saved appointments
function attachAppointmentListeners() {
const appts = document.querySelectorAll(".appointment-details");

appts.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering other events

        const selectedDate = e.currentTarget.getAttribute("data-date");
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        // Prompt user for rescheduling or cancellation choice
        const action = window.prompt("Would you like to (1) Reschedule or (2) Cancel this appointment? Enter 1 or 2.");
        if (action === "1") {
            // Reschedule: Remove current appointment, save date to reschedule, and redirect to selection page
            const updatedAppointments = appointments.filter(app => app.date !== selectedDate);
            localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
            localStorage.setItem("rescheduleDate", selectedDate);
            window.location.href = "appointment-times.html";
        } else if (action === "2") {
            // Cancel: Remove the appointment and refresh the calendar
            const updatedAppointments = appointments.filter(app => app.date !== selectedDate);
            localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
            initCalendar();
            displaySavedAppointments(); // Refresh the display to show updated calendar
        }
    });
});
}

// Functions for navigating between months
function prevMonth() {
    month--; // Go to the previous month
    if (month < 0) {
        month = 11;
        year--; // Adjust the year if necessary
    }
    initCalendar(); // Refresh the calendar for the new month
    displaySavedAppointments(); // Display appointments for the new month
}

function nextMonth() {
    month++; // Go to the next month
    if (month > 11) {
        month = 0;
        year++; // Adjust the year if necessary
    }
    initCalendar(); // Refresh the calendar for the new month
    displaySavedAppointments(); // Display appointments for the new month
}

// Add event listeners to the previous and next month buttons
document.querySelector(".prev").addEventListener("click", prevMonth);
document.querySelector(".next").addEventListener("click", nextMonth);

// Initialize the calendar on page load
initCalendar();

function redirectToTherapistSelect() {
    window.location.href = "therapist-select.html"; // Redirects to therapist-select.html
}