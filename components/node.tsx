import styled from 'styled-components'
import { Faction, NodeType } from './types'
import Base from './base'
import Tank from './tank'
import Soldier from './soldier'

const LEFT_SPACING = (634-72)/6;
const LEFT_START = 73 - LEFT_SPACING;
const TOP_SPACING = 192-84.3;
const TOP_START = 85-TOP_SPACING*1.5;
const TOP_OFFSET_ODD = 0;
const TOP_OFFSET_EVEN = TOP_SPACING / 2;

function getColor({id, hasBase, faction}:NodeType):string {
  if (id <= 0 || !hasBase) {
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
  const {id, row, col, hasBase, tanks, soldiers, faction} = node
  const number = id > 0 ? id : null
  const left = LEFT_START + col * LEFT_SPACING
  const top = TOP_START + row * TOP_SPACING + (col % 2 ? TOP_OFFSET_ODD : TOP_OFFSET_EVEN)

  const hasSoldiers = soldiers > 0;
  const hasTanks = tanks > 0;
  const showBase = hasBase && id >= 0;
  return (
    <Background left={left} top={top} color={getColor(node)}>
      {showBase && <Base faction={faction} />}
      {hasTanks && <Tank faction={faction} count={tanks} />}
      {hasSoldiers && <Soldier faction={faction} count={soldiers} isCentered={!hasTanks} />}
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
  padding-top: 12px;
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
