# This is a doc for database validation 

# schemas
    >> doctor (+) [contact no, email, birth date format, password]
    >> patient (+) [contact no, email, birth date format, password]
    >> medicalInfo
    >> appointment (+) [ appointment date, appointment slot, availability]
    >> prescription
    >> disease
    >> symptoms
    >> medicineShop
    >> diagnosticCenter

THINGS TO CONSIDER WHILE VALIDATING:
    1) Data Type Check
    2) Code Check
    3) Range Check
    4) Format Check
    5) Consistency Check
    6) Uniqueness Check
    7) Presence Check
    8) Length Check
    9) Look Up

## express library to validate
https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/
https://stackabuse.com/form-data-validation-in-nodejs-with-express-validator/
https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

https://express-validator.github.io/docs/


### Contact number
    minlength: 11
    and Used isContact() function to validate   

### email
    validating email using .isEmail() function inside routes.


### date formatting
    body("birthDate").isDate({ format: "YYYY-MM-DD" }),

### password
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
 
