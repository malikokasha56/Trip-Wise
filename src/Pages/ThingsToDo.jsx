import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import styles from "./ThingsToDo.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const ThingsToDo = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [thingsToDo, setThingsToDo] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      document.title = "Things to do";
      getAllThingsToDo();
    }
  }, [isAuthenticated, navigate]);

  const getAllThingsToDo = async () => {
    const url = "http://localhost:8081/things/getAll";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch things to do");
      }

      const data = await response.json();
      setThingsToDo(data);
    } catch (error) {
      console.error("Error fetching things to do:", error);
    }
  };

  const handleDelete = async (thingsToDoId) => {
    const url = `http://localhost:8081/things/deleteThings/${thingsToDoId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete thing to do");
      }

      getAllThingsToDo();
    } catch (error) {
      console.error("Error deleting thing to do:", error);
    }
  };

  const handleAddButton = () => {
    navigate("/AddThingsToDo");
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <div className={styles.thingsToDoContainer}>
        <h1 className={styles.header}>Things to Do</h1>
        {thingsToDo.length === 0 ? (
          <p className={styles.emptyMessage}>
            Please click Add button to add things
          </p>
        ) : (
          thingsToDo.map((item) => (
            <div key={item.id} className={styles.thingToDo}>
              <div className={styles.textContainer}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
        <button className={styles.addButton} onClick={handleAddButton}>
          Add
        </button>
      </div>
      <AbooutsUs />
      <Footer />
    </div>
  );
};

export default ThingsToDo;
