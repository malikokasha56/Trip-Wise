import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecentSearch.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
// import { useEffect } from "react";
// import { useAuth } from "../Contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import SearchInput from "../Components/SeachInput";
import { useRef, useState } from "react";

const ITEM_WIDTH = 200;
const ITEM_WIDTH2 = 200;

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
    <div>
      <NavBar />
      <div className={styles.buttonRow1}>
        <button className={styles.btn_1}>
          <img src="/hotel.png" alt="" />
          <h4>Hotels</h4>
        </button>
        <button className={styles.btn_1}>
          <img src="/things-to-do.png" alt="" />
          <h4>Things To Do</h4>
        </button>
        <button className={styles.btn_1}>
          <img src="/restaurant.png" alt="" />
          <h4>Restraurents</h4>
        </button>
      </div>
      <SearchInput />
      <div className={styles.row_2}>
        <h2>Your Recent Searches</h2>
      </div>
      <div className={styles.buttonRow2}>
        <button className={styles.btn_2}>
          <h3>Best Hotels</h3>
        </button>
        <button className={styles.btn_2}>
          <h3>Safe Places</h3>
        </button>
        <button className={styles.btn_2}>
          <h3>Things To Do</h3>
        </button>
        <button className={styles.btn_2}>
          <h3>Islamabad</h3>
        </button>
      </div>

      <div className={styles.row_3}>
        <h1>Traveler&apos;s Choice Best Of The Best Restaurants</h1>
        <h5>Winning flavours for every appetite</h5>
      </div>

      <div className={styles.arrows}>
        <img
          className={styles.leftArrow}
          src="./public/leftt.png"
          alt=""
          onClick={() => handleScroll(-ITEM_WIDTH)}
        />
        <img
          className={styles.rightArrow}
          src="./public/rightt.png"
          alt=""
          onClick={() => handleScroll(ITEM_WIDTH)}
        />
      </div>

      <div
        ref={containerRef}
        style={{
          width: "1400px",
          overflowX: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        <div className={styles.content_box}>
          <div className={styles.card}>
            <img src="/monal.jpg" alt="" />
            <h2>Monal,Islamabad</h2>
            <h5>
              Monal is a beautiful tourist spot and is visited by many
              travelers.
            </h5>
            <div className={styles.heart}>
              <img src="/heart.png" alt="" />
            </div>
          </div>
          <div className={styles.card}>
            <img src="/monal.jpg" alt="" />
            <h2>Monal,Islamabad</h2>
            <h5>
              Monal is a beautiful tourist spot and is visited by many
              travelers.
            </h5>
            <div className={styles.heart}>
              <img src="/heart.png" alt="" />
            </div>
          </div>
          <div className={styles.card}>
            <img src="/monal.jpg" alt="" />
            <h2>Monal,Islamabad</h2>
            <h5>
              Monal is a beautiful tourist spot and is visited by many
              travelers.
            </h5>
            <div className={styles.heart}>
              <img src="/heart.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.row_5}>
        <img className={styles.singapore} src="/singapore.jpg" />
        <div className={styles.content}>
          <h1>Where to go,right now?</h1>
          <h5>Best Top Hotels Near You</h5>
          <div className={styles.arrows}>
            <img
              className={styles.leftArrow}
              src="./public/leftt.png"
              alt=""
              onClick={() => handleScroll2(-ITEM_WIDTH2)}
            />
            <img
              className={styles.rightArrow}
              src="./public/rightt.png"
              alt=""
              onClick={() => handleScroll2(ITEM_WIDTH2)}
            />
          </div>

          <div
            ref={containerRef2}
            style={{
              width: "1800px",
              overflowX: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            <div className={styles.row_6}>
              <div className={styles.col__1}>
                <img src="/Hunza2.png" alt="" />
                <h2>Hunza</h2>
              </div>
              <div className={styles.col__2}>
                <img src="/Murree2.png" alt="" />
                <h2>Murree</h2>
              </div>
              <div className={styles.col__3}>
                <img src="/Islamabad2.png" alt="" />
                <h2>Islamabad</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.row_7}>
        <img src="/download (8).jpg" alt="" />
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
