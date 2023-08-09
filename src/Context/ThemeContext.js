import React from 'react'

const ThemeContext = React.createContext({
  savedVideosList: [],
  isDarkTheme: false,
  isSaved: false,
  addToSavedVideos: () => {},
  removeFromSavedVideos: () => {},
  onChangeTheme: () => {},
})
export default ThemeContext
