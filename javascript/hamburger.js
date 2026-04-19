const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

// Grab the main navbar container
const navbar = document.querySelector('.custom-navbar');
hamburgerBtn.addEventListener('click', () => {
  // Toggle the links container
  navMenu.classList.toggle('active');
  
  // Toggle the shape and padding of the main navbar
  navbar.classList.toggle('menu-open'); 
});