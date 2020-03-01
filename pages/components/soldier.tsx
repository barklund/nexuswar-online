import styled from 'styled-components'
import { Faction } from '../types'

import steelfire from '../assets/soldier-steelfire.png'
import nightclaw from '../assets/soldier-nightclaw.png'
import lions from '../assets/soldier-lion.png'

function Soldier({faction, count, isCentered}) {
  const imagePath = {
    [Faction.Steelfire]: steelfire,
    [Faction.Nightclaw]: nightclaw,
    [Faction.Lions]: lions,
  }[faction]
  return (
    <Wrapper isCentered={isCentered}>
      <Element src={imagePath} />
      {count > 1 && <Text>{count}</Text>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: ${({isCentered}) => isCentered ? 7 : -20}px;
  top: ${({isCentered}) => isCentered ? 12 : 20}px;
  z-index: 1;
`

const Element = styled.img`
  width: 45px;
`

const Text = styled.span`
  position: absolute;
  text-align: center;
  font-size: 40px;
  color: white;
  left: 10px;
  top: 20px;
  font-style: italic;
  font-weight: 900;
  -webkit-text-stroke: 3px black;
`

export default Soldier;
