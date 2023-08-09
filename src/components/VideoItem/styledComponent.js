import styled from 'styled-components'
import {BsDot} from 'react-icons/bs'
import {Link} from 'react-router-dom'

export const ListItem = styled.li`
  margin: 10px;
  width: 400px;
  text-decoration: none;
`

export const DataContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  width: ${props => props.width}px;
  margin-top: 0px;
  padding-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  line-height: ${props => props.lineHeight}px;
`

export const TextContent = styled.p`
  font-family: Roboto;
  margin: 10px;
`

export const CustomImg = styled.img`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  margin-right: ${props => props.marginRight}px;
`
export const DotIcon = styled(BsDot)``

export const LinkItem = styled(Link)`
  text-decoration: none;
`
