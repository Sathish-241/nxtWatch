import {formatDistanceToNow} from 'date-fns'
import {
  ListItem,
  Thumbnail,
  DataContainer,
  HeadingText,
  TextContent,
  DotIcon,
  LinkItem,
} from './styledComponent'
import ThemeContext from '../../Context/ThemeContext'

const TrendingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {thumbnailData} = props
      const {
        title,
        thumbnailUrl,
        publishedAt,
        viewCount,
        id,
        channel,
      } = thumbnailData
      const {name} = channel
      const formattedDate = formatDistanceToNow(new Date(publishedAt))

      return (
        <LinkItem to={`/videos/${id}`}>
          <ListItem>
            <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
            <DataContainer>
              <TextContent color={isDarkTheme ? 'white' : 'black'}>
                {title}
              </TextContent>
              <TextContent>{name}</TextContent>
              <DataContainer
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="200"
              >
                <TextContent>{viewCount} views</TextContent>
                <DotIcon />
                <TextContent>{formattedDate}</TextContent>
              </DataContainer>
            </DataContainer>
          </ListItem>
        </LinkItem>
      )
    }}
  </ThemeContext.Consumer>
)

export default TrendingVideoItem
