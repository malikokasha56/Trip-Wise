import { useEffect, useState } from "react";
import styles from "./UserPlace.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import { useLocation } from "react-router-dom";
import axios from "axios";

function UserPlace() {
  const { updateUser, token, user } = useAuth();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { placeid } = location.state || {};

  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  // const url="http://localhost:8080/place/getHotel/${hotelid}";
  useEffect(() => {
    console.log("here");
    if (!isAuthenticated) {
      navigate("/");
    }

    console.log("Fetching data with token of hotels:", token);
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/place/getPlace/${placeid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlaces(response.data);
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPlaceData();
  }, [isAuthenticated, navigate, placeid]);
  const {
    placeImageList = [],
    profile = [],
    placeReviewList = [],
    placeRatingList,
  } = places;
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will return a string in the format 'MM/DD/YYYY, HH:MM:SS AM/PM'
  }

  return (
    <div>
      <NavBar />

      <div className={styles.search_bar}>
        <input type="text" placeholder="Search best restaurants near by" />
        <button>Search</button>
      </div>

      <div className={styles.header}>
        <h1>{places.placeName}</h1>
      </div>
      <div className={styles.des}>
        <p>{places.placeCity}</p>
      </div>

      <div className={styles.image_gallery}>
        {placeImageList.map((place) => (
          <div className={styles.image} key={place.id}>
            <img src={place.imageUrl} alt="Monal" />
          </div>
        ))}
      </div>

      <div className={styles.postedBy}>
        <img src={profile.imgUrl} alt="Profile pic" />
        <h4>{profile.firstName + " " + profile.lastName}</h4>
        <p>{formatDate(places.postedAt)}</p>
      </div>

      <div className={styles.Description}>
        <p>Rating: {placeRatingList}</p>
        <p>{places.placeDescription}</p>
        <p>Address: {places.placeAddress}</p>
      </div>

      <div className={styles.user_reviews}>
        {placeReviewList.map((review) => (
          <div key={review.id} className={styles.review}>
            <div>
              <img
                src={review.profile.imgUrl}
                className={styles.review_avatar}
              />
            </div>
            <div className={styles.review_content}>
              <h3>
                {review.profile.firstName + " " + review.profile.lastName}
              </h3>
              <h4>{review.review}</h4>
              <h7>{formatDate(review.postedAt)}</h7>
            </div>
          </div>
        ))}
      </div>
      <AbooutsUs />
      <Footer />
    </div>
  );
}

export default UserPlace;
