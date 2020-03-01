import { useContext } from 'react'
import styled from 'styled-components'

import Context from './context'

function Settings() {
  const {
    state: { showNumbers },
    actions: { toggleNumbers },
  } = useContext(Context);
  return (
    <Wrapper>
      <Label>
        <Checkbox checked={showNumbers} onChange={(evt) => toggleNumbers(evt.target.checked)} />
        Show numbers
       </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 180px;
  padding: 10px;
  background: rgba(255,255,255,0.7);
`

const Checkbox = styled.input.attrs({
  type: 'checkbox',
  value: 'on',
})`
  margin-right: 10px;
`

const Label = styled.label`
  color: black;
  display: flex;
`

export default Settings;
