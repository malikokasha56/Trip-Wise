import { useEffect, useState } from "react";
import styles from "./AllPlaces.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

function AllPlaces() {
  const { isAuthenticated, token } = useAuth();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:8081/place/getAllPlace";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    document.title = "Places";

    const fetchPlaces = async () => {
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
        setPlaces(data.reverse());
        console.log("Fetched data:", data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
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
          {places.length === 0 ? (
            <div className={styles.noHotelsMessage}>
              Please share your experience by adding places.
            </div>
          ) : (
            <>
              <h1 className={styles.heading}>
                Top places which you can explore
              </h1>
              <div className={styles.content_box}>
                {places.map((place) => (
                  <div
                    key={place.id}
                    className={styles.card}
                    onClick={() => onHotelClick(place.id)}
                  >
                    {place.placeImageList.length > 0 && (
                      <img
                        src={place.placeImageList[0].imageUrl}
                        alt={place.placeName}
                        className={styles.hotelImage}
                      />
                    )}
                    <div className={styles.cardText}>
                      <h2>{place.placeName}</h2>
                      <h5>{place.placeDescription}</h5>
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

export default AllPlaces;
