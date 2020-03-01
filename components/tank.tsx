import styled from 'styled-components'
import { Faction } from './types'

import steelfire from './assets/tank-steelfire.png'
import nightclaw from './assets/tank-nightclaw.png'
import lions from './assets/tank-lion.png'

function Tank({faction, count}) {
  const imagePath = {
    [Faction.Steelfire]: steelfire,
    [Faction.Nightclaw]: nightclaw,
    [Faction.Lions]: lions,
  }[faction]
  return (
    <Wrapper>
      <Element src={imagePath} />
      {count > 1 && <Text>{count}</Text>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: -10px;
  bottom: -15px;
  z-index: 1;
`

const Element = styled.img`
  width: 95px;
`

const Text = styled.span`
  position: absolute;
  text-align: center;
  font-size: 40px;
  color: white;
  right: 30px;
  bottom: 13px;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -.1em;
  -webkit-text-stroke: 3px black;
`

export default Tank;
