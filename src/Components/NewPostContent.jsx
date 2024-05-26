import { Outlet } from "react-router-dom";
import UserActivity from "./UserFavourite";
import styles from "./UserProfileContent.module.css";
import UserProfileContentSideBar from "./UserProfileContentSideBar";
import { useNavigation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NewPostContent(){
    // const { updateUser, token, user } = useAuth();
    // const { isAuthenticated } = useAuth();
    // const[data,setData]=useState([]);
    // const navigate = useNavigate();
    // const url="http://localhost:8080/hotel/getAllHotel";
    // useEffect(() => {
    //   console.log("here");
    //   if (!isAuthenticated) {
    //     navigate("/");
    //   }
  
    //   console.log("Fetching data with token:", token);
    //   fetch(url, {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       setData(data);
    //       console.log("Fetched data:", data);
    //     })
    //     .catch(error => console.error('Error fetching data:', error));
    // }, [isAuthenticated, navigate,token]);
  
    return (
        <div>
        <Outlet/>
        </div>
    )
}

export default NewPostContent;