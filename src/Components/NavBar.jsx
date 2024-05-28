import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../Contexts/AuthContext";

function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/");
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/Logo.png" className={styles.logo_img} alt="Logo" />
      </div>
      <div className={styles.options}>
        <nav>
          <ul>
            <li>
              <Link to="/AllHotels">Hotels</Link>
            </li>
            <li>
              <Link to="/AllRestaurants">Restaurants</Link>
            </li>
            <li>
              <Link to="/AllPlaces">Places</Link>
            </li>
            <li>
              <Link to="/NewPost">Add A Place</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/ThingsToDo">Things To Do</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className={styles.right_content}>
        {isAuthenticated ? (
          <>
            <div className={styles.user_img}>
              <Link to="/UserProfile">
                <img src={user ? user.imageURL : "/avatar.png"} alt="Profile" />
              </Link>
            </div>
            <div className={styles.login}>
              <button className={styles.login_btn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to={"/SignUp"}>
              <button className={`${styles.login_btn} ${styles.signIn}`}>
                Sign Up
              </button>
            </Link>
            <Link to={"/Login"}>
              <button className={`${styles.login_btn} ${styles.signIn}`}>
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
