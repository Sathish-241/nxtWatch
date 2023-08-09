import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import VideoItem from '../VideoItem'
import {
  CustomContainer,
  CustomText,
  Logo,
  CloseIcon,
  SearchIcon,
  CustomButton,
  InputField,
  InputFieldContainer,
  ListContainer,
  HeadingText,
} from '../styledComponent'
import './index.css'
import SideNavbar from '../SideNavbar'
import ThemeContext from '../../Context/ThemeContext'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    showBanner: true,
    searchResults: '',
    videosList: [],
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })

    const {searchResults} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchResults}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data.videos)
      const updatedVideosList = data.videos.map(eachItem => ({
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        id: eachItem.id,
      }))
      //   console.log(updatedVideosList)
      this.setState({
        videosList: updatedVideosList,
        apiStatus: apiConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderSideNavbar = () => <SideNavbar />

  removeBanner = () => {
    this.setState({
      showBanner: false,
    })
  }

  renderBanner = () => (
    <CustomContainer
      bgImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
      height="25"
      width="1550"
      backgroundSize="cover"
      backgroundPosition="right"
      padding="20"
      data-testid="banner"
    >
      <CustomContainer
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          height="40"
          width="120"
        />
        <CustomButton
          bgColor="transparent"
          height="30"
          width="30"
          border="0"
          onClick={this.removeBanner}
          data-testid="close"
        >
          <CloseIcon />
        </CustomButton>
      </CustomContainer>
      <CustomText fontFamily="Roboto" fontSize="22" width="450">
        Buy Nxt Watch Premium prepaid plans with UPI
      </CustomText>
      <CustomButton
        border="1"
        borderStyle="solid"
        bgColor="transparent"
        borderColor="black"
        height="40"
        width="150"
        color="black"
        fontSize="18"
      >
        GET IT NOW
      </CustomButton>
    </CustomContainer>
  )

  renderLoader = () => (
    <CustomContainer
      data-testid="loader"
      marginTop="100"
      marginLeft="300"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="40"
      width="800"
    >
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </CustomContainer>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <CustomContainer
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop="100"
            marginLeft="350"
          >
            <Logo
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
              height="300"
              width="600"
            />
            <HeadingText>Oops! Something went wrong</HeadingText>
            <CustomText>
              We are having some trouble to complete your request. Please try
              again
            </CustomText>
            <CustomButton
              type="button"
              color="white"
              bgColor="blue"
              height="30"
              width="100"
              border="0"
              onClick={this.getSearchResults}
            >
              Retry
            </CustomButton>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderNoResultsView = () => (
    <CustomContainer
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop="100"
      marginLeft="500"
    >
      <Logo
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        height="350"
        width="400"
      />
      <HeadingText>No Search results found</HeadingText>
      <CustomText>Try different key words or remove search filters</CustomText>
      <CustomButton
        type="button"
        onClick={this.getSearchResults}
        height="30"
        width="100"
        bgColor="blue"
        color="white"
        border="0"
      >
        Retry
      </CustomButton>
    </CustomContainer>
  )

  updateSearchResults = event => {
    this.setState({
      searchResults: event.target.value,
    })
  }

  getFilteredResults = () => {
    const {videosList, searchResults} = this.state
    const filteredList = videosList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchResults.toLowerCase()),
    )

    this.setState({
      videosList: filteredList,
      searchResults: '',
    })
  }

  renderSearchInputField = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchResults} = this.state
        return (
          <CustomContainer alignSelf="flex-start">
            <InputFieldContainer bgColor="transparent">
              <InputField
                type="search"
                placeholder="Search"
                value={searchResults}
                onChange={this.updateSearchResults}
                bgColor={isDarkTheme ? '#212121' : 'transparent'}
              />
              <CustomButton
                type="button"
                border="1"
                bgColor={isDarkTheme ? '#212121' : 'transparent'}
                borderStyle="solid"
                borderColor="#cbd5e1"
                height="30"
                onClick={this.getFilteredResults}
                data-testid="searchButton"
              >
                <SearchIcon />
              </CustomButton>
            </InputFieldContainer>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderThumbnailsView = () => {
    const {videosList} = this.state
    const shouldShowThumbnails = videosList.length > 0

    return shouldShowThumbnails ? (
      <CustomContainer>
        <ListContainer>
          {videosList.map(eachItem => (
            <VideoItem thumbnailData={eachItem} key={eachItem.id} />
          ))}
        </ListContainer>
      </CustomContainer>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderAllSectionsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderThumbnailsView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLandingPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const {showBanner} = this.state
        return (
          <CustomContainer
            data-testid="home"
            bgColor={isDarkTheme ? '#181818' : '#f9f9f9'}
          >
            {showBanner ? this.renderBanner() : ''}
            <CustomContainer
              paddingLeft="10"
              paddingTop="20"
              //   bgColor=" #f9f9f9"
              height="100"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              flexDirection="column"
            >
              {this.renderSearchInputField()}
              <CustomContainer
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                {this.renderAllSectionsView()}
              </CustomContainer>
            </CustomContainer>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const {isDark} = this.state
    return (
      <CustomContainer height="100" bgColor={isDark ? 'black' : 'white'}>
        <Header />
        <CustomContainer
          display="flex"
          justifyContent="fle-start"
          alignItems="flex-start"
        >
          {this.renderSideNavbar()}
          <CustomContainer>{this.renderLandingPage()}</CustomContainer>
        </CustomContainer>
      </CustomContainer>
    )
  }
}
export default Home
