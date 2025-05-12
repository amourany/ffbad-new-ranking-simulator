import { create } from 'zustand/index';

export type TournamentConfigurationStore = {
	isDoublesMatch: boolean,
	isMixedDoubles: boolean,
	isCrossGenderMatch: boolean,
	matchMultiplyingFactor: number,
};

export type TournamentConfigurationActionsType = {
	setIsDoublesMatch: (isDoublesMatch: boolean) => void,
	setIsCrossGenderMatch: (isCrossGenderMatch: boolean) =>void,
	setIsMixedDoubles: (isMixedDoubles: boolean) => void,
	setMatchMultiplyingFactor: (matchMultiplyingFactor: number) => void,
};

export const useTournamentConfigurationStore = create<TournamentConfigurationStore & TournamentConfigurationActionsType>((set) => ({
	isCrossGenderMatch: false,
	isDoublesMatch: false,
	isMixedDoubles: false,
	matchMultiplyingFactor: 1,
	setIsCrossGenderMatch: (isCrossGenderMatch: boolean) => set(() => ({ isCrossGenderMatch })),
	setIsDoublesMatch: (isDoublesMatch: boolean) => set(() => ({ isDoublesMatch })),
	setIsMixedDoubles: (isMixedDoubles: boolean) => set(() => ({ isMixedDoubles })),
	setMatchMultiplyingFactor: (matchMultiplyingFactor: number) => set(() => ({
		matchMultiplyingFactor,
	})),
}));
