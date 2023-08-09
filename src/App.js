import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ThemeContext from './Context/ThemeContext'
import NotFound from './components/NotFound'
// Replace your code here
class App extends Component {
  state = {
    savedVideosList: [],
    isDarkTheme: false,
  }

  onChangeTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addToSavedVideos = videoDetails => {
    console.log(videoDetails)
    const {savedVideosList} = this.state
    const updatedList = [...savedVideosList, videoDetails]
    this.setState({
      savedVideosList: updatedList,
    })
  }

  removeItem = id => {
    this.setState(prevState => ({
      savedVideosList: prevState.savedVideosList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  render() {
    const {savedVideosList, isDarkTheme} = this.state
    // console.log(savedVideosList)

    return (
      <ThemeContext.Provider
        value={{
          savedVideosList,
          isDarkTheme,
          onChangeTheme: this.onChangeTheme,
          addToSavedVideos: this.addToSavedVideos,
          removeFromSavedVideos: this.removeItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}
export default App
