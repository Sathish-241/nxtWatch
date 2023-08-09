import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import {
  CustomContainer,
  GameIcon,
  IconContainer,
  HeadingText,
  ListContainer,
} from './styledComponent'
import {Logo, CustomText, CustomButton} from '../styledComponent'

import GamingVideoItem from '../GamingVideoItem'
import ThemeContext from '../../Context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gamingVideosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedGamingVideosList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))

      this.setState({
        gamingVideosList: formattedGamingVideosList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

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
            <HeadingText color={isDarkTheme ? 'white' : '#212121'}>
              Oops! Something went wrong
            </HeadingText>
            <CustomText color={isDarkTheme ? 'white' : '#212121'}>
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
              onClick={this.getGamingVideos}
            >
              Retry
            </CustomButton>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderGamingThumbnailSection = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {gamingVideosList} = this.state
        return (
          <CustomContainer
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            width="1550"
            data-testid="gaming"
          >
            <CustomContainer
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              bgColor={isDarkTheme ? '#121212' : '#f9f9f9'}
              width="1550"
              height="15"
              padding="20"
              data-testid="banner"
            >
              <IconContainer>
                <GameIcon />
              </IconContainer>
              <HeadingText color={isDarkTheme ? 'White' : 'Black'}>
                Gaming
              </HeadingText>
            </CustomContainer>
            <ListContainer>
              {gamingVideosList.map(eachItem => (
                <GamingVideoItem thumbnailData={eachItem} key={eachItem.id} />
              ))}
            </ListContainer>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderAllViewsSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderGamingThumbnailSection()
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <CustomContainer height="100">
        <Header />
        <CustomContainer
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <SideNavbar />
          {this.renderAllViewsSection()}
        </CustomContainer>
      </CustomContainer>
    )
  }
}

export default Gaming
