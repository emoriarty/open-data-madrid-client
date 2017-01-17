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
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Container from './components/Container'
import Banner from './components/Banner'
import Content, {
  ContentHeadline,
  ContentList
} from './components/Content'
import Wrapper from './components/Wrapper'
import { debounce } from 'throttle-debounce'


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
      searchWord: '',
      urlCatalog: 'http://127.0.0.1:10010',
      urlItems: 'http://127.0.0.1:10010/catalog-items'
    }

    this.getDebouncedItems = debounce(400, this.getItems.bind(this))
    this.getItems = this.getItems.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    axios.get(this.state.urlCatalog)
      .then(response => {
        this.setState({ catalog: response.data });
      })
    this.handleScroll()
  }

  getItems(params) {
    const { currentPage, items, searchWord, urlItems } = this.state

    return axios.get(urlItems, {
        params: { page: currentPage, search: searchWord }
      })
      .then(response => {
        const { data } = response
        const result = currentPage > 0
          ? concat(items, data.items)
          : data.items
        
        this.setState({
          items: result
        })
        !data.more && this.setState({
          hasMoreItems: false
        })
        return data
      })
  }

  handleSearch (ev) {
    this.setState({
      currentPage: 0,
      searchWord: ev.target.value
    })
    this.getDebouncedItems()
  }

  handleScroll () {
    this.getItems()
      .then(() => this.setState({
        currentPage: inc(this.state.currentPage)
      }))
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
                <TextField
                  fullWidth={true}
                  hintText="Filtra la lista por nombre"
                  onChange={this.handleSearch} />
              </Wrapper>
              <InfiniteScroll
                hasMore={hasMoreItems}
                initialLoad={false}
                loadMore={this.handleScroll}
                loader={<div style={{textAlign: 'center'}}>cargando...</div>}
                pageStart={0}>
                <ContentList items={items} />
              </InfiniteScroll>
            </Content>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
