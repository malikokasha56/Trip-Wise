import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewPost.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
// import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import SearchInput from "../Components/SeachInput";
import { useRef, useState } from "react";
import SurveyComponent from "../Components/RatingComponent";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserProfileContent from "../Components/UserProfileContent";
import NewPostContent from "../Components/NewPostContent";

function NewPost() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    document.title = "New Post";
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <NavBar />
      <div className={styles.options}>
        <div className={styles.formbtns}>
          <NavLink className={styles.links} to="NewPostHotel">
            Add New Hotel
          </NavLink>
          <NavLink className={styles.links} to="NewPostRestraurent">
            Add New Restraurent
          </NavLink>
          <NavLink className={styles.links} to="NewPostPlace">
            Add New Place
          </NavLink>
        </div>
      </div>

      <NewPostContent />

      <AbooutsUs />
      <Footer />
    </div>
  );
}

export default NewPost;
