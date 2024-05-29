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
  const [filter, setFilter] = useState("0");
  const navigate = useNavigate();
  const url = "http://localhost:8081/restaurant/getAllRestaurant";

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

  useEffect(() => {
    document.title = "Restaurants";
    if (filter === "0") {
      fetchRestaurants();
    } else {
      fetchRestaurantsNearByYou();
    }
    fetchRestaurants();
  }, [isAuthenticated, navigate, token, url]);

  function onRestaurantClick(id) {
    navigate(`/RestaurantDetails/${id}`);
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  function handleChangePageData(event) {
    const value = event.target.value;
    setFilter(value);
    if (value === "0") {
      fetchRestaurants();
    } else {
      fetchRestaurantsNearByYou();
    }
  }

  function fetchRestaurantsNearByYou() {
    // Make a request to ipinfo.io to get geolocation information based on IP
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        // Extract city name from response
        var cityName = data.city;

        fetch(
          `http://localhost:8081/restaurant/getAllRestaurantByCity/${cityName}`
        )
          .then((response) => response.json())
          .then((data) => {
            setRestaurants(data.reverse());
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
        <h1 className={styles.heading}>
          Top Restaurants which you can explore
        </h1>
        <div>
          <select id="fruitSelect" onChange={handleChangePageData}>
            <option value="0">All Restaurants</option>
            <option value="1">Restaurants Near By You</option>
          </select>
        </div>
        {restaurants.length === 0 && filter === "0" ? (
          <div className={styles.noHotelsMessage}>
            Please share your experience by adding restaurants.
          </div>
        ) : restaurants.length === 0 && filter === "1" ? (
          <div className={styles.noHotelsMessage}>
            No posts about restaurants in your area
          </div>
        ) : (
          <>
            <div className={styles.content_box}>
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={styles.card}
                  onClick={() => onRestaurantClick(restaurant.id)}
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
      <AbooutsUs />
      <Footer />
    </>
  );
}

export default AllRestaurants;
