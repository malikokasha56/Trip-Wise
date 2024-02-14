import { useEffect } from "react";
import styles from "./UserFavourite.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UserFavourite() {
  const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);
  return (
    <div className={styles.col2}>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <h2>Bali,Hunza</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
      </div>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <h2>Bali,Hunza</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
      </div>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <h2>Bali,Hunza</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
      </div>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <h2>Bali,Hunza</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
      </div>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <h2>Bali,Hunza</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
      </div>
      <div className={styles.row__1}>
        <img src="/taiwan.jpg" alt="" />
        <h2>Bali,Hunza</h2>
        <h5>
          Bali is a Beautiful Tourist Spot and is Visited by many Travlers
        </h5>
      </div>
    </div>
  );
}

export default UserFavourite;
