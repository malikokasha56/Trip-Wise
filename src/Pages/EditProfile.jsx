import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import styles from "./EditProfile.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";

function EditProfile() {
  const { updateUser, token, user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  // const [profilePhoto, setProfilePhoto] = useState("/user.png");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user.imageURL);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handlePhotoChange = (e) => {
    setErrorMessage("");

    const file = e.target.files[0];
    setProfilePhoto(file);

    const blob = new Blob([file], { type: file.type });

    const url = URL.createObjectURL(blob);

    setProfileImageUrl(url);
  };

  async function handleUploadProfileImage(e) {
    e.preventDefault();
    if (!profileImageUrl) {
      setErrorMessage("*No photo selected");
      return;
    }

    const url = "http://localhost:8080/profile/uploadProfileImage";

    // Fetch the image data
    const formData = new FormData();
    formData.append("image", profilePhoto);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      if (res) {
        setUploadMessage("Image uploaded successfully 😎");
        updateUser({ imageURL: data.imageUrl });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error in API call:", error.message);
    }
  }

  async function handleSubmit() {}
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* <img className={styles.logo} src="/Logo.png" alt="TripWise Logo" /> */}
        <h1 className={styles.wlcm}>Edit profile 📝</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.profilePhoto}>
            {profileImageUrl ? (
              <img
                className={styles.profilePhotoPreview}
                src={profileImageUrl}
                alt="Profile"
              />
            ) : (
              <div className={styles.profilePhotoPlaceholder}>No Photo</div>
            )}
            <div className={styles.profileIcon} onClick={() => {}}>
              <label
                htmlFor="photoInput"
                // className={styles.uploadButton}
                onClick={handlePhotoChange}
              >
                📷
              </label>
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }} // Hide the default file input
              />
            </div>
            <button
              className={styles.uploadButton}
              onClick={handleUploadProfileImage}
            >
              Upload Photo
            </button>
            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
            {uploadMessage && (
              <p className={styles.uploadText}>{uploadMessage}</p>
            )}
          </div>
          <label>First Name: </label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <label>Gender: </label>
          <select
            className={styles.selection}
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Others</option>
          </select>
          <button>Apply changes</button>
        </form>
        <NavLink className={styles.link} to="/ChangePassword">
          Want to Change password?
        </NavLink>
      </div>
    </div>
  );
}

export default EditProfile;
