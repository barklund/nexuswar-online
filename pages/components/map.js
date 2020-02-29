
import styled from 'styled-components'

import MapPNG from '../assets/map.png'
import Node from './node'

const nodes = [
  {id: 'nightclaw ', row: 1, column: 4},
  {id: 'position1 ', row: 2, column: 3},
  {id: 'position2 ', row: 2, column: 4},
  {id: 'position3 ', row: 2, column: 5},
  {id: 'position7 ', row: 3, column: 2},
  {id: 'position4 ', row: 3, column: 3},
  {id: 'position5 ', row: 3, column: 4},
  {id: 'position6 ', row: 3, column: 5},
  {id: 'position10', row: 3, column: 6},
  {id: 'position11', row: 4, column: 2},
  {id: 'position8 ', row: 4, column: 3},
  {id: 'nexus     ', row: 4, column: 4},
  {id: 'position9 ', row: 4, column: 5},
  {id: 'position15', row: 4, column: 6},
  {id: 'position16', row: 5, column: 1},
  {id: 'position17', row: 5, column: 2},
  {id: 'position12', row: 5, column: 3},
  {id: 'position13', row: 5, column: 4},
  {id: 'position14', row: 5, column: 5},
  {id: 'position21', row: 5, column: 6},
  {id: 'position22', row: 5, column: 7},
  {id: 'steelfire ', row: 6, column: 1},
  {id: 'position23', row: 6, column: 2},
  {id: 'position18', row: 6, column: 3},
  {id: 'position19', row: 6, column: 4},
  {id: 'position20', row: 6, column: 5},
  {id: 'position24', row: 6, column: 6},
  {id: 'lions     ', row: 6, column: 7},
]

function NexusMap({config, onConfig}) {
  return (
    <Background>
      {nodes.map(({id,row,column}) => (
        <Node key={id} id={id} row={row} col={column} />
      ))}
    </Background>
  )
}

const Background = styled.section`
  background-image: url(${MapPNG});
  position: relative;
  width: 720px;
  height: 720px;
  background-size: contain;
`

export default NexusMap;
