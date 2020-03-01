export enum Faction {
	Steelfire,
	Lions,
	Nightclaw,
}

export type NodeType = {
	id: number
	row: number
	col: number
	faction?: Faction
	soldiers?: number
	tanks?: number
	hasBase?: boolean
}
