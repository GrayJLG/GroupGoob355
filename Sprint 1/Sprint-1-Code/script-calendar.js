const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next");

const today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date"><span class="day-number">${prevDays - x + 1}</span></div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      const iterativeDate = new Date(year, month, i);
      // true if sunday or saturday
      const isWeekend = iterativeDate.getDay() === 0 || iterativeDate.getDay() === 6;
      if (isWeekend || iterativeDate < today) {
        days += `<div class="day">
                  <span class="day-number">${i}</span>
                </div>`;
      }
      else {
        days += `<div class="day">
                  <span class="day-number">${i}</span>
                  <button class="schedule-btn" data-date="${iterativeDate.toISOString()}">Schedule Therapy Appointment</button>
                  </div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date"><span class="day-number">${j}</span></div>`;
    }

    daysContainer.innerHTML = days;

    // attach event listeners for each schedule appt button
    const schedules = document.querySelectorAll(".schedule-btn");
   
    schedules.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // prevents triggering any parent event listeners
        const selectedDate = e.currentTarget.getAttribute("data-date");

        // save selected date then redirect
        localStorage.setItem("selectedDay", selectedDate);
        window.location.href = "appointment-times.html";
      });
    });
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();


const handleReturn = document.querySelector(".return");


// navigate back to the therapist selection page
handleReturn.addEventListener("click", () => {
  const url = "therapist-select.html"; // URL for the therapist selection page
  window.location.href = url; // Redirect to the therapist selection page
})

function displaySavedAppointment() {
  const savedAppointment = JSON.parse(localStorage.getItem("selectedAppointment"));
  if (!savedAppointment) return; // Exit if no appointment is saved

  const { date, details } = savedAppointment;
  const appointmentDate = new Date(date);

  // Find the corresponding day element in the calendar
  const dayElements = document.querySelectorAll(".day");
  dayElements.forEach(dayElement => {
      const dayNumber = parseInt(dayElement.querySelector(".day-number").innerText, 10);

      // verify if saved date matches calendar day
      if (dayNumber === appointmentDate.getDate() &&
          month === appointmentDate.getMonth() &&
          year === appointmentDate.getFullYear()) {

          // Create a new div to show the appointment details
          const scheduleBtn = document.querySelector(".schedule-btn");
          scheduleBtn.innerText = details;
          dayElement.appendChild(appointmentDiv);
      }
  });
}

// Call this function after initializing the calendar
initCalendar();
displaySavedAppointment();
