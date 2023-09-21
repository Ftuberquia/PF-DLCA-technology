function validate(input) {
  let errors = {};

  if (!input.first_name) {
    errors.first_name = "First name is required";
  } else if (!/^[a-z A-Z]+$/.test(input.first_name)) {
    errors.first_name = "First name must be letters only";
  } else if (input.first_name.length > 15) {
    errors.first_name = "First name must be less than 15 characters";
  }
  if (!input.last_name) {
    errors.lastName = "Last Name is required";
  } else if (!/^[a-z A-Z]+$/.test(input.last_name)) {
    errors.last_name = "Last Name must be letters only";
  }
  if (!input.direction) {
    errors.direction = "License is required";
  } else if (input.direction.length < 5 || input.direction.length > 20) {
    errors.direction = "License invalid";
  }
  if (input.phone > 1 && !/^[0-9\+]{1,}[0-9\-]{3,15}$/.test(input.phone)) {
    errors.phone = "Phone incorrect";
  }

  return errors;
}

export default validate;