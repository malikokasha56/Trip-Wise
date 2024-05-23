import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecentSearch.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useRef, useState } from "react";

const ITEM_WIDTH = 300;
const ITEM_WIDTH2 = 300;

function RecentSearch() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();
  const containerRef2 = useRef();
  const [scrollPosition2, setScrollPosition2] = useState(0);

  const handleScroll = (scrollamount) => {
    const newScrollPosition = scrollPosition + scrollamount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };
  const handleScroll2 = (scrollamount) => {
    const newScrollPosition = scrollPosition2 + scrollamount;
    setScrollPosition2(newScrollPosition);
    containerRef2.current.scrollLeft = newScrollPosition;
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.buttonRow1}>
        <button className={styles.btn_1}>
          <img src="/hotel.png" alt="Hotels" />
          <h4>Hotels</h4>
        </button>
        <button className={styles.btn_1}>
          <img src="/things-to-do.png" alt="Things To Do" />
          <h4>Things To Do</h4>
        </button>
        <button className={styles.btn_1}>
          <img src="/restaurant.png" alt="Restaurants" />
          <h4>Restaurants</h4>
        </button>
      </div>

      <div className={styles.row_3}>
      <h1>Traveler&apos;s Choice Best Of The Best Restaurants</h1>
        <h3>Winning flavours for every appetite</h3>
      </div>

      <div className={styles.slider}>
        <img
          className={styles.leftArrow}
          src="/leftt.png"
          alt="Scroll Left"
          onClick={() => handleScroll(-ITEM_WIDTH)}
        />
        <div ref={containerRef} className={styles.scrollContainer}>
          <div className={styles.content_box}>
            <div className={styles.card}>
              <img src="/monal.jpg" alt="Monal, Islamabad" />
              <div className={styles.cardText}>
                <h2>Monal, Islamabad</h2>
                <h5>Monal is a beautiful tourist spot and is visited by many travelers.</h5>
              </div>
              <div className={styles.heart}>
                <img src="/heart.png" alt="Favorite" />
              </div>
            </div>
            <div className={styles.card}>
              <img src="/chayee.jpg" alt="PC, Lahore" />
              <div className={styles.cardText}>
                <h2>PC, Lahore</h2>
                <h5>PC Lahore is a beautiful tourist spot and is visited by many travelers.</h5>
              </div>
              <div className={styles.heart}>
                <img src="/heart.png" alt="Favorite" />
              </div>
            </div>
            <div className={styles.card}>
              <img src="/download7.jpg" alt="Bali, Hunza" />
              <div className={styles.cardText}>
                <h2>Bali, Hunza</h2>
                <h5>Bali is a beautiful tourist spot and is visited by many travelers.</h5>
              </div>
              <div className={styles.heart}>
                <img src="/heart.png" alt="Favorite" />
              </div>
            </div>
          </div>
        </div>
        <img
          className={styles.rightArrow}
          src="/rightt.png"
          alt="Scroll Right"
          onClick={() => handleScroll(ITEM_WIDTH)}
        />
      </div>

      <div className={styles.row_5}>
        <h1>Where to go, right now?</h1>
        <h5>Best Top Hotels Near You</h5>
        <div className={styles.slider}>
          <img
            className={styles.leftArrow}
            src="/leftt.png"
            alt="Scroll Left"
            onClick={() => handleScroll2(-ITEM_WIDTH2)}
          />
          <div ref={containerRef2} className={styles.scrollContainer}>
            <div className={styles.row_6}>
              <div className={styles.col__1}>
                <img src="/Hunza2.png" alt="Hunza" />
                <h2>Hunza</h2>
              </div>
              <div className={styles.col__2}>
                <img src="/Murree2.png" alt="Murree" />
                <h2>Murree</h2>
              </div>
              <div className={styles.col__3}>
                <img src="/Islamabad2.png" alt="Islamabad" />
                <h2>Islamabad</h2>
              </div>
            </div>
          </div>
          <img
            className={styles.rightArrow}
            src="/rightt.png"
            alt="Scroll Right"
            onClick={() => handleScroll2(ITEM_WIDTH2)}
          />
        </div>
      </div>

      <div className={styles.row_7}>
        <img src="/naran.jpg" alt="Explore" />
        <div className={styles.content_2}>
          <h1>Explore Things To Do</h1>
          <button className={styles.learn_more_btn}>Learn More</button>
        </div>
      </div>

      <AbooutsUs />
      <Footer />
    </div>
  );
}

export default RecentSearch;
