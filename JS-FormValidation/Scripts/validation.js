function validateForm() {
    var returnVal = true;   // Assume form is valid

    // CSS classes
    const validClass = "valid";
    const invalidClass = "invalid";

    // Get form element values
    var title = document.getElementById("title");
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var emailaddress = document.getElementById("emailaddress");

    var dobday = document.getElementById("dateofbirth-day");
    var dobmonth = document.getElementById("dateofbirth-month");
    var dobyear = document.getElementById("dateofbirth-year");

    var password = document.getElementById("password");
    var passwordconfirm = document.getElementById("password-confirm");
    var passworderror = document.getElementById("password-error");
    var passwordsValid = false;

    var gendermale = document.getElementById("gender-male");
    var genderfemale = document.getElementById("gender-female");
    var gendererror = document.getElementById("gender-error");

    var termsconditions = document.getElementById("terms-conditions");
    var termserror = document.getElementById("terms-error");

    var formError = document.getElementById("form-error");
    var formSuccess = document.getElementById("form-success");

    // Reset status
    formError.style.display = "none";
    formSuccess.style.display = "none";

    console.clear();

    // check title
    if (!validString(title.options[title.selectedIndex].value)) {
        setStyle(title, invalidClass);
        returnVal = false;
        console.log("title invalid");
    }
    else {
        setStyle(title, validClass);
    }

    // check first name
    if (!validString(firstname.value)) {
        setStyle(firstname, invalidClass);
        returnVal = false;
        console.log("firstname invalid");
    }
    else {
        setStyle(firstname, validClass);
    }

    // check email address
    if ((!validString(emailaddress.value)) || (!validEmail(emailaddress.value))) {
        setStyle(emailaddress, invalidClass);
        returnVal = false;
        console.log("email invalid");
    }
    else {
        setStyle(emailaddress, validClass);
    }

    // check phone number
    if ((!isNumeric(phonenumber.value)) || (phonenumber.value.length < 6)) {
        setStyle(phonenumber, invalidClass);
        returnVal = false;
        console.log("phone number invalid");
    }
    else {
        setStyle(phonenumber, validClass);
    }

    // check date of birth
    if ((isNumeric(dobday.value)) && (isNumeric(dobmonth.value)) && (isNumeric(dobyear.value))) {
        if(!validDate(dobday.value, dobmonth.value, dobyear.value)) {
            setStyle(dobday, invalidClass);
            setStyle(dobmonth, invalidClass);
            setStyle(dobyear, invalidClass);
            returnVal = false;
            console.log("dob invalid");
        }
        else {
            setStyle(dobday, validClass);
            setStyle(dobmonth, validClass);
            setStyle(dobyear, validClass);
        }
    }
    else {
        setStyle(dobday, invalidClass);
        setStyle(dobmonth, invalidClass);
        setStyle(dobyear, invalidClass);
        returnVal = false;
        console.log("dob invalid");
    }

    passworderror.innerHTML = "";

    // check password
    if (!validString(password.value)) {
        setStyle(password, invalidClass);
        passworderror.style.display = "block";
        passworderror.innerHTML = "Password cannot be blank.";
    }
    else if (password.value.length < 8) {
        // check length is at least 8 characters
        setStyle(password, invalidClass);
        passworderror.style.display = "block";
        passworderror.innerHTML = "Password must be at least 8 characters.";
    }
    else {
        setStyle(password, validClass);
        passworderror.style.display = "none";
    }

    // check password confirm
    if (!validString(passwordconfirm.value)) {
        setStyle(passwordconfirm, invalidClass);
        passworderror.style.display = "block";

        // check to see if there is already an error message for password
        if (passworderror.innerHTML != "") {
            passworderror.innerHTML += "<br/>Password confirmation cannot be blank.";
        }
        else {
            passworderror.innerHTML = "";  // REVIEW: Is this line needed?!
            passworderror.innerHTML = "Password confirmation cannot be blank.";
        }
    }
    else if (passwordconfirm.value.length < 8) {
        // check length is at least 8 characters
        setStyle(passwordconfirm, invalidClass);
        passworderror.style.display = "block";

        // check to see if there is already an error message for password
        if (passworderror.innerHTML != "") {
            passworderror.innerHTML += "<br/>Password confirmation must be at least 8 characters.";
        }
        else {
            passworderror.innerHTML = "";  // REVIEW: Is this line needed?!
            passworderror.innerHTML = "Password confirmation must be at least 8 characters.";
        }
    }
    else {
        setStyle(passwordconfirm, validClass);
        passworderror.style.display = "none";
        passwordsValid = true;
    }

    // check passwords match
    if (passwordsValid == true) { // Both have valid text
        if (password.value != passwordconfirm.value) {
            setStyle(password, invalidClass);
            setStyle(passwordconfirm, invalidClass);
            passworderror.style.display = "block";
            passworderror.innerHTML = "Passwords do not match."
        }
    }

    // check gender
    if (gendermale.checked == false && genderfemale.checked == false) {
        gendererror.style.display = "inline-block";
        returnVal = false;
        console.log("gender invalid");
    }
    else {
        gendererror.style.display = "none";
    }

    // check terms & conditions
    if (termsconditions.checked == false) {
        termserror.style.display = "block";
        returnVal = false;
        console.log("terms invalid");
    }
    else {
        termserror.style.display = "none";
    }

    // Update status
    if (!returnVal ? formError.style.display = "block" : formSuccess.style.display = "block");

    console.log("Returned: " + returnVal);

    return false; // Stop form from submitting
}

function setStyle(element, state) {
    switch (state) {
        case "invalid":
            element.classList.remove("valid");
            element.classList.add("invalid");
            break;
        case "valid":
            element.classList.remove("invalid");
            element.classList.add("valid");
            break;
        default:
            break;
    }
}

function validString(stringvalue) {
    // Checks for empty string
    stringvalue.trim();
    if(stringvalue != "")
        return true;
    else
        return false;
}

function validEmail(stringvalue) {
    // Checks for @ symbol in string
    stringvalue.trim();

    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // regex stolen from: http://www.codeproject.com/Tips/492632/Email-Validation-in-JavaScript
    // console.log("regex = " + re.test(stringvalue));

    if (re.test(stringvalue))
        return true;
    else
        return false;
}

// stolen from: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validDate(theDay, theMonth, theYear) {
    var checkDate = new Date(theYear, theMonth, theDay);
    var currentDate = new Date();

    var dateObjYear = checkDate.getFullYear();
    var dateObjMonth = checkDate.getMonth();
    var dateObjDay = checkDate.getDate();

    // DEBUGGING
    //console.log("-------------------------------------------");
    //console.log("theDay = " + theDay);
    //console.log("getfullDay = " + dateObjDay);
    //console.log("theMonth = " + theMonth);
    //console.log("getfullMonth = " + dateObjMonth);
    //console.log("theYear = " + theYear);
    //console.log("getfullYear = " + dateObjYear);
    //console.log("-------------------------------------------");
    //console.log("Days mismatch = " + (dateObjDay != theDay));
    //console.log("Months mismatch = " + (dateObjMonth != theMonth));
    //console.log("Years mismatch = " + (dateObjYear != theYear));
    //console.log("-------------------------------------------");

    // Check that dates match
    if ((dateObjYear != theYear) || (dateObjMonth != theMonth) || (dateObjDay != theDay)) {
        console.log("Date mismatch");
        return false;
    }
    else if (checkDate > currentDate) {
        console.log("Date in future");
        return false;
    }
    else {
        return true;
    }
}
