import { useEffect } from "react";
import styles from "./ChangePassword.module.css";

function ChangePassword() {
  useEffect(() => {
    document.title = "Change password";
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src="/Logo.png" alt="Trip wise logo" />
        <h1>Change Password 🔐</h1>
        <form className={styles.form}>
          <label>New Password: </label>
          <input type="password" placeholder="Enter new password" required />
          <label>Re enter new Password: </label>
          <input type="password" placeholder="Re-enter new password" required />
          <button>Change password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
