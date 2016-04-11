// Would go with http://jqueryvalidation.org/
// But rolling own...

$(document).ready(function () {
    $('#datepicker').datepicker({
        showOn: "button",
        buttonImage: "/content/images/icon-calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: "dd/mm/yy"

        //showWeek: true,
        //dateFormat: "yy-mm-dd",
        //buttonImage: "ui-icon-calendar",
        //regional: "sv",
        //minDate: "-10Y",
        //maxDate: "+10Y",
        //showButtonPanel: true,
        //buttonImageOnly: false,
        //showWeekNumber: true,
        //firstDay: 1,
        //showOtherMonths: true,
        //selectOtherMonths: true,
        //changeMonth: true,
        //changeYear: true,
        //showOn: "both"

    });

    $('#contact-form').submit(function (event) {
        var returnVal = true;   // Assume form is valid

        // CSS classes
        const validClass = "valid";
        const invalidClass = "invalid";

        var $title = $('#title');
        var $firstname = $('#firstname');
        var $lastname = $('#lastname');
        var $emailaddress = $('#emailaddress');
        var $phonenumber = $('#phonenumber');

        var $dobday = $('#dateofbirth-day');
        var $dobmonth = $('#dateofbirth-month');
        var $dobyear = $('#dateofbirth-year');

        var $datepicker = $('#datepicker');

        var $password = $('#password');
        var $passwordconfirm = $('#password-confirm');
        var $passworderror = $('#password-error');
        var passwordsValid = false;

        var $gendermale = $('#gender-male');
        var $genderfemale = $('#gender-female');
        var $gendererror = $('#gender-error');

        var $termsconditions = $('#terms-conditions');
        var $termserror = $('#terms-error');

        var $formError = $('#form-error');
        var $formSuccess = $('#form-success');

        // Title
        if (!$title.val()) {
            setStyle($title, invalidClass);
            returnVal = false;
            console.log("title invalid");
        }
        else {
            console.log("title valid");
            setStyle($title, validClass);
        }

        // First name
        if (!$firstname.val().trim()) {
            setStyle($firstname, invalidClass);
            returnVal = false;
        }
        else {
            setStyle($firstname, validClass);
        }

        // Email address
        if (!validEmail($emailaddress.val())) {
            setStyle($emailaddress, invalidClass);
            returnVal = false;
        }
        else {
            setStyle($emailaddress, validClass);
        }

        // Phone number
        if (!$.isNumeric($phonenumber.val()) || $phonenumber.val().length < 6) {
            setStyle($phonenumber, invalidClass);
            returnVal = false;
            console.log("phone number invalid");
        }
        else {
            setStyle($phonenumber, validClass);
        }

        // Date of birth
        // Assume incorrect
        setStyle($dobday, invalidClass);
        setStyle($dobmonth, invalidClass);
        setStyle($dobyear, invalidClass);

        if ($.isNumeric($dobday.val()) && $.isNumeric($dobmonth.val()) && $.isNumeric($dobyear.val())) {
            if (!validDate($dobday.val(), $dobmonth.val(), $dobyear.val())) {
                // Moved incorrect setStyle above
                returnVal = false;
                console.log("dob invalid - invalid date");
            }
            else {
                setStyle($dobday, validClass);
                setStyle($dobmonth, validClass);
                setStyle($dobyear, validClass);
            }
        }
        else {
            // Moved incorrect setStyle above
            returnVal = false;
            console.log("dob invalid - not numeric");
        }

        console.log("DATEPICKER = " + $datepicker.val());
        setStyle($datepicker, invalidClass);

        // Date of birth 2
        if (!$datepicker.val().trim()) {
            returnVal = false;
            setStyle($datepicker, invalidClass);
        }
        else {
            setStyle($datepicker, validClass);
        }

        // TODO: Check format of datepicker input with regex & save out day/month/year variables to pass to date validator function
        // regex: (\d{2,4}) created at https://regex101.com/
        // match two digits followed by a literal (\/) forward slash [0]
        // match two digits followed by a literal (\/) forward slash [1]
        // match four digits [2]
        var arrDateValues = $datepicker.val().match(/(\d{2,4})/g);

        console.log("ARRAY = " + arrDateValues);

        // check to see if a date has been chosen
        if (arrDateValues !== null) {
            var theDay = arrDateValues[0];
            var theMonth = arrDateValues[1];
            var theYear = arrDateValues[2];

            console.log("THEDAY = " + theDay);

            // make sure date is valid
            if (!validDate(theDay, theMonth, theYear)) {
                returnVal = false;
                setStyle($datepicker, invalidClass);
            }
            else {
                setStyle($datepicker, validClass);
            }
        }
        else {
            returnVal = false;
            setStyle($datepicker, invalidClass);
        }


        // TODO: Split datepicker string to pass to date validator function (using substring)

        // Password
        if ($password.val().length < 8) {
            setStyle($password, invalidClass);
            returnVal = false;
            console.log("invalid password string");
        }
        else {
            setStyle($password, validClass);
        }

        // Password confirm
        if ($passwordconfirm.val().length < 8) {
            setStyle($passwordconfirm, invalidClass);
            returnVal = false;
            console.log("invalid confirmation password string");
        }
        else {
            setStyle($passwordconfirm, validClass);
        }

        // Passwords match
        if ($password.val() !== $passwordconfirm.val()) {
            $('#password-error').css("display", "block");
            $('#password-error').text("Passwords do not match.");
        }
        else {
            $('#password-error').css("display", "none");
        }

        // Gender
        if (!$gendermale.prop("checked") && !$genderfemale.prop("checked")) {
            $('#gender-error').css("display", "inline-block");

            returnVal = false;
            console.log("Gender invalid");
        }
        else {
            $('#gender-error').css("display", "none");
        }

        // Terms & Conditions
        if ($termsconditions.prop("checked") == false) {
            $('#terms-error').css("display", "block");
            returnVal = false;
            console.log("Terms and Conditions invalid");
        }
        else {
            $('#terms-error').css("display", "none");
        }

        // Main logic
        if (returnVal === false) {
            event.preventDefault();
            $('#form-success').css("display", "none");
            $('#form-error').css("display", "block");
        }
        else {
            event.preventDefault(); // stop form from submitting
            $('#form-error').css("display", "none");
            $('#form-success').css("display", "block");
        }

        console.log(returnVal);
    });

    function validEmail(stringvalue) {
        stringvalue.trim();

        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // regex stolen from: http://www.codeproject.com/Tips/492632/Email-Validation-in-JavaScript
        // console.log("regex = " + re.test(stringvalue));

        if (re.test(stringvalue))
            return true;
        else
            return false;
    }

    function validDate(theDay, theMonth, theYear) {
        theMonth--; // subtract one from the supplied month for comparison as the computed month is zero basedc

        var checkDate = new Date(theYear, theMonth, theDay);
        var currentDate = new Date();

        var dateObjYear = checkDate.getFullYear();
        var dateObjMonth = checkDate.getMonth();
        var dateObjDay = checkDate.getDate();

        // Check that dates match
        console.log("DATEOBJMONTH = " + dateObjMonth);
        console.log("THEMONTH = " + theMonth);

        if ((dateObjYear != theYear) || (dateObjMonth != theMonth) || (dateObjDay != theDay)) {    // -1 on month for comparison as it's zero based
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

    function setStyle($element, state) {
        switch (state) {
            case "invalid":
                $element.removeClass("invalid valid").addClass("invalid");
                console.log("invalid");
                break;
            case "valid":
                $element.removeClass("valid invalid").addClass("valid");
                console.log("valid");
                break;
            default:
                break;
        }
    }

});

