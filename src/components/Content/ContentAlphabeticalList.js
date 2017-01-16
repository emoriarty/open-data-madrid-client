import React, { Component, PropTypes } from 'react'
import './ContentAlphabeticalList.css'
import List, { ListItem } from 'material-ui/List'
import { head } from 'ramda'

const LetterKey = ({children, style}) =>
  <div className="letter-key text-secondary-color" style={style}>{children}</div>

LetterKey.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
}

class ContentAlphabeticalList extends Component {
  constructor (props) {
    super(props)

    this.currentLetter = ''
    this.getLetter = this.getLetter.bind(this)
  }

  getLetter (currentText) {
    const currentLetter = head(currentText)

    if (this.currentLetter !== currentLetter) {
      return this.currentLetter = currentLetter
    }
  }

  render () {
    const { items } = this.props

    return (
      <List>
        { !items && <h3>La lista está vacía</h3> }
        { 
          items.map(item =>
            <ListItem
              key={item.id}
              leftAvatar={<LetterKey>{this.getLetter(item.title)}</LetterKey>}
              primaryText={<span>{item.title}</span>} />
          )
        }
      </List>
    )
  }
}

ContentAlphabeticalList.propTypes = {
  currentLetter: PropTypes.string,
  items: PropTypes.array
}

ContentAlphabeticalList.defaultProps = {
  items: []
}

export default ContentAlphabeticalList
