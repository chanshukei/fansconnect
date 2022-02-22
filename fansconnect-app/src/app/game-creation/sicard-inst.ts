import { SiCard } from "./sicard";

export interface SiCardInst {
  cardId: string;
  cardUid: string;
  gameId: string;
  card: SiCard[];
}
