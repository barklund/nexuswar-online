import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Faction } from './types'

import Context from './context'

const MAX = 80;

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
    {id: Faction.Insectoids, label: 'Insectoids'},
  ]
  const handleChange = (prop) => (evt) => {
    const value = evt.target.type === 'checkbox' ? evt.target.checked : Math.max(0, Math.min(MAX, parseInt(evt.target.value)));
    updateCurrentNode({[prop]: value});
  };
  useEffect(() => {
    if (currentNode.faction === Faction.Insectoids) {
      updateCurrentNode({hasBase: false, tanks: 0});
    }
  }, [currentNode.faction])
  return (
    <Wrapper>
      <Label>
        Faction:
        <Input as="select" value={currentNode.faction} onChange={handleChange('faction')}>
          {factions.map(({id,label}) => (
            <option key={id} value={id}>{label}</option> 
          ))}
        </Input>
      </Label>
      {currentNode.faction !== Faction.Insectoids && (
        <>
          <Label>
            Base?
            <Input type="checkbox" checked={currentNode.hasBase} onChange={handleChange('hasBase')} />
          </Label>
          <Label>
            Soldiers:
            <Input type="number" max={MAX} value={currentNode.soldiers} onChange={handleChange('soldiers')} />
          </Label>
          <Label>
            Tanks:
            <Input type="number" max={MAX} value={currentNode.tanks} onChange={handleChange('tanks')} />
          </Label>
        </>
      )}
      {currentNode.faction === Faction.Insectoids && (
        <Label>
          Bugs:
          <Input type="number" max={MAX} value={currentNode.soldiers} onChange={handleChange('soldiers')} />
        </Label>
      )}
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
