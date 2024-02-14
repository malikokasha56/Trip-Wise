import styles from "./UserReviews.module.css";

function UserReviews() {
  const currentDate = new Date();

  // Format the date using Intl.DateTimeFormat
  const formattedDateString = new Intl.DateTimeFormat("en-GB").format(
    currentDate
  );
  return (
    <div className={styles.col2}>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <p className={styles.rating}>Your rating: 4.0⭐</p>
        <h2>Great place</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
        <h3 className={styles.reviewDate}>Date of review:</h3>
        <span className={styles.date}>🗓 {formattedDateString}</span>
      </div>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <p className={styles.rating}>Your rating: 2.0⭐</p>
        <h2>Just normal</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
        <h3 className={styles.reviewDate}>Date of review:</h3>
        <span className={styles.date}>🗓 {formattedDateString}</span>
      </div>
    </div>
  );
}

export default UserReviews;
