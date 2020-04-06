export enum Faction {
	Neutral,
	Steelfire,
	Lions,
	Nightclaw,
	Insectoids,
}

export type NodeType = {
	id: number
	row: number
	col: number
	faction: Faction
	soldiers: number
	tanks: number
	hasBase: boolean
}
