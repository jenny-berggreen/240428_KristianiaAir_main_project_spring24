// FUNCTION TO REMOVE ERROR MESSAGE FOR A SPECIFIC INPUT FIELD
function removeErrorMessage(input) {
    const inputName = input.name;
    const label = document.querySelector(`label[for="${inputName}"]`);
    const existingRequiredSpan = label.querySelector('.required-span');
    if (existingRequiredSpan) {
        existingRequiredSpan.remove();
    }
}

// FUNCTION TO UPDATE AND DISPLAY TOTAL VALUE
function updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails) {
    let total = 0;

    // country
    if (countryDetails.textContent !== '') {
        total += 500;
    }

    // city
    if (cityDetails.textContent !== '') {
        total += 100;
    }

    // departure / return
    const departureDate = new Date(departureDetails.textContent);
    const returnDate = new Date(returnDetails.textContent);

    // Check if departureDate and returnDate are valid dates
    if (!isNaN(departureDate.getTime()) && !isNaN(returnDate.getTime())) {
        const travelTime = Math.ceil((returnDate - departureDate) / (1000 * 3600 * 24)); // Calculate travel time in days and round it up
        total += travelTime * 100;
    }

    // travelers  
    const numTravelers = parseInt(travelersInput.value);
    total *= numTravelers;

    // Update total details
    totalDetails.textContent = isNaN(total) ? 'Invalid dates' : `kr ${total}`;
};


export { removeErrorMessage, updateTotal }

