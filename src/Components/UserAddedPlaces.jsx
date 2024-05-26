import { useEffect, useState } from "react";
import styles from "./UserFavourite.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


function UserAddedPlaces() {
  const { updateUser, token, user } = useAuth();
  const { isAuthenticated } = useAuth();
  const[places,setPlaces]=useState([]);
  const navigate = useNavigate();
  const url="http://localhost:8080/profile/getProfile";
  useEffect(() => {
    console.log("here");
    if (!isAuthenticated) {
      navigate("/");
    }

    console.log("Fetching data with token:", token);
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPlaces(data);
        console.log("Fetched data:", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [isAuthenticated, navigate]);

  const {placeList=[]}=places;

  function onPlaceClick(id){
    const placeid=id;
    console.log("here iz",placeid);
    navigate('/UserPlace',{state:{placeid}});
  }
  return (
    <div className={styles.col2}>
    {placeList.map(place => (
      <div key={place.id} className={styles.row__1} onClick={()=>onPlaceClick(place.id)}>
      {place.placeImageList.length > 0 && (
        <img src={place.placeImageList[0].imageUrl} alt={place.placeName} />
      )}  
      <h2>{place.placeName}</h2>
        <h5>{place.placeDescription}</h5>
      </div>
    ))}
    </div>
  );
}

export default UserAddedPlaces;
