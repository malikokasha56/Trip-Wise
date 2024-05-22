import React from "react";
import styles from "./Recent.module.css";

const Recent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo} />
        <img className={styles.logoImg} alt="logo" src="logo.png" />
        <div className={styles.options}>
          <nav>
            <ul>
              <li>
                <a href="#">Hotels</a>
              </li>
              <li>
                <a href="#">Things To Do</a>
              </li>
              <li>
                <a href="#">Add a Place</a>
              </li>
              <li>
                <a href="#">Write a Review</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.userImg}>
            <img src="user.jpg" alt="user pic" />
          </div>
        </div>
        <div className={styles.login}>
          <button className={styles.loginBtn}>Logout</button>
        </div>
      </div>
      <div className={styles.buttonRow1}>
        <div className={styles.btn1}>
          <img src="hotel.png" alt="hotel icon" />
          <h4>Hotels</h4>
        </div>
        <div className={styles.btn1}>
          <img src="things-to-do.png" alt="list icon" />
          <h4>Things To Do</h4>
        </div>
        <div className={styles.btn1}>
          <img src="restaurant.png" alt="Rest icon" />
          <h4>Restaurants</h4>
        </div>
      </div>
      <div className={styles.form}>
        <input
          className={styles.searchInpt}
          type="text"
          placeholder="Search Best Restaurants Near By"
        />
        <button className={styles.searchBtn}>Search</button>
      </div>
      <div className={styles.row2}>
        <h2>Your Recent Searches</h2>
      </div>
      <div className={styles.buttonRow2}>
        <div className={styles.btn2}>
          <h3>Best Hotels</h3>
        </div>
        <div className={styles.btn2}>
          <h3>Safe Places</h3>
        </div>
        <div className={styles.btn2}>
          <h3>Things To Do</h3>
        </div>
        <div className={styles.btn2}>
          <h3>Islamabad</h3>
        </div>
      </div>
      <div className={styles.row3}>
        <h1>Travelers Choice Best Of The Best Restaurants</h1>
        <h4>Winning flavours for every appetite</h4>
      </div>
      <div className={styles.arrows}>
        <div className={styles.leftArrow}>
          <img src="leftt.png" alt="Arrow" />
        </div>
        <div className={styles.rightArrow}>
          <img src="rightt.png" alt="Arrow" />
        </div>
      </div>
      <div className={styles.row4}>
        <div className={styles.col1}>
          <img src="monal.jpg" alt="Monal" />
          <h2>Monal, Islamabad</h2>
          <h5>
            Monal is a beautiful tourist spot and is visited by many travelers.
          </h5>
          <div className={styles.heart}>
            <img src="heart.png" alt="heart icon" />
          </div>
        </div>
        <div className={styles.col2}>
          <img src="murree.jpg" alt="pc" />
          <h2>Pc, Lahore</h2>
          <h5>
            Pc Lahore is a beautiful tourist spot and is visited by many
            travelers.
          </h5>
          <div className={styles.heart}>
            <img src="heart.png" alt="heart icon" />
          </div>
        </div>
        <div className={styles.col3}>
          <img src="bali.jpg" alt="pc" />
          <h2>Bali, Hunza</h2>
          <h5>
            Bali Hunza Lahore is a beautiful tourist spot and is visited by many
            travelers.
          </h5>
          <div className={styles.heart}>
            <img src="heart.png" alt="heart icon" />
          </div>
        </div>
      </div>
      <div className={styles.row5}>
        <img className={styles.singapore} src="singapore.jpg" alt="singapore" />
        <div className={styles.content}>
          <h1>Where to go,right now?</h1>
          <h4>Best Top Hotels Near You</h4>
        </div>
        <div className={styles.arrows}>
          <div className={styles.leftArrow}>
            <img src="leftt.png" alt="arrow" />
          </div>
          <div className={styles.rightArrow}>
            <img src="rightt.png" alt="arrow" />
          </div>
        </div>
      </div>
      <div className={styles.row6}>
        <div className={styles.col1}>
          <img src="Hunza2.png" alt="hunza" />
          <h2>Hunza</h2>
        </div>
        <div className={styles.col2}>
          <img src="Murree2.png" alt="Murree" />
          <h2>Murree</h2>
        </div>
        <div className={styles.col3}>
          <img src="Islamabad2.png" alt="Islamabad" />
          <h2>Islamabad</h2>
        </div>
      </div>
      <div className={styles.row7}>
        <img src="download (8).jpg" alt="explore" />
        <div className={styles.content2}>
          <h1>Explore Things To Do</h1>
          <button className={styles.learnMoreBtn}>Learn More</button>
        </div>
      </div>
      <div className={styles.aboutus}>
        <div className={styles.col1}>
          <img src="Logo.png" alt="logo" />
          <p>
            Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore
            <br />
            incididunt ut labore et dolore
          </p>
        </div>
        <div className={styles.col2}>
          <h1>Contact Information</h1>
          <div className={styles.contactInfo}>
            <nav>
              <ul>
                <li>
                  <a href="#">Lahore</a>
                </li>
                <li>
                  <a href="#">+92-315-6678345</a>
                </li>
                <li>
                  <a href="#">info@tripwise.com</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.col3}>
          <h1>Quick Links</h1>
          <div className={styles.quickLinks}>
            <nav>
              <ul>
                <li>
                  <a href="#">Wite A Review</a>
                </li>
                <li>
                  <a href="#">Add A Place</a>
                </li>
                <li>
                  <a href="#">Hotels</a>
                </li>
                <li>
                  <a href="#">Things to Do</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.col4}>
          <h1>Links</h1>
          <div className={styles.links}>
            <nav>
              <ul>
                <li>
                  <a href="#">Term of Use</a>
                </li>
                <li>
                  <a href="#">Policy</a>
                </li>
                <li>
                  <a href="#">Cookies</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <h1>CopyRights@Tripwise</h1>
      </div>
    </div>
  );
};

export default Recent;
