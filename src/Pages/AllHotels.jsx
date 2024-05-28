import { useEffect, useState } from "react";
import styles from "./AllHotels.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

function AllHotels() {
  const { isAuthenticated, token } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("0");
  const navigate = useNavigate();
  const url = "http://localhost:8081/hotel/getAllHotel";

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
      setHotels(data.reverse());

      console.log("Fetched data:", data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    }
  };

  const fetchHotelsNearByYou = async () => {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();
      const cityName = data.city;

      const cityResponse = await fetch(
        `http://localhost:8081/hotel/getAllHotelByCity/${cityName}`
      );
      const cityData = await cityResponse.json();
      setHotels(cityData.reverse());

      console.log("Your city: " + cityName);
    } catch (error) {
      console.error("Error fetching nearby hotels:", error);
    }
  };

  useEffect(() => {
    document.title = "Hotels";

    if (filter === "0") {
      fetchHotels();
    } else {
      fetchHotelsNearByYou();
    }
  }, [isAuthenticated, navigate, token, filter]);

  function onHotelClick(id) {
    navigate(`/HotelDetails/${id}`);
  }

  const handleChangePageData = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (value === "0") {
      fetchHotels();
    } else {
      fetchHotelsNearByYou();
    }
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Top hotels which you can explore</h1>
        <div>
          <select
            id="fruitSelect"
            value={filter}
            onChange={handleChangePageData}
          >
            <option value="0">All Hotels</option>
            <option value="1">Hotels Near By You</option>
          </select>
        </div>
        {hotels.length === 0 && filter === "0" ? (
          <div className={styles.noHotelsMessage}>
            Please share your experience by adding hotels.
          </div>
        ) : hotels.length === 0 && filter === "1" ? (
          <div className={styles.noHotelsMessage}>
            No posts about hotels in your area
          </div>
        ) : (
          <>
            <div className={styles.content_box}>
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className={styles.card}
                  onClick={() => onHotelClick(hotel.id)}
                >
                  {hotel.hotelImageList.length > 0 && (
                    <img
                      src={hotel.hotelImageList[0].imageUrl}
                      alt={hotel.hotelName}
                      className={styles.hotelImage}
                    />
                  )}
                  <div className={styles.cardText}>
                    <h2>{hotel.hotelName}</h2>
                    <h5>{hotel.hotelDescription}</h5>
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

export default AllHotels;
