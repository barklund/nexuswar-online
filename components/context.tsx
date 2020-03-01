import { createContext } from 'react'

const Context = createContext({
	state: {
		nodes: [],
		showNumbers: false,
		currentNode: null,
	},
	actions: {
		toggleNumbers: (showNumbers) => {},
		setCurrentNodeById: (id) => {},
		updateCurrentNode: (attrs) => {},
		clearCurrentNode: () => {},
	},
});

export default Context;
