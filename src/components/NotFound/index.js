import {Component} from 'react'

import Header from '../Header'
import SideNavbar from '../SideNavbar'

import {CustomContainer, HeadingText} from './styledComponent'
import {Logo, CustomText} from '../styledComponent'
import ThemeContext from '../../Context/ThemeContext'

class NotFound extends Component {
  renderNotFoundView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <CustomContainer
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            padding="20"
            width="1550"
            height="100"
            data-testid="not found"
          >
            <Logo
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
              }
              alt="not found"
              height="500"
              width="500"
            />
            <HeadingText color={isDarkTheme ? 'white' : '#212121'}>
              Page Not Found
            </HeadingText>
            <CustomText color={isDarkTheme ? 'white' : '#212121'}>
              we are sorry, the page you requested could not be found.
            </CustomText>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

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
          {this.renderNotFoundView()}
        </CustomContainer>
      </CustomContainer>
    )
  }
}

export default NotFound
