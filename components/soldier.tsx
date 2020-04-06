import styled from 'styled-components'
import { Faction } from './types'

import steelfire from './assets/soldier-steelfire.png'
import nightclaw from './assets/soldier-nightclaw.png'
import lions from './assets/soldier-lion.png'
import neutral from './assets/soldier.png'
import insectoids from './assets/insectoids.png'

function Soldier({faction, count, isCentered}) {
  const imagePath = {
    [Faction.Steelfire]: steelfire,
    [Faction.Nightclaw]: nightclaw,
    [Faction.Lions]: lions,
    [Faction.Insectoids]: insectoids,
  }[faction] || neutral
  return (
    <Wrapper isCentered={isCentered}>
      <Element faction={faction} src={imagePath} />
      {count > 1 && <Text>{count}</Text>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: ${({isCentered}) => isCentered ? 34 : 7}px;
  top: ${({isCentered}) => isCentered ? 12 : 20}px;
  z-index: 1;
  pointer-events: none;
`

const Element = styled.img`
  width: ${({faction}) => faction === Faction.Insectoids ? 80 : 45}px;
  position: relative;
  left: ${({faction}) => faction === Faction.Insectoids ? -25 : 0}px;
  top: ${({faction}) => faction === Faction.Insectoids ? 5 : 0}px;
`

const Text = styled.span`
  position: absolute;
  text-align: center;
  font-size: 40px;
  color: white;
  left: -30px;
  width: 105px;
  top: 20px;
  font-style: italic;
  font-weight: 900;
  -webkit-text-stroke: 3px black;
`

export default Soldier;
