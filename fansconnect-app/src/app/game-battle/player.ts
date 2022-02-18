import { SiCard } from "../game-creation/sicard";
import { SiCharactor } from "../game-creation/sicharactor";
import { SiSkill } from "../game-creation/siskill";

export interface Player {
  cardId: string,
  hp: number,
  sp: number,
  att: number,
  def: number,
  card: SiCard[],
  charactor: SiCharactor[],
  status: string,
  dizzy: number
}
