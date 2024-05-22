import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./SearchInput.module.css";
import { useAuth } from "../Contexts/AuthContext";
import SignUp from "../Pages/SignUp";
import { useEffect } from "react";


function SearchInput(){
    return(
        <div className={styles.form}>
            <input className={styles.search_inpt} type="text" placeholder="Search Best Restraurents Near By "></input>
            <button className={styles.search_btn}>Search</button>
    </div>
    )
}

export default SearchInput;