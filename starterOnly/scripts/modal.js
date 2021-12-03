function editNav() {
	let x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeBtn = document.querySelector('.close');
const formTextInputs = document.querySelectorAll('input[type=text]');
const submitButton = document.querySelector('input[type=submit]');
const emailInput = document.querySelector('input[type=email');

// Submit button is disabled until all fields are validated byt validate() function
submitButton.disabled = true;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal event
closeBtn.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
	formTextInputs.forEach((input) =>
		input.addEventListener('change', function () {
			isValidInputText(input);
		})
	);
	emailInput.addEventListener('change', function () {
		isValidEmail(emailInput);
	});
}

// close modal form
function closeModal() {
	modalbg.style.display = 'none';
}

function isValidEmail(input) {
	const emailErrorSpan = document.querySelector('.email');
	const regexValidator =
		/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if (!regexValidator.test(input.value)) {
		emailErrorSpan.innerHtml = "L'email dois être valide";
		console.log(emailErrorSpan);
		return false;
	} else {
		emailErrorSpan.innerHtml = '';
		return true;
	}
}

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

function checkTextInputs() {}

/**
 * Validate form's inputs. If input is incorrect based on given requirements, a red message is shown.
 * Else it trigger an alert to advise user of successfull process of form.
 */
function validate() {
	formTextInputs.forEach((e) => {
		let value = e.value;
		if (value.length < 2) {
			console.log(value.length);
			return false;
		}
		console.log(e.value);
	});
}
