import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    profileImage: "",
  });
  const [editMode, setEditMode] = useState({});
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    show: false,
  }); // For custom notification card
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { fullName, dateOfBirth, gender, phoneNumber, profileImage } =
          response.data.user;
        setFormData({
          fullName,
          dateOfBirth: dateOfBirth ? dateOfBirth.split("T")[0] : "",
          gender,
          phoneNumber,
          profileImage,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (field) => {
    try {
      await axios.patch(
        "http://localhost:4000/api/v1/profile",
        { [field]: formData[field] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({
        message: `${field} updated successfully!`,
        type: "success",
        show: true,
      });
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setNotification({
        message: `Failed to update ${field}.`,
        type: "error",
        show: true,
      });
    }
  };

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  // Automatically close the notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer); // Clean up the timer on unmount or notification change
    }
  }, [notification.show]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Lato', sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={formData.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <h2
            style={{ fontSize: "24px", fontWeight: "bold", color: "#d4a373" }}
          >
            {formData.fullName || "Your Name"}
          </h2>
        </div>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {Object.keys(formData).map(
            (field) =>
              field !== "profileImage" && (
                <div key={field}>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#4e342e",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    <FaPencilAlt
                      style={{
                        cursor: "pointer",
                        color: "#d4a373",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleEdit(field)}
                    />
                  </label>
                  {editMode[field] ? (
                    <>
                      <input
                        type={field === "dateOfBirth" ? "date" : "text"}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #d4a373",
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleUpdate(field);
                        }}
                        style={{
                          padding: "10px",
                          backgroundColor: "#d4a373",
                          border: "none",
                          color: "#fff",
                          borderRadius: "5px",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #d4a373",
                        backgroundColor: "#f9f9f9",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(field)}
                    >
                      {formData[field] || "Not set"}
                    </div>
                  )}
                </div>
              )
          )}
        </form>

        {notification.show && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: notification.type === "success" ? "#4caf50" : "#f44336",
              color: "#fff",
              padding: "15px",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              opacity: notification.show ? 1 : 0, // Ensure it fades out
              transition: "opacity 1s ease-out", // Add fade transition
            }}
          >
            <span style={{ flex: 1 }}>{notification.message}</span>
            <button
              onClick={closeNotification}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              &#10006; {/* Cross button */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
