import styled from 'styled-components'
import {BsDot} from 'react-icons/bs'
import {Link} from 'react-router-dom'

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 20px;
`

export const Thumbnail = styled.img`
  height: 300px;
  width: 200px;
  margin-bottom: 20px;
`

export const DataContainer = styled.div`
  font-family: roboto;
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  width: ${props => props.width}px;
`

export const HeadingText = styled.h1`
  color: ${props => props.color};
  font-size: 18px;
`

export const TextContent = styled.p`
  color: #909090;
`
export const DotIcon = styled(BsDot)`
  color: #909090;
`
export const LinkItem = styled(Link)`
  text-decoration: none;
`
