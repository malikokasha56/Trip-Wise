import { Outlet } from "react-router-dom";
import UserActivity from "./UserFavourite";
import styles from "./UserProfileContent.module.css";
import UserProfileContentSideBar from "./UserProfileContentSideBar";

function UserProfileContent() {
  return (
    <div className={styles.content}>
      <UserProfileContentSideBar />
      <Outlet />
    </div>
  );
}

export default UserProfileContent;
