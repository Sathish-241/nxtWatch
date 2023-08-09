import styled from 'styled-components'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {GrFormClose} from 'react-icons/gr'
import {BsSearch} from 'react-icons/bs'

export const CustomContainer = styled.div`
  height: ${props => props.height}vh;
  width: ${props => props.width}px;
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  align-self: ${props => props.alignSelf};
  box-shadow: ${props => props.boxShadow}px;
  padding-left: ${props => props.paddingLeft}px;
  padding-right: ${props => props.paddingRight}px;
  padding-top: ${props => props.paddingTop}px;
  background-image: url(${props => props.bgImg});
  background-size: ${props => props.backgroundSize};
  background-position: ${props => props.backgroundPosition};
  background-color: ${props => props.bgColor};
  margin-top: ${props => props.marginTop}px;
  margin-left: ${props => props.marginLeft}px;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: ${props => props.padding}px;
`
export const Logo = styled.img`
  margin-bottom: ${props => props.marginBottom}px;
  display: ${props => props.display};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  margin-right: ${props => props.marginRight}px;
`

export const CustomLabel = styled.label`
  font-family: 'Roboto';
  font-weight: 400;
  color: ${props => props.color};
  margin-bottom: 5px;
  align-self: flex-start;
`

export const CustomInput = styled.input`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  margin-bottom: 20px;
  padding-left: 10px;
  align-self: flex-start;
  outline: none;
`
export const CustomButton = styled.button`
  border: ${props => props.border}px;
  border-style: ${props => props.borderStyle};
  border-color: ${props => props.borderColor};
  font-weight: ${props => props.fontWeight};
  border-radius: ${props => props.borderRadius}px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  font-size: ${props => props.fontSize}px;
  margin-top: ${props => props.marginTop}px;
  cursor: pointer;
  outline: none;
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`
export const FormContainer = styled.form``

export const HomeIcon = styled(AiFillHome)`
  color: ${props => (props.isActive ? 'red' : '')};
  height: 25px;
  width: 25px;
  margin-right: 30px;
`

export const FireIcon = styled(HiFire)`
  color: ${props => (props.isActive ? 'red' : '')};
  height: 25px;
  width: 25px;
  margin-right: 30px;
`

export const GameIcon = styled(SiYoutubegaming)`
  color: ${props => (props.isActive ? 'red' : '')};
  height: 25px;
  width: 25px;
  margin-right: 30px;
`
export const AddListIcon = styled(MdPlaylistAdd)`
  color: ${props => (props.isActive ? 'red' : '')};
  height: 25px;
  width: 25px;
  margin-right: 30px;
`
export const CloseIcon = styled(GrFormClose)`
  height: 25px;
  width: 25px;
  align-self: ${props => props.alignSelf};
`

export const SearchIcon = styled(BsSearch)`
  height: 20px;
  width: 50px;
`

export const CustomText = styled.p`
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  width: ${props => props.width}px;
`
export const NavContainer = styled.nav`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`
export const InputField = styled.input`
  height: 100%;
  width: 70%;
  border: 1px solid #cbd5e1;
  padding-left: 10px;
  outline: none;
  background-color: ${props => props.bgColor};
`
export const InputFieldContainer = styled.div`
  height: 30px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${props => props.bgColor};
`
export const ListContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0px;
`
export const HeadingText = styled.h1``

export const ProfileImg = styled.img`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`
