import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import SideNavbar from '../SideNavbar'

import {
  CustomContainer,
  FireIcon,
  IconContainer,
  HeadingText,
  ListContainer,
} from './styledComponent'
import {Logo, CustomText, CustomButton} from '../styledComponent'
import TrendingVideoItem from '../TrendingVideoItem'
import ThemeContext from '../../Context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingVideosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      const formattedTrendingVideosList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
        channel: {
          name: eachItem.channel.name,
          profileImgUrl: eachItem.channel.profile_image_url,
        },
      }))

      this.setState({
        trendingVideosList: formattedTrendingVideosList,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
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
              onClick={this.getTrendingVideos}
            >
              Retry
            </CustomButton>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderTrendingVideosSection = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {trendingVideosList} = this.state
        return (
          <CustomContainer
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            width="1550"
            data-testid="trending"
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
                <FireIcon />
              </IconContainer>
              <HeadingText color={isDarkTheme ? 'White' : 'Black'}>
                Trending
              </HeadingText>
            </CustomContainer>
            <ListContainer>
              {trendingVideosList.map(eachItem => (
                <TrendingVideoItem thumbnailData={eachItem} key={eachItem.id} />
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
        return this.renderTrendingVideosSection()
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
      <CustomContainer>
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

export default Trending
