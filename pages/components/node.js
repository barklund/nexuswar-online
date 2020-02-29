
import styled from 'styled-components'

const LEFT_SPACING = (634-72)/6;
const LEFT_START = 73 - LEFT_SPACING;
const TOP_SPACING = 192-84.3;
const TOP_START = 85-TOP_SPACING*1.5;
const TOP_OFFSET_ODD = 0;
const TOP_OFFSET_EVEN = TOP_SPACING / 2;

function Node({id, row, col}) {
  const number = id?.startsWith('position') ? parseInt(id.substr(8)) : null
  const left = LEFT_START + col * LEFT_SPACING
  const top = TOP_START + row * TOP_SPACING + (col % 2 ? TOP_OFFSET_ODD : TOP_OFFSET_EVEN)
  return (
    <Background left={left} top={top} color={number ? 'rgba(255,255,0,0.3)' : 'transparent'}>
      {number}
    </Background>
  )
}

const Background = styled.div.attrs(({left, top}) => ({
  style: {
    left: `${left}px`,
    top: `${top}px`,
  }
}))`
  position: absolute;
  background: ${({color}) => color};
  width: 56px;
  margin-left: -28px;
  height: 98px;
  margin-top: -49px;
  text-align: center;
  font-size: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-text-stroke: 3px black;

  &::before, &::after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    border-width: 49px 27px;

  }

  &::before {
    border-right-color: ${({color}) => color};
    right: 100%;
  }

  &::after {
    border-left-color: ${({color}) => color};
    left: 100%;
  }
`

export default Node;
