import { useState, useCallback } from 'react'
import Context from './context'
import { Faction, NodeType } from './types'

const START_NODES:Array<NodeType> = [
  {id: -1, row: 1, col: 4, faction: Faction.Nightclaw, hasBase: true},
  {id: 1, row: 2, col: 3},
  {id:  2, row: 2, col: 4},
  {id:  3, row: 2, col: 5},
  {id:  7, row: 3, col: 2},
  {id:  4, row: 3, col: 3},
  {id:  5, row: 3, col: 4, faction: Faction.Nightclaw, hasBase: true, tanks: 8, soldiers: 6},
  {id:  6, row: 3, col: 5},
  {id: 10, row: 3, col: 6},
  {id: 11, row: 4, col: 2, faction: Faction.Steelfire, hasBase: true, tanks: 1, soldiers: 9},
  {id:  8, row: 4, col: 3},
  {id:  0, row: 4, col: 4},
  {id:  9, row: 4, col: 5},
  {id: 15, row: 4, col: 6, faction: Faction.Lions, hasBase: true, tanks: 17, soldiers: 1},
  {id: 16, row: 5, col: 1},
  {id: 17, row: 5, col: 2},
  {id: 12, row: 5, col: 3},
  {id: 13, row: 5, col: 4},
  {id: 14, row: 5, col: 5, faction: Faction.Lions, soldiers: 1},
  {id: 21, row: 5, col: 6, faction: Faction.Lions, soldiers: 1},
  {id: 22, row: 5, col: 7},
  {id: -3, row: 6, col: 1, faction: Faction.Steelfire, hasBase: true, tanks: 1},
  {id: 23, row: 6, col: 2},
  {id: 18, row: 6, col: 3},
  {id: 19, row: 6, col: 4},
  {id: 20, row: 6, col: 5, faction: Faction.Lions, soldiers: 1},
  {id: 24, row: 6, col: 6},
  {id: -2, row: 6, col: 7, faction: Faction.Lions, hasBase: true},
]

function Provider({config, onConfig, children}) {
  const [nodes, setNodes] = useState(START_NODES);
  const [showNumbers, setShowNumbers] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);

  const currentNode = currentNodeIndex < 0 ? null : nodes[currentNodeIndex];

  const setCurrentNodeById = useCallback(
    (desiredId) =>
      setCurrentNodeIndex(nodes.findIndex(({id}) => id === desiredId) ?? -1),
    [],
  );

  const clearCurrentNode = useCallback(
    () => setCurrentNodeIndex(-1),
    [],
  );

  const updateCurrentNode = useCallback(
    (attrs) => {
      if (currentNodeIndex < 0) {
        return;
      }
    
      setNodes((oldNodes) => [
        ...oldNodes.slice(0, currentNodeIndex),
        {
          ...nodes[currentNodeIndex],
          ...attrs,
        },
        ...oldNodes.slice(currentNodeIndex + 1),
      ])
    },
    [currentNodeIndex],
  )
  const value = {
    state: {
      nodes,
      showNumbers,
      currentNode,
    },
    actions: {
      toggleNumbers: setShowNumbers,
      setCurrentNodeById,
      updateCurrentNode,
      clearCurrentNode,
    }
  };
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Provider;
