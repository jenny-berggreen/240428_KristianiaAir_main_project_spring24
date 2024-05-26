// SELECT ELEMENTS FROM THE DOM
const nav = document.querySelector('nav');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const openedHamburgerMenu = document.querySelector('.opened-hamburger-menu');
const closeMenuIcon = document.querySelector('.close-icon');

// FUNCTIONS
const displayOpenedHamburgerMenu = () => {
	openedHamburgerMenu.classList.add('opened-hamburger-menu--visible');
	nav.classList.add('nav--hidden');
}

const closeOpenedHamburgerMenu = () => {
	openedHamburgerMenu.classList.remove('opened-hamburger-menu--visible');
	nav.classList.remove('nav--hidden');
}

// EVENT LISTENERS
hamburgerIcon.addEventListener('click', displayOpenedHamburgerMenu);
closeMenuIcon.addEventListener('click', closeOpenedHamburgerMenu);