import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#fff', // White background
    padding: '20px 50px', // Padding around the content
    textAlign: 'center', // Center align all text
    borderTop: '2px solid #d4a373', // Gold border at the top
    color: '#333', // Dark grey text color for visibility
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const h2Style = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#b55850', // Dark gold color
    marginBottom: '10px',
    flex: '1 0 100%', // Take full width to ensure it breaks line
    textAlign: 'center'
  };

  const footerSectionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap'
  };

  const footerSectionStyle = {
    margin: '5px 20px', // Adding horizontal margin for spacing
    display: 'flex',
    alignItems: 'center'
  };

  const footerLegalStyle = {
    marginTop: '10px',
    fontSize: '14px',
    color: '#666', // Lighter text color
    width: '100%',
    textAlign: 'center'
  };

  const legalLinksStyle = {
    margin: '0 5px',
    textDecoration: 'none',
    color: '#d4a373', // Gold color for links
  };

  return (
    <footer style={footerStyle}>
      <h2 style={h2Style}>WASNA PALACE</h2>
      <div style={footerSectionsStyle}>
        <div style={footerSectionStyle}>
          <span>📍 Block E Jinnah Garden, Islamabad, ICT, 44000</span>
        </div>
        <div style={footerSectionStyle}>
          <span>📞 Call us: +XXX XXXX XXXX</span>
        </div>
      </div>
      <div style={footerSectionsStyle}>
        <a href="#" style={legalLinksStyle}>Facebook</a>
        <a href="#" style={legalLinksStyle}>Instagram</a>
      </div>
      <div style={footerLegalStyle}>
        <p>© 2024 Wasna Palace. All rights reserved.</p>
        <div>
          <a href="#" style={legalLinksStyle}>Privacy Policy</a> | 
          <a href="#" style={legalLinksStyle}>Terms of Service</a> | 
          <a href="#" style={legalLinksStyle}>Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
