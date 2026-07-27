import { WordCard } from "./card";
import { WordQuestion } from "./question";

export interface WordGame {
  question: WordQuestion;
  cards: WordCard[];
}