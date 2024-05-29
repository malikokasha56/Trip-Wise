import { useEffect, useState } from "react";
import styles from "./UserFavourite.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UserAddedPlaces() {
  const { token } = useAuth();
  const { isAuthenticated } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:8081/place/getAllPlaceByProfile";

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
    navigate(`/PlaceDetails/${id}`);
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
              {hotel.placeImageList.length > 0 && (
                <img
                  src={hotel.placeImageList[0].imageUrl}
                  alt={hotel.placeName}
                  className={styles.hotelImage}
                />
              )}
              <div className={styles.cardText}>
                <h2>{hotel.placeName}</h2>
                <h5>{hotel.placeDescription}</h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserAddedPlaces;
