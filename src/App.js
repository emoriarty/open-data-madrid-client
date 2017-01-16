import React, { Component } from 'react'
import { concat, inc } from 'ramda'
import logo from './img/madrid.svg'
import bannerBackground from './img/background-madrid.jpg'
import './styles/App.css'
import './styles/reset.css'
import './styles/palette.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import InfiniteScroll from 'react-infinite-scroller'
import AppBar from 'material-ui/AppBar'
import axios from 'axios'
import Container from './components/Container'
import Banner from './components/Banner'
import Content, {
  ContentHeadline,
  ContentAlphabeticalList
} from './components/Content'
import Wrapper from './components/Wrapper'


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      catalog: {},
      currentPage: 0,
      hasMoreItems: true,
      items: [],
      theme: getMuiTheme({
        palette: {
          primary1Color: '#2196F3'
        }
      }),
      urlCatalog: 'http://127.0.0.1:10010',
      urlItems: 'http://127.0.0.1:10010/catalog-items'
    }
    this.getItems = this.getItems.bind(this)
  }

  componentDidMount() {
    axios.get(this.state.urlCatalog)
      .then(response => {
        this.setState({ catalog: response.data });
      })
    this.getItems()
  }

  getItems() {
    const { currentPage, items, urlItems } = this.state

    console.log(currentPage)
    axios.get(urlItems, {
        params: {
          page: currentPage
        }
      })
      .then(response => {
        const { data } = response
        const result = concat(items, data.items)
        
        data.more
          ? this.setState({
              currentPage: inc(currentPage),
              items: result
            })
          : this.setState({
              hasMoreItems: false
            })
      })
  }
  
  render() {
    const { catalog, hasMoreItems, items, theme } = this.state;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="App">
          <AppBar
            showMenuIconButton={false}
            title="Madrid Info" />
          <Container>
            <Banner background={bannerBackground}
              logo={logo}
              heading="Bienvenidos a Madrid Info"
              subheading={catalog.title} />
            <Content>
              <Wrapper>
                <ContentHeadline text="Catálogo" />
              </Wrapper>
              <InfiniteScroll
                hasMore={hasMoreItems}
                initialLoad={false}
                loadMore={this.getItems}
                loader={<div style={{textAlign: 'center'}}>cargando...</div>}
                pageStart={0}>
                <ContentAlphabeticalList items={items} />
              </InfiniteScroll>
            </Content>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
