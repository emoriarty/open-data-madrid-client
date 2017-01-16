import React, { Component, PropTypes } from 'react'
import List, { ListItem } from 'material-ui/List'

class ContentList extends Component {
  componentWillReceiveProps (nextProps) {
    console.log('items', nextProps.items.length)
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
              primaryText={<span>{item.title}</span>} />
          )
        }
      </List>
    )
  }
}

ContentList.propTypes = {
  items: PropTypes.array
}

export default ContentList
