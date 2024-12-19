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
    justifyContent: "center",
    padding: "20px",
    fontFamily: '"Playfair Display", serif',
    minHeight: "100vh",
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
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#d4a373",
    fontFamily: '"Playfair Display", serif',
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
    backgroundColor: "rgba(0, 31, 63, 0.8)",
    padding: "10px",
    borderRadius: "5px",
  };

  const imageTextStyle = {
    textAlign: "center",
    color: "#d4a373",
    fontSize: "18px",
    marginTop: "10px",
    fontFamily: '"Playfair Display", serif',
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#b55850",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
    borderRadius: "3px",
    fontFamily: '"Playfair Display", serif',
  };

  const buttonHoverStyle = {
    backgroundColor: "#ffffff",
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
