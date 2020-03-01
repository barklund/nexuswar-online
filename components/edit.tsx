import { useContext } from 'react'
import styled from 'styled-components'
import { Faction } from './types'

import Context from './context'

function Edit() {
  const {
    state: { currentNode },
    actions: { updateCurrentNode },
  } = useContext(Context);
  const factions = [
    {id: Faction.Neutral, label: 'Neutral'},
    {id: Faction.Lions, label: 'Lions'},
    {id: Faction.Nightclaw, label: 'Nightclaw'},
    {id: Faction.Steelfire, label: 'Steelfire'},
  ]
  const handleChange = (prop) => (evt) => {
    const value = evt.target.type === 'checkbox' ? evt.target.checked : parseInt(evt.target.value); 
    updateCurrentNode({[prop]: value});
  };
  return (
    <Wrapper>
      <Label>
        Faction:
        <Input as="select" value={currentNode.faction} onChange={handleChange('faction')}>
          {factions.map(({id,label}) => (
            <option value={id}>{label}</option> 
          ))}
        </Input>
      </Label>
      <Label>
        Base?
        <Input type="checkbox" checked={currentNode.hasBase} onChange={handleChange('hasBase')} />
      </Label>
      <Label>
        Soldiers:
        <Input type="number" value={currentNode.soldiers} onChange={handleChange('soldiers')} />
      </Label>
      <Label>
        Tanks:
        <Input type="number" value={currentNode.tanks} onChange={handleChange('tanks')} />
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 180px;
  padding: 10px;
  background: rgba(255,255,255,0.7);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Input = styled.input`
  width: 80px;
  margin-left: 10px;
`

const Label = styled.label`
  color: black;
  display: flex;
  margin-bottom: 7px;
`

export default Edit;
