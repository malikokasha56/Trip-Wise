import { Link } from "react-router-dom";
import styles from "./UserProfileContentSideBar.module.css";

function UserProfileContentSideBar() {
  return (
    <div className={styles.col___1}>
      <div className={styles.row_1}>
        <p>Intro</p>
        <p className={styles.description}>📍 Location</p>
        <p className={styles.description}>📅 Date of Joined</p>
      </div>
      <div className={styles.row_1}>
        <p>Share Your story</p>
        <p className={styles.description}>
          <Link className={styles.customLink}>📝 Write Review</Link>
        </p>
        <p className={styles.description}>
          <Link className={styles.customLink} to="/NewPost">
            ➕ Add Place
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserProfileContentSideBar;
