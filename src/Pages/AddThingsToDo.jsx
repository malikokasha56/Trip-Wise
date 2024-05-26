import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import styles from "./AddThingsToDo.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";

const AddThingsToDo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        // Placeholder for add functionality
        console.log('Add clicked');
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.addThingsToDoContainer}>
                <h1 className={styles.header}>Add Things to do</h1>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>Title</label>
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
                    <label htmlFor="description" className={styles.label}>Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the description"
                        className={styles.textarea}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                    <button className={`${styles.button} ${styles.addButton}`} onClick={handleAdd}>Add</button>
                </div>
            </div>
            <AbooutsUs />
            <Footer />
        </div>
    );
};

export default AddThingsToDo;
