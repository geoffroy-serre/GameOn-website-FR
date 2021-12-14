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
const locationInputs = document.querySelectorAll('input[name=location]');
const tcuInput = document.querySelector('input[name = tcu]');
const newsLetterInput = document.querySelector('input[name=newsletter');
const alertBoxModal = document.querySelector('.alertbox__background');
const alertBoxMessage = document.querySelector('.alertbox__message');

const closeAlert = document.querySelector('.alertbox__close');

initEventListeners();

/**
 * Create all needed event listeners
 */
function initEventListeners() {
	firstNameInput.addEventListener('change', () =>
		isValidInputText(firstNameInput)
	);
	lastNameInput.addEventListener('change', () =>
		isValidInputText(lastNameInput)
	);
	emailInput.addEventListener('change', () => isValidEmail(emailInput));
	dateInput.addEventListener('keyUp', () => isValidDate(dateInput));
	quantityInput.addEventListener('change', () =>
		isValidQuantity(quantityInput)
	);
	locationInputs.forEach((e) => {
		e.addEventListener('change', () => isOneLocationChecked());
	});

	tcuInput.addEventListener('change', () => isTcuChecked(tcuInput));
	submitButton.addEventListener('click', (event) => validate(event));
}

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
	closeAlert.addEventListener('click', closeAlertbox);
}

/**
 * Close modal by changin animation name of .content.
 * Set display none to modalbg 10ms before end of animation.
 * The animation duration is retrieved dynamically from css variable.
 * Converted from second to milliseconds.
 */
function closeModal() {
	content.style.animationName = 'modalclose';
	setTimeout(
		() => (modalbg.style.display = 'none'),
		parseFloat(animationModalDuration) * 1000 - 10
	);
}

/**
 * Close alertbox modal by setting dysplay to none.
 * Reset the content of alert on close.
 */
function closeAlertbox() {
	alertBoxModal.style.display = 'none';
	alertBoxMessage.textContent = '';
}

function alertBox(message) {
	alertBoxModal.style.display = 'block';

	alertBoxMessage.textContent = message;
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
		emailErrorSpan.textContent = "L'email dois être valide";
		return false;
	} else {
		emailErrorSpan.textContent = '';
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
		inputErrorSpan.textContent = `Veuillez entrer 2 caractères ou plus pour le champ du ${inputName}`;
		return false;
	} else {
		inputErrorSpan.textContent = '';
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
			dateErrorSpan.textContent = 'Vérifiez votre date de naissance';
			return false;
		} else {
			dateErrorSpan.textContent = '';
			return true;
		}
	} catch (e) {
		dateErrorSpan.textContent = 'Vérifiez votre date de naissance';
		return false;
	}
}

/**
 * Check if quantity field is filled.
 * @param String input field
 * @returns boolean
 */
function isValidQuantity(input) {
	const quantityErrorSpan = document.querySelector(`.${input.name}`);

	if (input.value == '') {
		quantityErrorSpan.textContent = 'Vérifier le nombre de vos participations';
		console.log(input.value);
		return false;
	}
	quantityErrorSpan.textContent = '';
	return true;
}

// /**
//  * Check if one radio button is checked.
//  * Iterate along all radio button with name location.
//  * @returns boolean
//  */
function isOneLocationChecked() {
	let spanError = document.querySelector('.location');

	if (Array.from(locationInputs).some((i) => i.checked)) {
		spanError.textContent = '';
		return true;
	} else {
		spanError.textContent = 'Vous devez choisir une ville';
		return false;
	}
}

/**
 * Check if TCUs are checked.
 * @param String input field
 * @returns boolean
 */
function isTcuChecked(input) {
	const spanError = document.querySelector('.tcu');
	if (input.checked) {
		spanError.textContent = '';
		return true;
	} else {
		spanError.textContent = "Vous devez accepter les conditions d'utilisation";
		return false;
	}
}

function validate(event) {
	event.preventDefault();
	if (
		isValidInputText(firstNameInput) &&
		isValidInputText(lastNameInput) &&
		isValidEmail(emailInput) &&
		isValidDate(dateInput) &&
		isValidQuantity(quantityInput) &&
		Array.from(locationInputs).some((i) => i.checked) &&
		isTcuChecked(tcuInput)
	) {
		alertBox(
			`Bienvenue ${firstNameInput.value} ${
				lastNameInput.value
			} votre inscription est prise en compte.${
				newsLetterInput.checked
					? ` Vous recevrez la newsletter sur ${emailInput.value}`
					: ' Vous avez choisi de ne pas recevoir la newsletter'
			}`
		);
		document.querySelector('form').reset();
		closeModal();
	} else {
		alertBox("Remplissez correctement les champs s'il vous plait.");
	}
}
