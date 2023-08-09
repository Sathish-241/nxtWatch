import {Link} from 'react-router-dom'
import {
  CustomContainer,
  NavContainer,
  HomeIcon,
  FireIcon,
  GameIcon,
  AddListIcon,
  CustomText,
  Logo,
  ListContainer,
} from '../styledComponent'
import ThemeContext from '../../Context/ThemeContext'
import {ListItem} from '../VideoItem/styledComponent'

const SideNavbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      return (
        <CustomContainer
          height="90"
          width="350"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexDirection="column"
          paddingLeft="30"
          paddingTop="50"
          bgColor={isDarkTheme ? '#212121' : 'white'}
        >
          <NavContainer
            height="200"
            width="300"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            color={isDarkTheme ? 'white' : '#00306e'}
          >
            <ListContainer>
              <Link to="/" className="nav-link">
                <ListItem
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={isDarkTheme ? 'white' : '#00306e'}
                >
                  <HomeIcon />
                  Home
                </ListItem>
              </Link>
              <Link to="/trending" className="nav-link">
                <ListItem
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={isDarkTheme ? 'white' : '#00306e'}
                >
                  <FireIcon />
                  Trending
                </ListItem>
              </Link>
              <Link to="/gaming" className="nav-link">
                <ListItem
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={isDarkTheme ? 'white' : '#00306e'}
                >
                  <GameIcon />
                  Gaming
                </ListItem>
              </Link>
              <Link to="/saved-videos" className="nav-link">
                <ListItem
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={isDarkTheme ? 'white' : '#00306e'}
                >
                  <AddListIcon />
                  Saved Videos
                </ListItem>
              </Link>
            </ListContainer>
          </NavContainer>
          <CustomContainer width="250">
            <CustomText
              color={isDarkTheme ? 'white' : '#00306e'}
              fontSize="22"
              fontWeight="500"
              fontFamily="Roboto"
            >
              Contact us
            </CustomText>
            <CustomContainer
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Logo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                height="50"
                width="50"
                marginRight="20"
              />
              <Logo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                height="50"
                width="50"
                marginRight="20"
              />
              <Logo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                alt="linked in logo"
                height="50"
                width="50"
                marginRight="20"
              />
            </CustomContainer>
            <CustomText
              color={isDarkTheme ? 'white' : '#00306e'}
              fontSize="20"
              fontWeight="400"
              fontFamily="Roboto"
            >
              Enjoy! Now to see your channels and recommendations!
            </CustomText>
          </CustomContainer>
        </CustomContainer>
      )
    }}
  </ThemeContext.Consumer>
)
export default SideNavbar
