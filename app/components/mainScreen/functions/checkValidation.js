// Validation:
// -- A boolean validation rule means validation will always resolve to that value.
// -- An array means that a limited set of (case-insensitive) options are valid.
// -- A string means that the value should be used as a regex to validate the response.

const checkValidation = (currentQuestion, userInput) => {
  const { validation } = currentQuestion;

  const currentValidationRules = validation;

  const validationIsBoolean =
    currentValidationRules === true || currentValidationRules === false;
  const validationIsArray = Array.isArray(currentValidationRules);
  const validationIsString = typeof currentValidationRules === 'string';

  if (validationIsBoolean) {
    if (currentValidationRules === true) {
      // continue - user can input anything.
      return true;
    }
    //if false, we are at the end of the questions.
    return 'end';
  }
  if (validationIsArray) {
    //make string lowercase and compare to array of correct values
    const input = userInput.toLowerCase();
    const checkForValue = currentValidationRules.includes(input);

    // if checkForValue is true, we can go to the next path.
    // if checkForValue is false, there is an error
    if (checkForValue) {
      return true;
    }
    return 'error';
  }
  if (validationIsString) {
    // use regex from validation.
    const regex = new RegExp(currentValidationRules);
    const check = regex.test(String(userInput).toLowerCase());

    // if value is true, we can go to the next path.
    // if value is false, there is an error
    if (check) {
      return true;
    }
    return 'error';
  }
};

export { checkValidation };
