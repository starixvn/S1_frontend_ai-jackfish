export interface IGetHotEventListArgs {
	langId: string
}

export type THotEventData = {
	awayOdds: number
	awayTeamName: string
	awayTeamPic: string
	backgroundPic: string
	battleTime: string
	gameId: string
	handicap: number
	homeOdds: number
	homeTeamName: string
	homeTeamPic: string
	matchId: number
	sportLeaguesTitle: string
	tpId: string
}
