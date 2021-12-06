// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeBtn = document.querySelector('.close');
const firstNameInput = document.querySelector('input[name=first]');
const lastNameInput = document.querySelector('input[name=last]');
const submitButton = document.querySelector('input[type=submit]');
const emailInput = document.querySelector('input[type=email');
const dateInput = document.querySelector('input[type=date]');
const quantityInput = document.querySelector('input[name=quantity]');
const content = document.querySelector('.content');
const animationModalDuration = window
	.getComputedStyle(document.body)
	.getPropertyValue('--modal-duration');

function editNav() {
	let x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

/**
 * Open modal, and add event listeners on inputs, and on close button.
 */
function launchModal() {
	modalbg.style.display = 'block';
	content.style.animationName = 'modalopen';
	closeBtn.addEventListener('click', closeModal);
	firstNameInput.addEventListener('change', function () {
		isValidInputText(firstNameInput);
	});
	lastNameInput.addEventListener('change', function () {
		isValidInputText(lastNameInput);
	});
	emailInput.addEventListener('change', function () {
		isValidEmail(emailInput);
	});
	dateInput.addEventListener('change', function () {
		isValidDate(dateInput);
	});
	quantityInput.addEventListener('change', function () {
		isValidQuantity(quantityInput);
	});
	submitButton.addEventListener('click', function (event) {
		validate(event);
	});
}

/**
 * Close modal by changin animation name of .content.
 * Set display none to modalbg 10ms before end of animation.
 * The animation duration is retrieved dynamically from css variable.
 * Converted from second to milliseconds.
 */
function closeModal() {
	content.style.animationName = 'modalclose';
	setTimeout(function () {
		modalbg.style.display = 'none';
	}, parseFloat(animationModalDuration) * 1000 - 10);
}

/**
 * Check if email is valid using regex RFC 5322 official standard.
 * @param  input Input field
 * @returns boolean.
 */
function isValidEmail(input) {
	const emailErrorSpan = document.querySelector(`.${input.name}`);
	const regexValidator =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	if (!regexValidator.test(input.value)) {
		emailErrorSpan.innerHTML = "L'email dois être valide";
		return false;
	} else {
		emailErrorSpan.innerHTML = '';
		return true;
	}
}

/**
 * Check if all texts inputs values are at least 2 characters long
 * @param String Input field
 * @returns boolean
 */
function isValidInputText(input) {
	const inputErrorSpan = document.querySelector(`.${input.name}`);
	let inputName = '';
	if (input.value.length < 2) {
		input.name === 'first' ? (inputName = 'Prénom') : (inputName = 'Nom');
		inputErrorSpan.innerHTML = `Veuillez entrer 2 caractères ou plus pour le champ du ${inputName}`;
		return false;
	} else {
		inputErrorSpan.innerHTML = '';
		return true;
	}
}

/**
 * Check if date is valid.
 * Date is valid if it's not a future date, and if the day of month is correct.
 * For example April 31st return false, and February 29th in 2021 return also false (max of 28 days in 2021 for February).
 * @param String input field
 * @returns boolean
 */
function isValidDate(input) {
	const dateErrorSpan = document.querySelector(`.${input.name}`);

	try {
		let dateInput = new Date(input.value);
		let todayDate = new Date();
		if (
			dateInput.getTime() > todayDate.getTime() ||
			input.value !== dateInput.toISOString().split('T')[0]
		) {
			dateErrorSpan.innerHTML = 'Vérifiez votre date de naissance';
			return false;
		} else {
			dateErrorSpan.innerHTML = '';
			return true;
		}
	} catch (e) {
		console.error(e);
		dateErrorSpan.innerHTML = 'Vérifiez votre date de naissance';
		return false;
	}
}

function isValidQuantity(input) {
	const quantityErrorSpan = document.querySelector(`.${input.name}`);
	if (input.value === '') {
		quantityErrorSpan.innerHTML = 'Vérifier le nombre de vos participations';
		console.log(input.value);
		return false;
	}
	quantityErrorSpan.innerHTML = '';
	return true;
}

function isTcuChecked() {}
function isOneLocationChecked() {}

function validate(event) {
	event.preventDefault();
	if (
		isValidInputText(firstNameInput) &&
		isValidInputText(lastNameInput) &&
		isValidEmail(emailInput) &&
		isValidDate(dateInput) &&
		isValidQuantity(quantityInput)
	) {
		alert(`Bienvenue votre inscription est prise en compte`);
		closeModal();
	} else {
		alert("Remplissez correctement les champs si'l vous plait.");
	}
}
