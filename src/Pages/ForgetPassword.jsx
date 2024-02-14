import { useEffect, useState } from "react";
import styles from "./ForgetPassword.module.css";
import Validate from "../Validation/Validate";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  function handleForget(e) {
    setErrors({});
    setErrorMessage("");
    e.preventDefault();
    setErrors(Validate({ email }));
    setFormSubmitted(true);
  }

  useEffect(() => {
    document.title = "Forget password";
    if (formSubmitted && Object.keys(errors).length === 0) {
      const fetchData = async () => {
        const url = "http://localhost:8081/auth/forgetPassword";
        const data = {
          email,
        };

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // You may need to include additional headers like authorization if required
            },
            body: JSON.stringify(data),
          });

          const responseData = await res.json();

          console.log(responseData);
          if (responseData.message.includes("not")) {
            // console.log(responseData);
            setErrorMessage(responseData.message);
          } else {
            // console.log(responseData);
            setUpdateMessage(responseData.message);
          }
        } catch (error) {
          console.error("Error in API call:", error);
        }
      };

      fetchData();
    }
  }, [errors, formSubmitted]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src="/Logo.png" alt="Trip wise logo" />
        <h1>Forgot Password</h1>

        {updateMessage ? (
          <>
            <h3>{updateMessage} 📩</h3>
            <h3>Login again with updated password 🔑</h3>
            <Link to="/Login" className={styles.login_btn}>
              Log in
            </Link>
          </>
        ) : (
          <>
            <h3>
              No problem. Just enter your email address below — we’ll send you a
              link to reset it.
            </h3>
            <form className={styles.form} onSubmit={handleForget}>
              <label>Email Address: </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
              {errorMessage && (
                <p className={styles.errorText}>*{errorMessage}</p>
              )}
              <button>Send link</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
