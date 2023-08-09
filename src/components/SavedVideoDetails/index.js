import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ThemeContext from '../../Context/ThemeContext'

import Header from '../Header'
import {
  CustomContainer,
  Player,
  CustomText,
  LikeIcon,
  DisLikeIcon,
  PlayListIcon,
  HrLine,
} from './styledComponent'
import {Logo, CustomButton, HeadingText} from '../styledComponent'

import {DotIcon, CustomImg} from '../VideoItem/styledComponent'
import SideNavbar from '../SideNavbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideoDetails extends Component {
  state = {
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedVideoDetails = {
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImgUrl: data.video_details.channel.profile_image_url,
        id: data.video_details.id,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      this.setState({
        videoDetails: updatedVideoDetails,
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
              onClick={this.getVideoItemDetails}
            >
              Retry
            </CustomButton>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  onLikeVideo = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onDislikeVideo = () => {
    this.setState(prevState => ({
      isLiked: false,
      isDisliked: !prevState.isDisliked,
    }))
  }

  renderVideoItemDetails = () => (
    <ThemeContext.Consumer>
      {value => {
        const {videoDetails, isLiked, isDisliked, isSaved} = this.state
        const {
          description,
          publishedAt,
          title,
          subscriberCount,
          profileImgUrl,
          videoUrl,
          name,
          id,
          viewCount,
          thumbnailUrl,
        } = videoDetails
        const {addToSavedVideos, removeFromSavedVideos, isDarkTheme} = value

        const onSaveToList = () => {
          addToSavedVideos({...videoDetails}, isSaved, id, thumbnailUrl)
          this.setState({
            isSaved: true,
          })
        }

        const onRemoveItem = () => {
          removeFromSavedVideos(id)
          this.setState({
            isSaved: false,
          })
        }

        return (
          <CustomContainer
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding="20"
            height="100"
            flexGrow="1"
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            color="white"
            data-testid="videoItemDetails"
          >
            <Player url={videoUrl} width="100%" />
            <CustomText color={isDarkTheme ? 'white' : 'black'}>
              {title}
            </CustomText>
            <CustomContainer
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              width="1500"
            >
              <CustomContainer
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                width="200"
                color=" #909090"
              >
                <CustomText>{`${viewCount} views`}</CustomText>
                <DotIcon />
                <CustomText>{publishedAt}</CustomText>
              </CustomContainer>
              <CustomContainer
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                width="400"
              >
                <CustomButton
                  type="button"
                  bgColor="transparent"
                  height="50"
                  width="150"
                  border="0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  color={isLiked ? '#2563eb' : '#64748b'}
                  onClick={this.onLikeVideo}
                >
                  <LikeIcon /> <CustomText>Like</CustomText>
                </CustomButton>
                <CustomButton
                  type="button"
                  bgColor="transparent"
                  height="50"
                  width="150"
                  border="0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  color={isDisliked ? '#2563eb' : '#64748b'}
                  onClick={this.onDislikeVideo}
                >
                  <DisLikeIcon /> <CustomText>Dislike</CustomText>
                </CustomButton>
                <CustomButton
                  type="button"
                  bgColor="transparent"
                  height="50"
                  width="150"
                  border="0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  color={isSaved ? '' : '#909090'}
                  onClick={onSaveToList}
                >
                  <PlayListIcon /> <CustomText>Save</CustomText>
                </CustomButton>
                <CustomButton
                  type="button"
                  bgColor="transparent"
                  height="50"
                  width="150"
                  border="0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  color={isSaved ? 'blue' : ''}
                  onClick={onRemoveItem}
                >
                  <PlayListIcon /> <CustomText>Saved</CustomText>
                </CustomButton>
              </CustomContainer>
            </CustomContainer>
            <HrLine />
            <CustomContainer
              display="flex"
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <CustomImg
                src={profileImgUrl}
                height="50"
                width="50"
                marginRight="20"
              />
              <CustomContainer
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <CustomContainer>
                  <CustomText>{name}</CustomText>
                  <CustomText color=" #909090">
                    {subscriberCount} subscribers
                  </CustomText>
                </CustomContainer>
                <CustomText>{description}</CustomText>
              </CustomContainer>
            </CustomContainer>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderAllViewsSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderVideoItemDetails()
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
          justifyContent="space-between"
          alignItems="flex-start"
          height="100"
        >
          <SideNavbar />
          {this.renderAllViewsSection()}
        </CustomContainer>
      </CustomContainer>
    )
  }
}
export default SavedVideoDetails
