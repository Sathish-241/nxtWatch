import styled from 'styled-components'
import {SiYoutubegaming} from 'react-icons/si'

export const CustomContainer = styled.div`
  height: ${props => props.height}vh;
  width: ${props => props.width}px;
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  background-color: ${props => props.bgColor};
  padding: ${props => props.padding}px;
`

export const TextContent = styled.p``

export const GameIcon = styled(SiYoutubegaming)`
  color: red;
  height: 40px;
  width: 40px;
`
export const IconContainer = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  margin-right: 20px;
`
export const HeadingText = styled.h1`
  color: ${props => props.color};
  font-family: Roboto;
`
export const ListContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`
