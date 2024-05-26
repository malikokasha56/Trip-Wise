import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import styles from "./ThingsToDo.module.css";
import NavBar from "../Components/NavBar";
import AbooutsUs from "../Components/AbooutsUs";
import Footer from "../Components/Footer";

const ThingsToDo = () => {
    const thingsToDo = [
        { id: 1, title: 'Sports Events', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 2, title: 'Sports Events', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 3, title: 'Sports Events', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
    ];

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.thingsToDoContainer}>
                <h1 className={styles.header}>Things to Do</h1>
                {thingsToDo.map(item => (
                    <div key={item.id} className={styles.thingToDo}>
                        <div className={styles.textContainer}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                        <button className={styles.deleteButton}>Delete</button>
                    </div>
                ))}
                <button className={styles.addButton}>Add</button>
            </div>
            <AbooutsUs />
            <Footer />
        </div>
    );
};

export default ThingsToDo;
