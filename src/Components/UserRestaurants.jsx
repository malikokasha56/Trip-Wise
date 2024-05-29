import { useEffect, useState } from "react";
import styles from "./UserFavourite.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UserRestaurants() {
  const { token } = useAuth();
  const { isAuthenticated } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:8081/restaurant/getAllRestaurantByProfile";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchHotels = async () => {
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
        setHotels(data);
        console.log("Fetched data:", data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchHotels();
  }, [isAuthenticated, navigate, token, url]);

  function onHotelClick(id) {
    navigate(`/RestaurantDetails/${id}`);
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {hotels.length === 0 ? (
        <div className={styles.noHotelsMessage}>
          Please share your experience by adding places.
        </div>
      ) : (
        <div className={styles.content_box}>
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={styles.card}
              onClick={() => onHotelClick(hotel.id)}
            >
              {hotel.restaurantImageList.length > 0 && (
                <img
                  src={hotel.restaurantImageList[0].imageUrl}
                  alt={hotel.restaurantName}
                  className={styles.hotelImage}
                />
              )}
              <div className={styles.cardText}>
                <h2>{hotel.restaurantName}</h2>
                <h5>{hotel.restaurantDescription}</h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserRestaurants;
