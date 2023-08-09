import {Component} from 'react'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import {
  CustomContainer,
  FireIcon,
  IconContainer,
  HeadingText,
  ListContainer,
  CustomText,
} from './styledComponent'
import ThemeContext from '../../Context/ThemeContext'
import SavedVideoItem from '../SavedVideoItem'
import {CustomImg} from '../VideoItem/styledComponent'

class SavedVideos extends Component {
  renderSavedVideosSection = () => (
    <ThemeContext.Consumer>
      {value => {
        const {savedVideosList, isDarkTheme} = value
        const shouldShowSavedVideos = savedVideosList.length > 0

        return (
          <CustomContainer
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            width="1550"
            data-testid="savedVideos"
          >
            {shouldShowSavedVideos ? (
              <CustomContainer>
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
                  <HeadingText color={isDarkTheme ? 'white' : 'black'}>
                    Saved Videos
                  </HeadingText>
                </CustomContainer>
                <ListContainer>
                  {savedVideosList.map(eachItem => (
                    <SavedVideoItem
                      thumbnailData={eachItem}
                      key={eachItem.id}
                    />
                  ))}
                </ListContainer>
              </CustomContainer>
            ) : (
              <CustomContainer
                height="100"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginLeft="400"
              >
                <CustomImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  height="400"
                  width="400"
                />
                <HeadingText color={isDarkTheme ? 'white' : '#212121'}>
                  No saved videos found
                </HeadingText>
                <CustomText color={isDarkTheme ? 'white' : '#212121'}>
                  You can save your videos while watching them
                </CustomText>
              </CustomContainer>
            )}
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

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
          {this.renderSavedVideosSection()}
        </CustomContainer>
      </CustomContainer>
    )
  }
}

export default SavedVideos
