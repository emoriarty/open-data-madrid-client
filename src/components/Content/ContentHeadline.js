import React, { PropTypes } from 'react'
import './ContentHeadline.css'
import { omit } from 'ramda'


const ContentHeadline = ({text, ...props}) => 
  <h2 className="content__headline secondary-text-color" style={omit(['text'], props)}>{text}</h2>

ContentHeadline.propTypes = {
  text: PropTypes.string.isRequired,
  textAlign: PropTypes.string
}

ContentHeadline.defaultProps = {
  textAlign: 'center'
}

export default ContentHeadline
