import {
  ListItem,
  Thumbnail,
  DataContainer,
  TextContent,
  LinkItem,
} from './styledComponent'
import ThemeContext from '../../Context/ThemeContext'

const GamingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const {thumbnailData} = props
      const {title, thumbnailUrl, viewCount, id} = thumbnailData

      return (
        <LinkItem to={`/videos/${id}`}>
          <ListItem>
            <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
            <DataContainer>
              <TextContent color={isDarkTheme ? 'white' : 'black'}>
                {title}
              </TextContent>

              <TextContent>{viewCount} Watching worldWide</TextContent>
            </DataContainer>
          </ListItem>
        </LinkItem>
      )
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoItem
