import { SiCard } from "../game-creation/sicard";
import { SiCharactor } from "../game-creation/sicharactor";

export interface Snack {
  cardId: string,
  card: SiCard[],
  charactor: SiCharactor[],
  count: number
}
