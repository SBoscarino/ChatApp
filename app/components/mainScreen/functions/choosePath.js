// Paths:
// -- When 'paths' value is missing, it represents an end state.
// -- When the value is a number, that number is the ID of the question the app should proceed to once a valid input has been given.
// -- When the value is an object, the keys are valid responses and the values are the next question IDs.

const choosePath = (currentQuestion, validationResult, userInput) => {
  const { paths } = currentQuestion;

  if (validationResult === 'error') {
    // the user has done something we do not expect
    return 'error';
  }
  if (!paths) {
    return 'end';
  }
  if (Number.isInteger(paths)) {
    // the path is a single number and not an array
    // if (paths === 10) {
    //   //end state - return 'end'
    //   return 'end';
    // }

    return paths;
  }
  if (typeof paths === 'object' && paths !== null) {
    // handle array of paths
    const userSaidYes = userInput.toLowerCase() === 'yes' && validationResult;
    if (userSaidYes) {
      return paths.yes;
    } else {
      return paths.no;
    }
  }
};

export { choosePath };
