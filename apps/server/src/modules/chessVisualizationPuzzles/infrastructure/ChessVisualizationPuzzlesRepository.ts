import { ChessVisualizationPuzzle } from "./ChessVisualizationPuzzle";

export interface ChessVisualizationPuzzlesRepository {
	findOne(): Promise<ChessVisualizationPuzzle | null>;
}
