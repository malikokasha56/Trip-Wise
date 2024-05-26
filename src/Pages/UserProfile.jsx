import { useEffect } from "react";
import styles from "./UserProfile.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserProfileContent from "../Components/UserProfileContent";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useAuth } from "../Contexts/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
function UserProfile() {
  const { updateUser, token, user } = useAuth();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:8081/hotel/getAllHotel";
  useEffect(() => {
    console.log("here");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, token]);

  return (
    <>
      <NavBar />
      <div className={styles.top_img}>
        <img src="/naran.jpg" alt="Cover pic" />
      </div>
      <div className={styles.view}>
        <div className={styles.row1}>
          <img src={user ? user.imageURL : "/avatar.png"} alt="User" />

          <div className={styles.name}>
            <h1>{user ? `${user.firstName + " " + user.lastName}` : "Name"}</h1>
            <h3>{user ? user.email : "email"}</h3>
          </div>
          <Link to="EditProfile" className={styles.editBtn}>
            Edit Profile
          </Link>
        </div>
        <div className={styles.row2}>
          <NavLink className={styles.row2Link} to="favourite">
            Favourites
          </NavLink>
          <NavLink className={styles.row2Link} to="addedPlaces">
            Places Add
          </NavLink>
          <NavLink className={styles.row2Link} to="userReviews">
            Reviews
          </NavLink>
        </div>
      </div>
      <UserProfileContent />
      <AbooutsUs />

      <Footer />
    </>
  );
}

export default UserProfile;
