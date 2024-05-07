const validateSignupForm = (emailInput, passwordInput, emailLabel, passwordLabel) => {
	let valid = false;

	// remove existing required spans
    const existingRequiredSpans = document.querySelectorAll('.required-span');
    existingRequiredSpans.forEach(span => {
        span.remove();
    });

	// check if input fields are empty
	if(!emailInput.value || !passwordInput.value) {
		// iterate through the inputs to find the ones that dont satisfy the conditions
		const inputs = [emailInput, passwordInput];
		const labels = [emailLabel, passwordLabel];

		inputs.forEach(input => {
			if(!input.value) {
				let inputName = input.name;
				labels.forEach(label => {
					const labelFor = label.getAttribute('for');
					if(inputName === labelFor) {
						const requiredSpan = document.createElement('span');
						requiredSpan.classList.add('required-span'); // add a class to identify required spans
						requiredSpan.textContent = ' Required!';
						requiredSpan.style.color = 'red';
						label.append(requiredSpan); // append the span next to the label

					};
				});
			};
		});
	} else {
		// check if there are no error messages
		const errorMessageSpans = document.querySelectorAll('.required-span');
		if (errorMessageSpans.length === 0) {
			valid = true;
		}
	}

}