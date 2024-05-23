import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewPost-Hotel.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { MutatingDots } from "react-loader-spinner";

const initialData = {
  hotelName: "",
  hotelDescription: "",
  hotelClass: "",
  breakFastIncluded: true,
  hotelCity: "",
  minPrice: "",
  maxPrice: "",
  hotelAddress: "",
  postedAt: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
};

function NewPostHotel() {
  const { token } = useAuth();

  const [currentDate, setCurrentDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState(initialData);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSpinner(true);
    console.log(formData, image);
    if (
      !formData.hotelName ||
      !formData.hotelCity ||
      !formData.hotelDescription ||
      !formData.hotelAddress ||
      !image
    ) {
      setErrorMessage("Please fill the required fields");
      setSpinner(false);
      return;
    }
    setErrorMessage("");
    const url = "http://localhost:8081/hotel/addHotel";

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
        const hotelID = responseData.id;

        for (let i = 0; i < image.length; i++) {
          const imageData = new FormData();
          imageData.append("image", image[i]);

          try {
            const url1 = `http://localhost:8081/hotel/uploadHotelImage/${hotelID}`;

            const res = await fetch(url1, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: imageData,
            });

            const responseImage = await res.json();
            console.log(responseImage);
            if (responseImage.imageUrl) {
              if (i === image.length - 1) {
                setShowModal(true); // Show modal on successful submission
                setTimeout(() => {
                  setShowModal(false); // Hide modal after 4 seconds
                }, 4000);
                setFormData(initialData);
                setImage(""); // Clear images
                document.getElementById("imageid").value = "";
              }
            }
            console.log(formData.hotelAddress);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      } else {
        setErrorMessage("Error adding hotel");
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
    <div className={`${styles.outBox} ${showModal ? styles.blur : ""}`}>
      <h2 className={styles.heading}>Where Did You Went</h2>
      <form className={styles.form_1} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.col_1}>
            <label>Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              placeholder="Enter name"
              value={formData.hotelName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.col_2}>
            <label>Hotel Class</label>
            <input
              type="text"
              name="hotelClass"
              placeholder="Enter class"
              value={formData.hotelClass}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.col_1}>
            <label>Minimum Price</label>
            <input
              type="number"
              name="minPrice"
              max="2000"
              step="100"
              placeholder="Enter minimum price"
              value={formData.minPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.col_2}>
            <label>Maximum Price</label>
            <input
              type="number"
              name="maxPrice"
              step="100"
              placeholder="Enter maximum price"
              value={formData.maxPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.col_1}>
            <label>City</label>
            <input
              type="text"
              name="hotelCity"
              placeholder="Enter city"
              value={formData.hotelCity}
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
            <label>Description</label>
            <input
              id="description"
              type="text"
              name="hotelDescription"
              placeholder="Enter description"
              value={formData.hotelDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.col_2}>
            <label>Breakfast Included</label>
            <select
              name="breakFastIncluded"
              value={formData.breakFastIncluded}
              onChange={handleInputChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.col_1}>
            <label>Address</label>
            <input
              id="address"
              type="text"
              name="hotelAddress"
              placeholder="Enter address"
              value={formData.hotelAddress}
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
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thank you for adding</h2>
          </div>
        </div>
      )}
      <button className={styles.submitbtn} type="submit" onClick={handleSubmit}>
        Add hotel
      </button>
    </div>
  );
}

export default NewPostHotel;
