import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import Validate from "../Validation/Validate";

function Login() {
  const { isAuthenticated, dispatch } = useAuth();
  const [email, setEmail] = useState("shaid@gmail.com");
  const [password, setPassword] = useState("Malik10&");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setErrors({});
    setErrorMessage("");
    e.preventDefault();
    setErrors(Validate({ email, password }));
    setFormSubmitted(true);
  }
  const fetchData = async () => {
    const url = "http://localhost:8080/auth/login";
    const data = {
      email,
      password,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      console.log(responseData);

      if (!responseData.token) {
        setErrorMessage(responseData.message);
      }
      if (responseData.token) {
        console.log(responseData.token);
        dispatch({ type: "updateToken", payload: responseData.token });
      }
    } catch (error) {
      setErrorMessage(`Error in getting data from server`);
    }
  };
  useEffect(() => {
    // Check if errors are empty before making the API call
    if (formSubmitted && Object.keys(errors).length === 0) {
      fetchData();
    }

    document.title = "Log in";
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, errors, formSubmitted]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src="/Logo.png" alt="TripWise Logo" />
        <h1 className={styles.wlcm}>Welcome back!! 😃</h1>
        <form className={styles.form}>
          <label>Email Address: </label>
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter passsword"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
          {errorMessage && <p className={styles.errorText}>*{errorMessage}</p>}

          <button onClick={handleSubmit}>Log in</button>
        </form>
        <Link className={styles.forget} to="/ForgetPassword">
          Forget password?
        </Link>

        <div className={styles.section}>
          <p>Create an account: </p>
          <span>
            {" "}
            <NavLink className={styles.link} to="/SignUp">
              Sign up here!
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
