import { useEffect, useState } from "react";
import styles from "./UserHotel.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchInput from "../Components/SeachInput";

function UserHotel(){
    const { updateUser, token, user } = useAuth();
    const { isAuthenticated } = useAuth();
    const location=useLocation();
    const {hotelid}=location.state || {};
   
    const[hotels,setHotels]=useState([]);
    const navigate = useNavigate();
    // const url="http://localhost:8080/hotel/getHotel/${hotelid}";
  useEffect(() => {
    console.log("here");
    if (!isAuthenticated) {
      navigate("/");
    }

    console.log("Fetching data with token of hotels:", token);
   const fetchHotelData=async()=>{
    try{
        const response = await axios.get(`http://localhost:8080/hotel/getHotel/${hotelid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setHotels(response.data);
          console.log("Fetched data:", response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
   }
   fetchHotelData();
  }, [isAuthenticated, navigate,hotelid]);
  const {hotelImageList=[],profile=[],hotelReviewList=[],hotelRatingList}=hotels;
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will return a string in the format 'MM/DD/YYYY, HH:MM:SS AM/PM'
  }
    return(
        <div>
        <NavBar/>
        
        <div className={styles.search_bar}>
        <input type="text" placeholder="Search best restaurants near by" />
        <button>Search</button>
      </div>

      <div className={styles.header}>
      <h1>{hotels.hotelName}</h1>
    </div>
    <div className={styles.des}>
     
     <p>{hotels.hotelCity}</p>
     <p>{hotels.hotelClass} Class</p>
   
     </div>

    <div className={styles.image_gallery}>
      {hotelImageList.map((hotel)=>(
        <div className={styles.image} key={hotel.id}>
        <img src={hotel.imageUrl} alt="Monal" />
      </div>
      ))}
    </div>

    <div className={styles.postedBy}>
    <img src={profile.imgUrl}/>
    <h4>{profile.firstName +" "+ profile.lastName }</h4>
    <p>{formatDate(hotels.postedAt)}</p>
    </div>
    
    <div className={styles.Description}>
    <p>Rating: {hotelRatingList}</p>
    <p>{hotels.hotelDescription}</p>
    <p>Address: {hotels.hotelAddress}</p>
    <p>BreakFast Included: {hotels.breakFastIncluded ?" Yes":" No"}</p>
    <p>Price Range: {hotels.minPrice} to {hotels.maxPrice}</p>
    </div>

    <div className={styles.user_reviews}>
    {hotelReviewList.map((review) => (
      <div key={review.id} className={styles.review}>
        <div>
        <img src={review.profile.imgUrl} className={styles.review_avatar} />
        </div>
        <div className={styles.review_content}>
         <h3>{review.profile.firstName + " " + review.profile.lastName }</h3> 
        <h4>{review.review}</h4>
         <h7>{(formatDate(review.postedAt))}</h7>
          
        </div>
      </div>
    ))}
  </div>
        <AbooutsUs/>
        <Footer/>
        </div>
    )
}

export default UserHotel;

// {hotels.map((review) => (
  // <div key={review.id} className={styles.review}>
  // {Array(review.rating).fill().map((_, i) => (
  // ))}
// ))}
// <span key={i}>★</span>

// <div className={styles.review_rating}>
//             {Array(review.rating).fill().map((_, i) => (
//               <span key={i}>★</span>
//             ))}
//           </div>