// GET ELEMENTS FROM THE DOM
const bookTripButton = document.querySelector('.hero-button');
const destinationsButton = document.querySelector('.destinations-button');
const bookingButton = document.querySelector('.booking-button');
const loginButton = document.querySelector('.login-button');

// FUNCTION
const redirect = (path) => {
  window.location.href = path;
}

// ADD EVENT LISTENERS
bookTripButton.addEventListener('click', () => {
  redirect('../pages/booking.html');
});

destinationsButton.addEventListener('click', () => {
  redirect('../pages/destinations.html');
});

bookingButton.addEventListener('click', () => {
  redirect('../pages/booking.html');
});

loginButton.addEventListener('click', () => {
  redirect('../pages/login.html');
});
