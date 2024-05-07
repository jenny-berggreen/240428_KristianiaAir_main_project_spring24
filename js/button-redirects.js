// GET ELEMENTS FROM THE DOM
const bookTripButton = document.querySelector('.hero-button');
const destinationsButton = document.querySelector('.destinations-button');
const bookingButton = document.querySelector('.booking-button');
const myPageButton = document.querySelector('.my-page-button');

// FUNCTION
const redirect = (path) => {
  window.location.href = path;
}

// ADD EVENT LISTENERS
bookTripButton.addEventListener('click', () => {
  redirect('/pages/booking.html');
});

destinationsButton.addEventListener('click', () => {
  redirect('/pages/destinations.html');
});

bookingButton.addEventListener('click', () => {
  redirect('/pages/booking.html');
});

myPageButton.addEventListener('click', () => {
  redirect('/pages/my-page.html');
});
