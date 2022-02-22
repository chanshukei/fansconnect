import { SiCard } from "../game-creation/sicard";
import { SiCharactor } from "../game-creation/sicharactor";

export interface Monster {
  cardId: string,
  monsterUname: string,
  hp: number,
  sp: number,
  att: number,
  def: number,
  card: SiCard[],
  charactor: SiCharactor[],
  status: string,
  hide: number
}
