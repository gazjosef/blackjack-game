import { Suit } from "./types";

export class Card {
  constructor(
    public suit: Suit,
    public icon: string,
    public bgcolor: string,
    public cardnum: string,
    public cardvalue: number
  ) {}
}
