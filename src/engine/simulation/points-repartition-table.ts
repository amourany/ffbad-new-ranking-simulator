/* eslint-disable */
export type PointRepartitionTable = {
    [key: number]: WinLoseRatio;
};

type WinLoseRatio = {
    winningLowerRankedPlayerRatio: number;
    winningHigherRankedPlayerRatio: number;
    losingLowerRankedPlayerRatio: number;
    losingHigherRankedPlayerRatio: number;
};

export const pointsRepartitionTable: PointRepartitionTable = {
    0: {
        winningLowerRankedPlayerRatio: 0.5,
        winningHigherRankedPlayerRatio: 0.5,
        losingLowerRankedPlayerRatio: 0.5,
        losingHigherRankedPlayerRatio: 0.5,
    },
    400: {
        winningLowerRankedPlayerRatio: 0.54,
        winningHigherRankedPlayerRatio: 0.46,
        losingLowerRankedPlayerRatio: 0.46,
        losingHigherRankedPlayerRatio: 0.54,
    },
    500: {
        winningLowerRankedPlayerRatio: 0.57,
        winningHigherRankedPlayerRatio: 0.43,
        losingLowerRankedPlayerRatio: 0.43,
        losingHigherRankedPlayerRatio: 0.57,
    },
    600: {
        winningLowerRankedPlayerRatio: 0.61,
        winningHigherRankedPlayerRatio: 0.39,
        losingLowerRankedPlayerRatio: 0.39,
        losingHigherRankedPlayerRatio: 0.61,
    },
    700: {
        winningLowerRankedPlayerRatio: 0.64,
        winningHigherRankedPlayerRatio: 0.36,
        losingLowerRankedPlayerRatio: 0.36,
        losingHigherRankedPlayerRatio: 0.64,
    },
    800: {
        winningLowerRankedPlayerRatio: 0.68,
        winningHigherRankedPlayerRatio: 0.32,
        losingLowerRankedPlayerRatio: 0.32,
        losingHigherRankedPlayerRatio: 0.68,
    },
    900: {
        winningLowerRankedPlayerRatio: 0.71,
        winningHigherRankedPlayerRatio: 0.29,
        losingLowerRankedPlayerRatio: 0.29,
        losingHigherRankedPlayerRatio: 0.71,
    },
    1000: {
        winningLowerRankedPlayerRatio: 0.75,
        winningHigherRankedPlayerRatio: 0.25,
        losingLowerRankedPlayerRatio: 0.25,
        losingHigherRankedPlayerRatio: 0.75,
    },
}
/* eslint-enable */
