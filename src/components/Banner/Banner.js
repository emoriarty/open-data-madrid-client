import React, { PropTypes } from 'react'
import './Banner.css'
import BannerLogo from './BannerLogo'

const Banner = ({background, logo, heading, subheading}) => {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 123, 0.45)) ${background ? ', url(' + background + ')': ''}`
  }
  
  return (
    <div className="banner" style={style}>
      <h2 className="banner__logo">
        <BannerLogo logo={logo} alt="logo" />
        <span className="banner__heading">{heading}</span>
        <span className="banner__subheading">{subheading}</span>
      </h2>
    </div>
  );
}

Banner.propTypes = {
  background: PropTypes.string,
  logo: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string
};

export default Banner;
