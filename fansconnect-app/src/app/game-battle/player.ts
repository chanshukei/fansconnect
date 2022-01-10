import { SiCard } from "../game-creation/sicard";
import { SiCharactor } from "../game-creation/sicharactor";

export interface Player {
  cardId: string,
  hp: number,
  sp: number,
  att: number,
  def: number,
  card: SiCard[],
  charactor: SiCharactor[]
}
