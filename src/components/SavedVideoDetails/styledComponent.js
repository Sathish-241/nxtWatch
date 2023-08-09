import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

export const CustomContainer = styled.div`
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  height: ${props => props.height}vh;
  width: ${props => props.width}px;
  //   border: 1px solid blue;
  padding: ${props => props.padding}px;
  flex-grow: ${props => props.flexGrow};
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  font-family: Roboto;
`

export const Player = styled(ReactPlayer)`
  url: ${props => props.url};
  background-size: cover;
  background-position: center;
`

export const CustomText = styled.p`
  color: ${props => props.color};
`

export const LikeIcon = styled(BiLike)`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

export const DisLikeIcon = styled(BiDislike)`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

export const PlayListIcon = styled(MdPlaylistAdd)`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

export const HrLine = styled.hr`
  width: 100%;
`
