import styled from 'styled-components'
import { Faction } from '../utils/types'

import steelfire from '../assets/base-steelfire.png'
import nightclaw from '../assets/base-nightclaw.png'
import lions from '../assets/base-lion.png'

function Base({faction}) {
  const imagePath = {
    [Faction.Steelfire]: steelfire,
    [Faction.Nightclaw]: nightclaw,
    [Faction.Lions]: lions,
  }[faction]
  return (
    <Wrapper>
      <Element src={imagePath} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: -10px;
  top: 0px;
  z-index: 1;
`

const Element = styled.img`
  width: 70px;
`

export default Base;
