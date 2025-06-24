import { create } from 'zustand';
import { v7 as uuid } from 'uuid';

export enum PlayersIndexes {
	PLAYER_A = 0,
	PLAYER_B = 1,
	PLAYER_C = 2,
	PLAYER_D = 3,
}

export type Opponent = {
	matchId: string;
	players: (number|undefined)[],
	winningAgainstThisTeam: boolean,
	points: number,
	winningChances?: number,
};

export type PlayersStore = {
	players: (number|undefined)[],
	opponents: Opponent[],
};

export type PlayersActionsType = {
	updatePlayer: (index: number) => (licence: number) => void,
	removePlayer: (index: number) => void,
	addMatch: () => void,
	removeMatch: (matchId: string) => void,
	updateOpponent: (matchId: string, opponentIndex: number) => (licence: number) => void,
	toggleOpponentWinningAgainstThisTeam: (matchId: string) => (isWinningAgainst:boolean) => void,
	updateMatchResult: (matchId: string) => (points: number, winningChances: number) => void,
	clearOpponent: (matchId: string, opponentIndex: number) => void,
	clearTournament: () => void,
};

export const usePlayersStore = create<PlayersStore & PlayersActionsType>((set) => ({
	addMatch: () => set((state) => ({ opponents: [
		...state.opponents,
		{ matchId: uuid(),
			players: [
				undefined,
				undefined,
			],
			points: 0,
			winningAgainstThisTeam: true },
	] })),
	clearOpponent: (matchId: string, opponentIndex: number) => set((state) => ({
		opponents: state.opponents.map(opponent => {
			if(opponent.matchId === matchId) {
				return {
					...opponent,
					players: [
						...opponent.players.slice(0, opponentIndex),
						undefined,
						...opponent.players.slice(opponentIndex + 1),
					],
				};
			}
			return opponent;
		}),
	})),
	clearTournament: () => set((state) => ({
		...state,
		opponents: [],
		players: [
			state.players[0],
			undefined,
		],
	})),
	opponents: [],
	players: [
		undefined,
		undefined,
	],
	removeMatch: (matchId: string ) => set((state) => ({
		opponents: state.opponents.filter((opponent) => opponent.matchId !== matchId ),
	})),
	removePlayer: (index: number) => set((state) => ({
		players: [
			...state.players.slice(0, index),
			undefined,
			...state.players.slice(index + 1),
		],
	})),
	toggleOpponentWinningAgainstThisTeam: (matchId: string) => (isWinningAgainst: boolean) => set((state) => ({
		opponents: state.opponents.map(opponent => {
			if(opponent.matchId === matchId) {
				return {
					...opponent,
					winningAgainstThisTeam: isWinningAgainst,
				};
			}
			return opponent;
		}),
	})),
	updateMatchResult: (matchId: string) => (points:number, winningChances:number) => set((state) =>({
		opponents: state.opponents.map(opponent => {
			if(opponent.matchId === matchId) {
				return {
					...opponent,
					points,
					winningChances,
				};
			}
			return opponent;
		}),
	})),
	updateOpponent: (matchId: string, opponentIndex: number) => (licence: number) => set((state) => ({
		opponents: state.opponents.map(opponent => {
			if(opponent.matchId === matchId) {
				return {
					...opponent,
					players: [
						...opponent.players.slice(0, opponentIndex),
						licence,
						...opponent.players.slice(opponentIndex + 1),
					],
				};
			}
			return opponent;
		}),
	})),
	updatePlayer: (index: number) => (licence: number) => set((state) => ({
		players: [
			...state.players.slice(0, index),
			licence,
			...state.players.slice(index + 1),
		],
	})),
}));
