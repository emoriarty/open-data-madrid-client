import React, { PropTypes } from 'react'
import './Content.css'

const Content = ({children}) =>
  <div className="content primary-text-color">
    {children}
  </div>

Content.propTypes = {
  children: PropTypes.node
}

export default Content
