import styled from 'styled-components'
import { useContext } from 'react'

import MapPNG from './assets/map.png'
import Node from './node'
import Settings from './settings'
import Context from './context'

function Map() {
  const { state: { nodes }, actions: { clearCurrentNode }} = useContext(Context);
  return (
    <Wrapper>
      <Background onClick={() => clearCurrentNode()} />
      <Settings />
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  width: 720px;
  height: 720px;
`

const Background = styled.section`
  background-image: url(${MapPNG});
  position: absolute;
  width: 720px;
  height: 720px;
  background-size: contain;
`

export default Map;
