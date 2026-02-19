const MIN_AGE = 18;
const MAX_AGE = 67;

export function validateBirthdayRange(birthdayInput) {
    // validate function implementation
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate());

    birthdayInput.min = minDate.toISOString().split("T") [0];
    birthdayInput.max = maxDate.toISOString().split("T") [0];
}


export function validateBirthdayMin(birthdayInput, errorMessage) {
    // validate function implementation
    const today = new Date();
    const selectedDate = new Date(birthdayInput.value);
    
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDay();

    const realAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (realAge < MIN_AGE) {
        errorMessage.style.display = "inline";
        birthdayInput.setCustomValidity(`Alter muss sein mindestens ${MIN_AGE} alt`);
        return false;
    } else {
        errorMessage.style.display = "none";
        birthdayInput.setCustomValidity("");
        return true;
    }
}

export function validateBirthdayMax(birthdayInput, errorMessage) {
    // validate function implementation
    const today = new Date();
    const selectedDate = new Date(birthdayInput.value);

    const age = today.getFullYear() - selectedDate.getFullYear();
    if(age > MAX_AGE) {
        errorMessage.style.display = "inline";
        birthdayInput.setCustomValidity(`Alter kann  nicht über §{MAX_AGE} Alt.`)
        return false;
    } else {
        errorMessage.style.display = "none";
        return true;
    }

}

/*function calculateAge(geburtsdatum) {
    const birthDate = new Date(geburtsdatum);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;  
    }
    return age;
}*/