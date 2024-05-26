import { useEffect, useState } from "react";
import styles from "./UserFavourite.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";


function UserFavourite() {
  const { updateUser, token, user } = useAuth();
  const { isAuthenticated } = useAuth();
  const[hotels,setHotels]=useState([]);
  const navigate = useNavigate();
  const url="http://localhost:8080/profile/getProfile";
  useEffect(() => {
    console.log("here");
    if (!isAuthenticated) {
      navigate("/");
    }

    console.log("Fetching data with token of hotels:", token);
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
        setHotels(data);
        // console.log(hotels[0].hotelName);
        
        console.log("Fetched data:", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [isAuthenticated, navigate]);

  const { hotelList = [] } = hotels;
//  const {hotelImageList=[]}=hotelList
  // console.log("iamges",hotelImageList);
  function onHotelClick(id){
    const hotelid=id;
    console.log("here iz",hotelid);
    navigate('/UserHotel',{state:{hotelid}});
  }

  return (
    <div className={styles.col2}>
    {hotelList.map(hotel => (
      <div key={hotel.id} className={styles.row__1} onClick={()=>onHotelClick(hotel.id)}>
      {hotel.hotelImageList.length > 0 && (
        <img src={hotel.hotelImageList[0].imageUrl} alt={hotel.hotelName} />
      )}  
      <h2>{hotel.hotelName}</h2>
        <h5>{hotel.hotelDescription}</h5>
      </div>
    ))}
      
    </div>
  );
}

export default UserFavourite;




// <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <h2>Bali,Hunza</h2>
//         <h5>
//           {hotels[0].hotelName}
//         </h5>
//       </div>
//       <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <h2>Bali,Hunza</h2>
//         <h5>
//           Bali is a Beautiful Tourist Spot and is Visited by many Travlers
//         </h5>
//       </div>
//       <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <h2>Bali,Hunza</h2>
//         <h5>
//           Bali is a Beautiful Tourist Spot and is Visited by many Travlers
//         </h5>
//       </div>
//       <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <h2>Bali,Hunza</h2>
//         <h5>
//           Bali is a Beautiful Tourist Spot and is Visited by many Travlers
//         </h5>
//       </div>
//       <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <h2>Bali,Hunza</h2>
//         <h5>
//           Bali is a Beautiful Tourist Spot and is Visited by many Travlers
//         </h5>
//       </div>
//       <div className={styles.row__1}>
//         <img src="/taiwan.jpg" alt="" />
//         <h2>Bali,Hunza</h2>
//         <h5>
//           Bali is a Beautiful Tourist Spot and is Visited by many Travlers
//         </h5>
//       </div>