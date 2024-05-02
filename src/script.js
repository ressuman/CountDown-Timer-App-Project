"use strict";

// Declare a variable for the countdown interval
let countdown;

// Select HTML elements
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

// Function to start the timer
function timer(seconds) {
  // Clear any existing timer
  clearInterval(countdown);

  // Calculate the future time when the timer will end
  const now = Date.now();
  const future = now + seconds * 1000;

  // Display initial time left and end time
  displayTimeLeft(seconds);
  displayEndTime(future);

  // Start the countdown
  countdown = setInterval(() => {
    const newNow = Date.now();
    const secondsLeft = Math.round((future - newNow) / 1000); // Calculate time remaining

    if (secondsLeft < 0) {
      clearInterval(countdown); // Stop countdown when time is up
      return;
    }

    displayTimeLeft(secondsLeft); // Update display every second
  }, 1000);
}

// Function to display the time left
// Format time in MM:SS format
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemain = seconds % 60;

  const display = `${minutes < 10 ? "0" : ""}${minutes}m:${
    secondsRemain < 10 ? "0" : ""
  }${secondsRemain}s`;

  timerDisplay.textContent = display;
}

// Function to display the end time
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();

  const adjustedHour = hour > 12 ? hour % 12 : hour;
  const minutes = end.getMinutes();

  const amPM = hour > 12 ? "PM" : "AM";

  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPM}`;
}

// Function to start the timer based on button click
function startTimer() {
  const seconds = parseInt(this.dataset.time);

  timer(seconds);
}

// Event listeners

// Add event listeners to time selection buttons
buttons.forEach((button) => button.addEventListener("click", startTimer));

// Add event listener to custom form submission
document.customForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const mins = this.minutes.value * 60; // Get minutes input value and convert minutes to seconds
  timer(mins); //Start countdown
  this.reset(); // Reset the form after submission
});
