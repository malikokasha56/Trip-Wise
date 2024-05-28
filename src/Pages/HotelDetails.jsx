import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./HotelDetails.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useAuth } from "../Contexts/AuthContext";

const HotelDetails = () => {
  const { hotelID } = useParams();
  const { isAuthenticated, token, user } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hotelratings, setHotelratings] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [error, setError] = useState(null);
  const [ratingError, setRatingError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("here is user",user)
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  const fetchHotelDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/hotel/getHotel/${hotelID}`,
        {}
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setHotel(data);
      setReviews(data.hotelReviewList.reverse() || []);
      setLoading(false);
      setHotelratings(calculateAverageRating(data.hotelRatingList));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, [hotelID, token]);

  const handleAddReview = async () => {
    setError("");
    if (!newReview.trim()) {
      setError("Review description cannot be empty.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/hotel/addHotelReview/${hotelID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review: newReview }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const addedReview = response;
      console.log(addedReview);
      //   setReviews([...reviews, addedReview]);
      setNewReview("");
      fetchHotelDetails();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const handleRating = (rate) => {
    console.log(rate);
    setRating(rate);
  };

  const handleSetRating = async () => {
    setRatingError("");
    try {
      const response = await fetch(
        `http://localhost:8081/hotel/addHotelRating/${hotelID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Rating added");

      setRating(0); // Reset the rating to 0 after uploading
      fetchHotelDetails();
    } catch (error) {
      setRatingError(error.message);
      setTimeout(() => {
        setRatingError("");
      }, 3000);
    }
  };
  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % hotel.hotelImageList.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + hotel.hotelImageList.length) %
        hotel.hotelImageList.length
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? styles.filledStar : styles.unfilledStar}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{hotel.hotelName}</h1>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            {hotel.hotelImageList && hotel.hotelImageList.length > 0 && (
              <>
                <img
                  src={hotel.hotelImageList[currentImageIndex].imageUrl}
                  alt={hotel.name}
                  className={styles.image}
                />
                <button
                  className={`${styles.slideButton} ${styles.leftButton}`}
                  onClick={handlePrevImage}
                >
                  {"<"}
                </button>
                <button
                  className={`${styles.slideButton} ${styles.rightButton}`}
                  onClick={handleNextImage}
                >
                  {">"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <ul className={styles.detailsList}>
            <li>
              <strong>Rating:</strong> {hotel.averageRating}{" "}
              <span className={styles.ratingStars}>
                {renderStars(hotelratings)}
              </span>
            </li>
            <li>
              <strong>Name:</strong> {hotel.hotelName}
            </li>
            <li>
              <strong>Description:</strong> A beautiful place to dine with a
              stunning view of Islamabad.
            </li>
            <li>
              <strong>Address:</strong> {hotel.hotelAddress}
            </li>
            <li>
              <strong>Min Price:</strong> Rs: {hotel.minPrice}
            </li>
            <li>
              <strong>Max Price:</strong> Rs: {hotel.maxPrice}
            </li>
            <li>
              <strong>City:</strong> {hotel.hotelCity}
            </li>
          </ul>
        </div>
        {isAuthenticated && (
          <>
            <div className={styles.addReviewContainer}>
              <h2 className={styles.subTitle}>Add Review</h2>
              <div className={styles.addReviewInput}>
                <img
                  className={styles.userImagePlaceholder}
                  src={user.imageURL}
                  alt=""
                />
                <input
                  className={styles.reviewPlaceholder}
                  placeholder="Type here"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
              </div>
              <button
                className={styles.addReviewButton}
                onClick={handleAddReview}
              >
                Add review
              </button>
            </div>
            {error && <div className={styles.errorText}>*{error}</div>}
          </>
        )}

        <div className={styles.userReviewsContainer}>
          <h2 className={styles.subTitle}>User Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.userReview}>
                <img
                  src={review.profile.imgUrl}
                  alt=""
                  className={styles.userImagePlaceholder}
                />
                <div>
                  <h3 className={styles.reviewTitle}>
                    {review.profile.firstName + " " + review.profile.lastName}
                  </h3>
                  <p className={styles.reviewDescription}>{review.review}</p>
                  <p className={styles.reviewDate}>
                    {formatDate(review.postedAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews till now.</div>
          )}
        </div>
        {isAuthenticated && (
          <div className={styles.ratingContainer}>
            <h2 className={styles.subTitle}>
              How would you rate your experience?
            </h2>
            <div className={styles.rating}>
              {[1, 2, 3, 4, 5].map((rate) => (
                <span
                  key={rate}
                  className={
                    rating >= rate ? styles.activeStar : styles.inactiveStar
                  }
                  onClick={() => handleRating(rate)}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              className={styles.addRatingButton}
              onClick={handleSetRating}
            >
              Add rating
            </button>
            {ratingError && (
              <div className={styles.errorText}>*{ratingError}</div>
            )}
          </div>
        )}
      </div>
      <AbooutsUs />
      <Footer />
    </div>
  );
};

export default HotelDetails;
