import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import styles from "./HotelDetails.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";

const HotelDetails = () => {
    const [reviews, setReviews] = useState([
        { id: 1, title: 'Excellent place', description: 'Description' },
        { id: 2, title: 'Excellent place', description: 'Description' }
    ]);
    const [rating, setRating] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "Hotel.jpg",
        "download (3).jpg",
        "Hotel.jpg",
        "murree.jpg",
    ];

    const handleAddReview = () => {
        // Placeholder for adding a review
        console.log('Add review clicked');
    };

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>Monal Islamabad</h1>
                <div className={styles.sliderContainer}>
                    <div className={styles.slider}>
                        <img src={images[currentImageIndex]} alt="Monal Islamabad" className={styles.image} />
                        <button className={`${styles.slideButton} ${styles.leftButton}`} onClick={handlePrevImage}>{"<"}</button>
                        <button className={`${styles.slideButton} ${styles.rightButton}`} onClick={handleNextImage}>{">"}</button>
                    </div>
                </div>
                <div className={styles.detailsContainer}>
                    <ul className={styles.detailsList}>
                        <li><strong>Reviews:</strong> 4.5 <span className={styles.ratingStars}>★★★★☆</span></li>
                        <li><strong>Name:</strong> Monal Islamabad</li>
                        <li><strong>Description:</strong> A beautiful place to dine with a stunning view of Islamabad.</li>
                        <li><strong>Address:</strong> Pir Sohawa Road, Islamabad</li>
                        <li><strong>Min Price:</strong> $20</li>
                        <li><strong>Max Price:</strong> $100</li>
                        <li><strong>City:</strong> Islamabad</li>
                    </ul>
                </div>
                <div className={styles.addReviewContainer}>
                    <h2 className={styles.subTitle}>Add Reviews</h2>
                    <div className={styles.addReviewInput}>
                        <div className={styles.userImagePlaceholder}></div>
                        <div className={styles.reviewPlaceholder}>Type here</div>
                    </div>
                    <button className={styles.addReviewButton} onClick={handleAddReview}>Add review</button>
                </div>
                <div className={styles.userReviewsContainer}>
                    <h2 className={styles.subTitle}>User Reviews</h2>
                    {reviews.map((review) => (
                        <div key={review.id} className={styles.userReview}>
                            <div className={styles.userImagePlaceholder}></div>
                            <div>
                                <h3 className={styles.reviewTitle}>{review.title}</h3>
                                <p className={styles.reviewDescription}>{review.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.ratingContainer}>
                    <h2 className={styles.subTitle}>How would you rate your experience?</h2>
                    <div className={styles.rating}>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <span
                                key={rate}
                                className={rating >= rate ? styles.activeStar : styles.inactiveStar}
                                onClick={() => handleRating(rate)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <button className={styles.addRatingButton}>Add rating</button>
                </div>
            </div>
            <AbooutsUs />
            <Footer />
        </div>
    );
};

export default HotelDetails;