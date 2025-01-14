import React, { useState } from "react";
import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";
import image5 from "../assets/img5.jpg";

const images = [
  {
    src: image1,
    title: "Event Management 1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore qui ea architecto numquam recusandae quisquam debitis minus, perferendis assumenda. Fugiat odio tenetur nam numquam hic cupiditate omnis quod voluptates obcaecati?",
  },
  {
    src: image2,
    title: "Event Management 2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore qui ea architecto numquam recusandae quisquam debitis minus, perferendis assumenda. Fugiat odio tenetur nam numquam hic cupiditate omnis quod voluptates obcaecati?",
  },
  {
    src: image3,
    title: "Event Management 3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore qui ea architecto numquam recusandae quisquam debitis minus, perferendis assumenda. Fugiat odio tenetur nam numquam hic cupiditate omnis quod voluptates obcaecati?",
  },
  {
    src: image4,
    title: "Event Management 4",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore qui ea architecto numquam recusandae quisquam debitis minus, perferendis assumenda. Fugiat odio tenetur nam numquam hic cupiditate omnis quod voluptates obcaecati?",
  },
  {
    src: image5,
    title: "Event Management 5",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore qui ea architecto numquam recusandae quisquam debitis minus, perferendis assumenda. Fugiat odio tenetur nam numquam hic cupiditate omnis quod voluptates obcaecati?",
  },
];

const EventComplex = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
    marginTop: "100px",
  };

  const galleryContainerStyle = {
    border: "2px solid #ccc",
    borderRadius: "10px",
    borderColor: "#d4a373",
    overflow: "hidden",
    width: "90%",
    maxWidth: "1500px",
    marginTop: "20px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    fontSize: "56px",
    margin: "20px 10px",
    fontWeight: "bold",
    color: "#3d0420",
    fontFamily: '"Americana", regular',
    textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)",
  };

  const innerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: "500px",
    gap: "10px",
  };

  const getItemStyle = (index) => {
    const isActive = activeIndex === index;
    const isBlur = activeIndex !== null && activeIndex !== index;

    return {
      position: "relative",
      flex: isActive ? 3 : 1,
      backgroundImage: `url(${images[index].src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "flex 0.5s ease, filter 0.5s ease",
      cursor: "pointer",
      filter: isBlur ? "blur(4px)" : "none",
      zIndex: isActive ? 2 : 1,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      borderRadius: "5px",
      overflow: "hidden",
    };
  };

  const overlayStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    color: "#d4a373",
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
    maxWidth: "80%",
    backgroundColor: "rgb(61, 4, 32, 0.9)",
    padding: "10px",
    borderRadius: "5px",
    fontFamily: '"Americana", regular',
  };

  const imageTextStyle = {
    textAlign: "center",
    color: "#104136",
    fontSize: "18px",
    marginTop: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#d4a373", // Primary background color
    color: "#ffffff", // Text color
    border: "1px solid transparent", // Border color
    padding: "12px 30px", // Padding for the button
    fontSize: "16px", // Font size
    cursor: "pointer", // Cursor style
    borderRadius: "30px", // Rounded corners
    fontWeight: "600", // Bold font weight
    transition: "background-color 0.3s ease", // Smooth hover transition
    textDecoration: "none", // Remove text decoration (e.g., underlines)
    fontFamily: '"Bank Gothic", sans-serif',
  };

  const buttonHoverStyle = {
    backgroundColor: "#104136",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Event Complex</h1>
      <div style={galleryContainerStyle}>
        <div style={innerContainerStyle}>
          {images.map((image, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {activeIndex === index && (
                <div style={overlayStyle}>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        buttonHoverStyle.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor =
                        buttonStyle.backgroundColor)
                    }
                  >
                    <a href="wasna-palace">Learn More</a>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Add text below each image */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            fontFamily: '"Brawler", serif',
            fontWeight: "bolder",
            fontSize: "20px",
          }}
        >
          {images.map((image, index) => (
            <p
              key={index}
              style={{
                ...imageTextStyle,
                visibility:
                  activeIndex === index || activeIndex === null
                    ? "visible"
                    : "hidden",
              }}
            >
              {image.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventComplex;
