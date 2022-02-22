import { SiCard } from "../game-creation/sicard";
import { SiCharactor } from "../game-creation/sicharactor";

export interface Player {
  cardId: string,
  cardUid: string,
  hp: number,
  sp: number,
  att: number,
  def: number,
  card: SiCard[],
  charactor: SiCharactor[],
  status: string,
  dizzy: number,
  exp: number,
  expFull: number,
  rank: number
}
