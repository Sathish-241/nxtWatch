import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  CustomContainer,
  Logo,
  CustomLabel,
  CustomInput,
  CustomButton,
  FormContainer,
  CustomText,
} from '../styledComponent'
import ThemeContext from '../../Context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderUsername = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {username} = this.state
        return (
          <>
            <CustomLabel
              color={isDarkTheme ? 'white' : '#475569'}
              htmlFor="username"
            >
              USERNAME
            </CustomLabel>
            <br />
            <CustomInput
              type="text"
              placeholder="Username"
              height="40"
              width="400"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <br />
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderPassword = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {password, showPassword} = this.state
        return (
          <>
            <CustomLabel
              color={isDarkTheme ? 'white' : '#475569'}
              htmlFor="password"
            >
              PASSWORD
            </CustomLabel>
            <br />
            <CustomInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              height="40"
              width="400"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderCheckBox = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <CustomContainer display="flex" alignSelf="flex-start">
            <CustomInput
              type="checkbox"
              id="checkbox"
              onChange={this.onToggleCheckbox}
            />
            <CustomLabel
              htmlFor="checkbox"
              color={isDarkTheme ? 'white' : 'black'}
            >
              Show Password
            </CustomLabel>
          </CustomContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoginButton = () => (
    <>
      <CustomButton
        width="390"
        paddingLeft="20"
        paddingRight="20"
        bgColor="blue"
        color="#ffff"
        borderRadius="8"
        height="40"
        fontSize="18"
        marginTop="40"
        type="submit"
      >
        Login
      </CustomButton>
    </>
  )

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      showErrorMsg: true,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <CustomContainer
              height="100"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgColor={isDarkTheme ? '#212121' : 'white'}
            >
              <CustomContainer
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                boxShadow="16"
                padding="20"
                bgColor={isDarkTheme ? 'black' : '#f9f9f9'}
              >
                <Logo
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  marginBottom="100"
                  display="flex"
                />
                <FormContainer onSubmit={this.submitForm}>
                  {this.renderUsername()}
                  {this.renderPassword()}
                  {this.renderCheckBox()}
                  {this.renderLoginButton()}
                  {showErrorMsg && (
                    <CustomText color="red" fontFamily="Roboto">
                      {`* ${errorMsg}`}
                    </CustomText>
                  )}
                </FormContainer>
              </CustomContainer>
            </CustomContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Login
