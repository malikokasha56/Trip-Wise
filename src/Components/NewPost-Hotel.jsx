import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewPost-Hotel.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function NewPostHotel() {
  const { token } = useAuth();

  const [currentDate, setCurrentDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hotelName: "",
    hotelDescription: "",
    hotelClass: "",
    breakFastIncluded: true,
    hotelCity: "",
    minPrice: null,
    maxPrice: null,
    hotelAddress: null,
    postedAt: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.hotelName ||
      !formData.hotelCity ||
      !formData.hotelDescription ||
      !formData.hotelAddress
    ) {
      setErrorMessage("Please fill the required fields");
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

        if (!image) {
          setErrorMessage("Please upload a picture");
        } else {
          const formData = new FormData();
          formData.append("image", image);

          try {
            const url1 = `http://localhost:8081/hotel/uploadHotelImage/${hotelID}`;

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
              navigate("/HomePage");
            }
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
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.outBox}>
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
              type="text"
              name="hotelAddress"
              placeholder="Enter address"
              value={formData.hotelAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.col_2}>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
      </form>
      {errorMessage && <p className={styles.error}>*{errorMessage}</p>}
      <button className={styles.submitbtn} type="submit" onClick={handleSubmit}>
        Add hotel
      </button>
    </div>
  );
}

export default NewPostHotel;
