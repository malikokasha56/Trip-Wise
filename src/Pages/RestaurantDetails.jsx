import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./RestaurantDetails.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useAuth } from "../Contexts/AuthContext";

const RestaurantDetails = () => {
  const { restaurantID } = useParams();
  const { isAuthenticated, token, user } = useAuth();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [restaurantratings, setRestaurantratings] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [error, setError] = useState(null);
  const [ratingError, setRatingError] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  const fetchRestaurantDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/restaurant/getRestaurant/${restaurantID}`,
        {}
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurant(data);
      setReviews(data.restaurantReviewList.reverse() || []);
      console.log("data iz:", data);
      console.log("here are reviews", reviews);
      setLoading(false);
      setRestaurantratings(calculateAverageRating(data.restaurantRatingList));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [restaurantID, token]);

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
        `http://localhost:8081/restaurant/addRestaurantReview/${restaurantID}`,
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
      fetchRestaurantDetails();
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
        `http://localhost:8081/restaurant/addRestaurantRating/${restaurantID}`,
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
      fetchRestaurantDetails();
    } catch (error) {
      setRatingError(error.message);
      setTimeout(() => {
        setRatingError("");
      }, 3000);
    }
  };
  const handleNextImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) % restaurant.restaurantImageList.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + restaurant.restaurantImageList.length) %
        restaurant.restaurantImageList.length
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
        <h1 className={styles.title}>{restaurant.restaurantName}</h1>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            {restaurant.restaurantImageList &&
              restaurant.restaurantImageList.length > 0 && (
                <>
                  <img
                    src={
                      restaurant.restaurantImageList[currentImageIndex].imageUrl
                    }
                    alt={restaurant.name}
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
              <strong>Rating:</strong> {restaurant.averageRating}{" "}
              <span className={styles.ratingStars}>
                {renderStars(restaurantratings)}
              </span>
            </li>
            <li>
              <strong>Name:</strong> {restaurant.restaurantName}
            </li>
            <li>
              <strong>Description:</strong> {restaurant.restaurantDescription}
            </li>
            <li>
              <strong>Address:</strong> {restaurant.restaurantAddress}
            </li>
            <li>
              <strong>Min Price:</strong> Rs: {restaurant.minPrice}
            </li>
            <li>
              <strong>Max Price:</strong> Rs: {restaurant.maxPrice}
            </li>
            <li>
              <strong>City:</strong> {restaurant.restaurantCity}
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

export default RestaurantDetails;
