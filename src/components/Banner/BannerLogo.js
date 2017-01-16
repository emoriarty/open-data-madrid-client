import React, { PropTypes } from 'react'
import './BannerLogo.css'
import { omit } from 'ramda'

const BannerLogo = (props) => {
  const { alt, logo } = props

  return (
    <img src={logo} alt={alt} style={omit(['alt', 'logo'], props)} />
  )
}

BannerLogo.prototypes = {
  alt: PropTypes.string,
  height: PropTypes.string,
  logo: PropTypes.string.isRequired
}

BannerLogo.defaultProps = {
  height: '80px'
}

export default BannerLogo
