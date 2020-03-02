import { NodeType } from '../types'

const visible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\(){}[]<>!;:,.$%&='

function char(number) {
	if (number >= visible.length) {
		throw Error(`number too big: ${number} (must be less than ${visible.length})`);
	}
	return visible.charAt(number);
}

function unchar(number) {
	return visible.indexOf(number);
}

function packNode({id, soldiers, tanks, hasBase, faction}:NodeType):string {
	if (!soldiers && !tanks && !hasBase) {
		return '';
	}
	const values = [
		id,
		(hasBase ? 1 : 0) + (faction * 10),
		soldiers,
		tanks,
	]
	return values.map(char).join('');
}

function unpackNode(packed:string) {
	const [val1, val2, val3, val4] = packed.split('').map(unchar);
	const id = val1;
	const hasBase = val2 % 10 === 1;
	const faction = Math.floor(val2 / 10);
	const soldiers = val3;
	const tanks = val4;
	return [id, {soldiers, tanks, hasBase, faction}];
}

export function pack(nodes:Array<NodeType>):string {
	return nodes.map(packNode).join('');
}

export function unpack(START_NODES:Array<NodeType>, packed:string):Array<NodeType> {
	const changedNodesById = Object.fromEntries(
		packed.match(/.{1,4}/g).map(unpackNode)
	);
	return START_NODES.map((node, index) => {
		return {
			...node,
			...(changedNodesById[node.id] ?? {}),
		}
	})
}
