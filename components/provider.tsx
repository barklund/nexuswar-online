import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import Context from './context'
import { Faction, NodeType } from './types'
import { pack, unpack } from './utils/pack'

const START_NODES:Array<NodeType> = [
  {id: 51, row: 1, col: 4, faction: Faction.Nightclaw, hasBase: true, soldiers: 0, tanks: 0},
  {id:  1, row: 2, col: 3, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id:  2, row: 2, col: 4, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id:  3, row: 2, col: 5, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id:  7, row: 3, col: 2, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id:  4, row: 3, col: 3, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id:  5, row: 3, col: 4, faction: Faction.Neutral, hasBase: false, tanks: 0, soldiers: 0},
  {id:  6, row: 3, col: 5, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 10, row: 3, col: 6, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 11, row: 4, col: 2, faction: Faction.Neutral, hasBase: false, tanks: 0, soldiers: 0},
  {id:  8, row: 4, col: 3, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 50, row: 4, col: 4, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id:  9, row: 4, col: 5, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 15, row: 4, col: 6, faction: Faction.Neutral, hasBase: false, tanks: 0, soldiers: 0},
  {id: 16, row: 5, col: 1, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 17, row: 5, col: 2, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 12, row: 5, col: 3, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 13, row: 5, col: 4, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 14, row: 5, col: 5, faction: Faction.Neutral, hasBase: false, tanks: 0, soldiers: 0},
  {id: 21, row: 5, col: 6, faction: Faction.Neutral, hasBase: false, tanks: 0, soldiers: 0},
  {id: 22, row: 5, col: 7, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 53, row: 6, col: 1, faction: Faction.Steelfire, soldiers: 0, hasBase: true, tanks: 0},
  {id: 23, row: 6, col: 2, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 18, row: 6, col: 3, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 19, row: 6, col: 4, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 20, row: 6, col: 5, faction: Faction.Neutral, hasBase: false, tanks: 0, soldiers: 0},
  {id: 24, row: 6, col: 6, faction: Faction.Neutral, hasBase: false, soldiers: 0, tanks: 0},
  {id: 52, row: 6, col: 7, faction: Faction.Lions, hasBase: true, soldiers: 0, tanks: 0},
]

function Provider({config, onConfig, children}) {
  const [nodes, setNodes] = useState(START_NODES);
  const [hasChange, setHasChange] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);

  const currentNode = useMemo(() => currentNodeIndex < 0 ? null : nodes[currentNodeIndex], [nodes, currentNodeIndex]);

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
    
      setHasChange(true);
      setNodes((oldNodes) => [
        ...oldNodes.slice(0, currentNodeIndex),
        {
          ...oldNodes[currentNodeIndex],
          ...attrs,
        },
        ...oldNodes.slice(currentNodeIndex + 1),
      ])
    },
    [currentNodeIndex],
  )

  const packed = useRef(pack(nodes));

  useEffect(
    () => { packed.current = pack(nodes) },
    [nodes],
  );

  useEffect(() => {
    if (config && config !== packed.current) {
      setNodes(unpack(START_NODES, config));
      setHasChange(false);
    }
  }, [config])

  useEffect(() => {
    if (hasChange) {
      onConfig(packed.current);
      setHasChange(false);
    }
  }, [nodes, setHasChange])



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
