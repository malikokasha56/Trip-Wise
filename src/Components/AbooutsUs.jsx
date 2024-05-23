import { Link } from "react-router-dom";
import styles from "./AbooutsUs.module.css";

function AbooutsUs() {
  return (
    <div className={styles.aboutus}>
      <div className={styles.col1}>
        <img src="/Logo.png" alt="Logo" />
        <p>
          Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          incididunt ut labore et dolore
        </p>
      </div>
      <div className={styles.col2}>
        <h1>Contact Information</h1>
        <p>📍 Lahore</p>
        <p>📱 +92-315-6678234</p>
        <p>📧 info@tripwise.com</p>
      </div>
      <div className={styles.col3}>
        <h1>Quick Links</h1>
        <ul>
          <li>
            <Link>📝 Write A Review</Link>
          </li>
          <li>
            <Link to="/NewPost">➕ Add A Place</Link>
          </li>
          <li>
            <Link>🏨 Hotels</Link>
          </li>
          <li>
            <Link>✔ Things to Do</Link>
          </li>
        </ul>
      </div>
      <div className={styles.col4}>
        <h1>Links</h1>
        <ul>
          <li>
            <Link>Terms of Use</Link>
          </li>
          <li>
            <Link>Policy</Link>
          </li>
          <li>
            <Link>Cookies</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AbooutsUs;
