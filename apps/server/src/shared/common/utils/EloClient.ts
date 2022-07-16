export class EloClient {
	calculateExpectedResult = (rateA: number, rateB: number) => {
		return 1 / (1 + Math.pow(10, (rateB - rateA) / 400));
	};

	calculateExpectedRate = (
		rate: number,
		kFactor: number,
		scoredPoints: number,
		expectedResult: number
	) => {
		return rate + kFactor * (scoredPoints - expectedResult);
	};
}
