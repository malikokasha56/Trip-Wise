export default function Validate(values) {
  console.log(values);
  const errors = {};
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (values.email === "") {
    errors.email = "*Email is required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "*Please use correct format of email";
  }
  if (values.password === "") {
    errors.password = "*Password is required";
  }
  if (values.rePassword && values.password !== values.rePassword) {
    errors.rePassword = "*Passwords are not same";
  }
  if (values.firstname === "") {
    errors.firstname = "*Name is required";
  }

  return errors;
}
