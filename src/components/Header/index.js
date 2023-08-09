import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'
import Cookies from 'js-cookie'
import ThemeContext from '../../Context/ThemeContext'

import {
  CustomContainer,
  Logo,
  CustomButton,
  CustomText,
  ProfileImg,
} from '../styledComponent'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, onChangeTheme} = value
        const changeTheme = () => {
          onChangeTheme()
        }

        return (
          <CustomContainer
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingLeft="50"
            paddingRight="50"
            height="10"
            bgColor={isDarkTheme ? ' #212121' : 'white'}
          >
            <Link to="/">
              <Logo
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
                height="50"
                width="200"
              />
            </Link>
            <CustomContainer
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="200"
            >
              <CustomButton
                border="0"
                bgColor="transparent"
                onClick={changeTheme}
                data-testid="theme"
              >
                {isDarkTheme ? (
                  <BiSun className="sun-icon" />
                ) : (
                  <FaMoon className="moon-icon" />
                )}
              </CustomButton>
              <ProfileImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                height="30"
                width="30"
              />
              <Popup
                trigger={
                  <CustomButton
                    border="2"
                    borderStyle="solid"
                    borderColor={isDarkTheme ? 'white' : '#4f46e5'}
                    color={isDarkTheme ? 'white' : '#4f46e5'}
                    bgColor="transparent"
                    fontWeight="700"
                    height="30"
                    width="80"
                  >
                    Logout
                  </CustomButton>
                }
                modal
                position="center center"
              >
                {close => (
                  <CustomContainer
                    bgColor={isDarkTheme ? '#212121' : ' #f4f4f4'}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    padding="20"
                    width="500"
                    height="30"
                  >
                    <CustomText color={isDarkTheme ? 'white' : '#212121'}>
                      Are you sure, you want to Logout?
                    </CustomText>
                    <CustomContainer
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      width="200"
                    >
                      <CustomButton
                        onClick={close}
                        bgColor="transparent"
                        border="1"
                        borderStyle="solid"
                        borderColor="#7e858e"
                        color="#7e858e"
                        height="30"
                        width="80"
                        borderRadius="8"
                      >
                        Cancel
                      </CustomButton>
                      <CustomButton
                        onClick={onClickLogout}
                        bgColor="blue"
                        border="0"
                        color="white"
                        height="30"
                        width="80"
                        borderRadius="8"
                      >
                        Confirm
                      </CustomButton>
                    </CustomContainer>
                  </CustomContainer>
                )}
              </Popup>
            </CustomContainer>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Header)
