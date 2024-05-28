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
  const navigate = useNavigate();
  const url = "http://localhost:8081/hotel/getAllHotel";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    document.title = "Hotels";

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

    fetchHotels();
  }, [isAuthenticated, navigate, token, url]);

  function onHotelClick(id) {
    navigate("/UserHotel", { state: { hotelid: id } });
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {hotels.length === 0 ? (
          <div className={styles.noHotelsMessage}>
            Please share your experience by adding hotels.
          </div>
        ) : (
          <>
            <h1 className={styles.heading}>Top hotels which you can explore</h1>
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
