import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import styles from "./AddThingsToDo.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddThingsToDo = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const url = "http://localhost:8081/things/addThings";

  const handleAdd = async () => {
    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to add thing to do. Please try again.");
      }

      setTitle("");
      setDescription("");
      setSuccess("Thing to do added successfully!");
      setError("");

      setTimeout(() => {
        navigate("/ThingsToDo");
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    document.title = "Add things to do";
  }, [isAuthenticated, navigate]);
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.addThingsToDoContainer}>
        <h1 className={styles.header}>Add Things to do</h1>

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description (minimum 20 words)"
            className={styles.textarea}
          />
        </div>
        {error && <p className={styles.error}>*{error}</p>}
        {success && <p className={styles.success}>*{success}</p>}
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.cancelButton}`}>
            Cancel
          </button>
          <button
            className={`${styles.button} ${styles.addButton}`}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
      <AbooutsUs />
      <Footer />
    </div>
  );
};

export default AddThingsToDo;
