import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DashBoard.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Dash board";
    if (isAuthenticated) {
      navigate("/HomePage");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <NavBar />

      <h1>This is dashBoard</h1>
      {/* <div className={styles.search - bar}>
          <div className={styles.form}>
            <form action="">
              <input
                className={styles.search - inpt}
                type="text"
                placeholder="Search Best Restraurents Near By "
              ></input>
              <button className={styles.search - btn}>Search</button>
            </form>
          </div>
        </div>
        <div className={styles.heading}>
          <h1>Top Restraurents Near By</h1>
        </div>
        <div className={styles.rests}>
          <div className={styles.rest - 1}>
            <img src="/monal.jpg" />
            <h2>Monal</h2>
            <p>
              Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
              <br />
              incididunt ut labore et dolore
            </p>
            <div className={styles.group - 243}>
              <div className={styles.ellipse - 19}></div>
              <div className={styles.ellipse - 20}></div>
              <div className={styles.ellipse - 21}></div>
              <div className={styles.ellipse - 22}></div>
              <div className={styles.ellipse - 23}></div>
            </div>
            <button className={styles.detail - btn}>See Details</button>
          </div>
          <div className={styles.rest - 2}>
            <img src="/murree.jpg" />
            <h2>Pc,Murree</h2>
            <p>
              Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
              <br />
              incididunt ut labore et dolore
            </p>
            <div className={styles.group - 243}>
              <div className={styles.ellipse - 19}></div>
              <div className={styles.ellipse - 20}></div>
              <div className={styles.ellipse - 21}></div>
              <div className={styles.ellipse - 22}></div>
              <div className={styles.ellipse - 23}></div>
            </div>
            <button className={styles.detail - btn}>See Details</button>
          </div>
          <div className={styles.rest - 3}>
            <img src="/bali.jpg" />
            <h2>Bali</h2>
            <p>
              Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
              <br />
              incididunt ut labore et dolore
            </p>
            <div className={styles.group - 243}>
              <div className={styles.ellipse - 19}></div>
              <div className={styles.ellipse - 20}></div>
              <div className={styles.ellipse - 21}></div>
              <div className={styles.ellipse - 22}></div>
              <div className={styles.ellipse - 23}></div>
            </div>
            <button className={styles.detail - btn}>See Details</button>
          </div>
          <div className={styles.rest - 4}>
            <img src="/singapore.jpg" />
            <h2>Singapore</h2>
            <p>
              Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
              <br />
              incididunt ut labore et dolore
            </p>
            <div className={styles.group - 243}>
              <div className={styles.ellipse - 19}></div>
              <div className={styles.ellipse - 20}></div>
              <div className={styles.ellipse - 21}></div>
              <div className={styles.ellipse - 22}></div>
              <div className={styles.ellipse - 23}></div>
            </div>
            <button className={styles.detail - btn}>See Details</button>
          </div>
          <div className={styles.rest - 5}>
            <img src="/chayee.jpg" />
            <h2>Chayee</h2>
            <p>
              Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
              <br />
              incididunt ut labore et dolore
            </p>
            <div className={styles.group - 243}>
              <div className={styles.ellipse - 19}></div>
              <div className={styles.ellipse - 20}></div>
              <div className={styles.ellipse - 21}></div>
              <div className={styles.ellipse - 22}></div>
              <div className={styles.ellipse - 23}></div>
            </div>
            <button className={styles.detail - btn}>See Details</button>
          </div>
          <div className={styles.rest - 6}>
            <img src="/taiwan.jpg" />
            <h2>Taiwan</h2>
            <p>
              Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
              <br />
              incididunt ut labore et dolore
            </p>
            <div className={styles.group - 243}>
              <div className={styles.ellipse - 19}></div>
              <div className={styles.ellipse - 20}></div>
              <div className={styles.ellipse - 21}></div>
              <div className={styles.ellipse - 22}></div>
              <div className={styles.ellipse - 23}></div>
            </div>
            <button className={styles.detail - btn}>See Details</button>
          </div>
        </div>
        <div className={styles.index}>
          <div className={styles.previous}>
            <button className={styles.previous - btn}>Previous</button>
          </div>
          <div className={styles.pages}></div>
          <div className={styles.next}>
            <button className={styles.next - btn}>Next</button>
          </div>
        </div>
  */}
      <Footer>
        <AbooutsUs />
      </Footer>
    </>
  );
}

export default DashBoard;
