import { Outlet } from "react-router-dom";
import UserActivity from "./UserFavourite";
import styles from "./UserProfileContent.module.css";
import UserProfileContentSideBar from "./UserProfileContentSideBar";



function NewPostContent(){
    return (
        <div>
        <Outlet/>
        </div>
    )
}

export default NewPostContent;