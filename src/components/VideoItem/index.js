import {formatDistanceToNow} from 'date-fns'
import {
  ListItem,
  DataContainer,
  TextContent,
  CustomImg,
  DotIcon,
  LinkItem,
} from './styledComponent'

const VideoItem = props => {
  const {thumbnailData} = props
  const {
    channel,
    thumbnailUrl,
    publishedAt,
    viewCount,
    title,
    id,
  } = thumbnailData
  const {name, profileImageUrl} = channel
  const formattedDate = formatDistanceToNow(new Date(publishedAt))

  return (
    <LinkItem to={`/videos/${id}`}>
      <ListItem>
        <CustomImg
          src={thumbnailUrl}
          alt="video thumbnail"
          height="200"
          width="400"
        />
        <DataContainer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <CustomImg
            src={profileImageUrl}
            alt="channel logo"
            height="50"
            width="50"
          />
          <DataContainer
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            lineHeight="20"
          >
            <TextContent>{title}</TextContent>
            <TextContent>{name}</TextContent>
            <DataContainer
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              // width="250"
            >
              <TextContent>{`${viewCount}views`}</TextContent>
              <DataContainer
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <DotIcon />
                <TextContent>{formattedDate}</TextContent>
              </DataContainer>
            </DataContainer>
          </DataContainer>
        </DataContainer>
      </ListItem>
    </LinkItem>
  )
}
export default VideoItem
