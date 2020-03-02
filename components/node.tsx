import styled from 'styled-components'
import { useContext } from 'react'

import { Faction, NodeType } from './types'
import Base from './base'
import Tank from './tank'
import Soldier from './soldier'
import Context from './context'

const LEFT_SPACING = (634-72)/6;
const LEFT_START = 73 - LEFT_SPACING;
const TOP_SPACING = 192-84.3;
const TOP_START = 85-TOP_SPACING*1.5;
const TOP_OFFSET_ODD = 0;
const TOP_OFFSET_EVEN = TOP_SPACING / 2;

function getColor({id, hasBase, faction}:NodeType, isSelected:boolean):string {
  if (isSelected) {
    return 'rgba(37, 255, 37, .5)';
  }
  if (id >= 50 || !hasBase) {
    return 'transparent';
  }
  switch (faction) {
    case Faction.Lions:
      return 'rgba(255, 41, 187, .5)';
    case Faction.Steelfire:
      return 'rgba(50, 0, 214, .5)';
    case Faction.Nightclaw:
      return 'rgba(118, 0, 122, .5)';
    default:
      return 'transparent';
  }
}

function Node({node}) {
  const {
    state: { showNumbers, currentNode },
    actions: { setCurrentNodeById },
  } = useContext(Context);
  const {id, row, col, hasBase, tanks, soldiers, faction} = node
  const number = showNumbers && id < 50 ? id : null
  const left = LEFT_START + col * LEFT_SPACING
  const top = TOP_START + row * TOP_SPACING + (col % 2 ? TOP_OFFSET_ODD : TOP_OFFSET_EVEN)

  const hasSoldiers = soldiers > 0;
  const hasTanks = tanks > 0;
  const showBase = hasBase && id <= 50;
  const isSelected = currentNode === node;

  const handleClick = () => setCurrentNodeById(id)
  return (
    <Wrapper left={left} top={top}>
      <Background color={getColor(node, isSelected)} onClick={handleClick} />
      {showBase && <Base faction={faction} />}
      {hasTanks && <Tank faction={faction} count={tanks} />}
      {hasSoldiers && <Soldier faction={faction} count={soldiers} isCentered={!hasTanks} />}
      {number && <Number>{number}</Number>}
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs(({left, top}) => ({
  style: {
    left: `${left}px`,
    top: `${top}px`,
  }
}))`
  position: absolute;
  width: 110px;
  margin-left: -55px;
  height: 98px;
  margin-top: -49px;
`

const Background = styled.div`
  position: absolute;
  background: ${({color}) => color};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  clip-path: polygon(27px 0px,83px 0px,110px 49px,83px 98px,27px 98px,0px 49px);
  cursor: pointer;
`

const Number = styled.div`
  position: absolute;
  pointer-events: none;
  left: -30px;
  top: 10px;
  right: -30px;
  bottom: 0;
  font-size: 64px;
  font-style: italic;
  text-align: center;
  opacity: 0.4;
  color: rgba(255,255,0);
  -webkit-text-stroke: 3px rgba(0,0,0);
  z-index: 2;
`

export default Node;
