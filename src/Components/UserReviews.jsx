import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserProfileContent from "../Components/UserProfileContent";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";
import styles from './UserReviews.module.css';

function UserReviews() {
  const { updateUser, token, user } = useAuth();
  const { isAuthenticated } = useAuth();
  const[reviews,setReviews]=useState([]);
  const navigate = useNavigate();
  const url="http://localhost:8080/profile/getProfile";
  useEffect(() => {
    // console.log("here");
    if (!isAuthenticated) {
      navigate("/");
    }

    console.log("Fetching data with token:", token);
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setReviews(data);
        console.log("Fetched data:", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [isAuthenticated, navigate]);

  const { hotelList = [], hotelReviewList = [] } = reviews;
  const reviewedHotelIds = hotelReviewList.map(review => review.id);
  const filteredHotels = hotelList.filter(hotel => reviewedHotelIds.includes(hotel.id));


  // Format the date using Intl.DateTimeFormat
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will return a string in the format 'MM/DD/YYYY, HH:MM:SS AM/PM'
  }

  function onReviewClick(id){
    const hotelid=id;
    console.log("here iz",hotelid);
    navigate('/UserHotel',{state:{hotelid}});
  }
  

  
  return (
    <div className={styles.col2}>
    {filteredHotels.map(hotel => {
      // Get the first review for the current hotel
      const hotelReviews = hotelReviewList.filter(review => review.hotel.id === hotel.id);
      const firstReview = hotelReviews.length > 0 ? hotelReviews[0] : null;

      // Only render if there's a review
      if (firstReview) {
        return (
          <div className={styles.row__1} key={hotel.id} onClick={()=>onReviewClick(hotel.id)}>
            <img 
              src={hotel.hotelImageList.length > 0 ? hotel.hotelImageList[0].imageUrl : '/placeholder.jpg'} 
              alt={hotel.hotelName} 
            />
            <h2>{hotel.hotelName}</h2>
            <p className={styles.rating}>Your rating: 4⭐</p>
            <div key={firstReview.id}>
              <h5>{firstReview.review}</h5>
              <h3 className={styles.reviewDate}>Date of review:</h3>
              <span className={styles.date}>🗓 {formatDate(firstReview.postedAt)}</span>
            </div>
          </div>
        );
      }

      return null;
    })}
  </div>
  );
}

export default UserReviews;


// {place.placeImageList.length > 0 && (
//   <img src={place.placeImageList[0].imageUrl} alt={place.placeName} />
// )} 

// <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <p className={styles.rating}>Your rating: 4.0⭐</p>
//         <h2>Great place</h2>
        // <h5>
        //   Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        // </h5>
        // <h3 className={styles.reviewDate}>Date of review:</h3>
        // <span className={styles.date}>🗓 {formattedDateString}</span>
//       </div>
//       <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <p className={styles.rating}>Your rating: 2.0⭐</p>
//         <h2>Just normal</h2>
//         <h5>
//           Bali is a Beautiful Tourist Spot and is Visited by many Travlers
//         </h5>
//         <h3 className={styles.reviewDate}>Date of review:</h3>
//         <span className={styles.date}>🗓 {formattedDateString}</span>
//       </div>