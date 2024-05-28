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

  useEffect(() => {
    document.title = "Places";

    fetchPlaces();
  }, [isAuthenticated, navigate, token, url]);


  function onPlaceClick(id) {
    navigate(`/PlaceDetails/${id}`);
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  function handleChangePageData() {
    const selectValue = document.getElementById("fruitSelect");
    if (selectValue.value == "0") {
      fetchPlaces();
    } else {
      fetchPlacesNearByYou();
    }
  }

  function fetchPlacesNearByYou() {
    // Make a request to ipinfo.io to get geolocation information based on IP
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        // Extract city name from response
        var cityName = data.city;

        fetch(`http://localhost:8081/place/getAllPlaceByCity/${cityName}`)
          .then((response) => response.json())
          .then((data) => {
            setPlaces(data.reverse());
          });

        console.log("Your city: " + cityName);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  return (
    <>
    <NavBar />
    <div className={styles.container}>
      {places.length === 0 ? (
        <div className={styles.noHotelsMessage}>
          Please share your experience by adding hotels.
        </div>
      ) : (
        <>
          <h1 className={styles.heading}>Top Places which you can explore</h1>
          <div>
            <select id="fruitSelect" onChange={handleChangePageData}>
              <option value="0">All Places</option>
              <option value="1">Places Near By You</option>
            </select>
          </div>
          <div className={styles.content_box}>
            {places.map((place) => (
              <div
                key={place.id}
                className={styles.card}
                onClick={() => onPlaceClick(place.id)}
              >
                {place.placeImageList.length > 0 && (
                  <img
                    src={place.placeImageList[0].imageUrl}
                    alt={place.placeName}
                    className={styles.placeImage}
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
    <AbooutsUs />
    <Footer />
  </>
  );
}

export default AllPlaces;
