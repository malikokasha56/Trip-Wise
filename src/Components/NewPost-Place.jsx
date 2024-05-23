import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./NewPost-Place.module.css";
import { MutatingDots } from "react-loader-spinner";

function NewPostPlace() {
  const { token } = useAuth();
  const [currentDate, setCurrentDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const initialFormData = {
    placeName: "",
    placeDescription: "",
    placeClass: "",
    placeCity: "",
    placeAddress: "",
    postedAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const [formData, setFormData] = useState(initialFormData);

  async function handleSubmit(e) {
    e.preventDefault();
    setSpinner(true);

    setErrorMessage("");
    console.log(formData, image);
    if (
      !formData.placeName ||
      !formData.placeCity ||
      !formData.placeDescription ||
      !formData.placeAddress ||
      !image
    ) {
      setErrorMessage("Please fill the required fields");
      setSpinner(false);
      return;
    }
    setErrorMessage("");
    const url = "http://localhost:8081/place/addPlace";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      console.log(responseData);
      if (responseData.id) {
        const placeID = responseData.id;

        for (let i = 0; i < image.length; i++) {
          const formData = new FormData();
          formData.append("image", image[i]);
          try {
            const url1 = `http://localhost:8081/place/uploadPlaceImage/${placeID}`;

            const res = await fetch(url1, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });

            const responseImage = await res.json();
            console.log(responseImage);
            if (responseImage.imageUrl) {
              if (i === image.length - 1) {
                setShowModal(true); // Show modal on successful submission
                setTimeout(() => {
                  setShowModal(false); // Hide modal after 3 seconds
                }, 3000);
                setFormData(initialFormData); // Reset form data
                setImage(""); // Clear images
                document.getElementById("imageid").value = "";
              }
            }
          } catch (error) {
            setErrorMessage("Error uploading image");

            console.error("Error uploading image:", error);
          }
        }
      } else {
        setErrorMessage("Error adding place");
      }
    } catch (error) {
      setErrorMessage("Error in sending data to server");
      console.error("Error in API call:", error);
    } finally {
      setSpinner(false);
    }
  }

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
    setFormData((prevData) => ({
      ...prevData,
      postedAt: formattedDate,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files);
    }
  };

  return (
    <div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thank you for adding</h2>
          </div>
        </div>
      )}
      <div className={`${styles.outBox} ${showModal ? styles.blur : ""}`}>
        <h2 className={styles.heading}>Where Did You Went</h2>
        <form className={styles.form_1} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.col_1}>
              <label>Place Name</label>
              <input
                type="text"
                name="placeName"
                placeholder="Enter name"
                value={formData.placeName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.col_2}>
              <label>Place Class</label>
              <input
                type="text"
                name="placeClass"
                placeholder="Enter class"
                value={formData.placeClass}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.col_1}>
              <label>City</label>
              <input
                type="text"
                name="placeCity"
                placeholder="Enter city"
                value={formData.placeCity}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.col_2}>
              <label>Posted At</label>
              <input
                type="text"
                name="postedAt"
                value={formData.postedAt}
                readOnly
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.col_1}>
              <label>Address</label>
              <input
                type="text"
                name="placeAddress"
                placeholder="Enter address"
                value={formData.placeAddress}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.col_2}>
              <label>Image</label>
              <input
                id="imageid"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </div>
          </div>
          <div className={styles.formRowCenter}>
            <div className={styles.col_1} style={{ width: "50%" }}>
              <label>Description</label>
              <input
                type="text"
                name="placeDescription"
                placeholder="Enter description"
                value={formData.placeDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        {errorMessage && <p className={styles.error}>*{errorMessage}</p>}
        {spinner && (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        <button
          className={styles.submitbtn}
          type="submit"
          onClick={handleSubmit}
        >
          Add place
        </button>
      </div>
    </div>
  );
}

export default NewPostPlace;
