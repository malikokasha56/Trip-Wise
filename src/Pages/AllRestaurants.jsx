import { useEffect, useState } from "react";
import styles from "./AllRestaurants.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

function AllRestaurants() {
  const { isAuthenticated, token } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:8081/restaurant/getAllRestaurant";

  useEffect(() => {
    document.title = "Restaurants";

    const fetchRestaurants = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRestaurants(data.reverse());
        console.log("Fetched data:", data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchRestaurants();
  }, [isAuthenticated, navigate, token, url]);

  function onHotelClick(id) {
    navigate("/UserHotel", { state: { hotelid: id } });
  }

  return (
    <>
      <NavBar />
      {error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <div className={styles.container}>
          {restaurants.length === 0 ? (
            <div className={styles.noHotelsMessage}>
              Please share your experience by adding restaurants.
            </div>
          ) : (
            <>
              <h1 className={styles.heading}>
                Top restaurants which you can explore
              </h1>
              <div className={styles.content_box}>
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className={styles.card}
                    onClick={() => onHotelClick(restaurant.id)}
                  >
                    {restaurant.restaurantImageList.length > 0 && (
                      <img
                        src={restaurant.restaurantImageList[0].imageUrl}
                        alt={restaurant.restaurantName}
                        className={styles.hotelImage}
                      />
                    )}
                    <div className={styles.cardText}>
                      <h2>{restaurant.restaurantName}</h2>
                      <h5>{restaurant.restaurantDescription}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <AbooutsUs />
      <Footer />
    </>
  );
}

export default AllRestaurants;
