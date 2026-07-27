import { WordCard } from "../types/card";
import { WordQuestion } from "../types/question";

export default class WordGameEngine {

  createCards(
    question: WordQuestion
  ): WordCard[] {

    const cards =
      question.answer
        .split("")
        .map((letter, index) => ({
          id: `card-${index}`,
          letter,
          visible: true,
        }));

    let best = cards;
    let bestScore = 999;

    for (
      let i = 0;
      i < 20;
      i++
    ) {
      const shuffled =
          this.shuffle(cards);

      const score =
          this.similarity(
              shuffled,
              question.answer
          );

      if (score < bestScore){
          best = shuffled;
          bestScore = score;
      }
    }

    return best;
  }

  private shuffle(
    cards: WordCard[]
  ): WordCard[] {

    const result = [...cards];

    for (
      let i = result.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          Math.random() * (i + 1)
        );

      [
        result[i],
        result[j],
      ] = [
        result[j],
        result[i],
      ];

    }

    return result;
  }

  private similarity(
    shuffled: WordCard[],
    answer: string
  ) {
    let score = 0;
    for (
      let i = 0;
      i < answer.length;
      i++
    ) {
      if (
        shuffled[i].letter === answer[i]
      ) {
        score++;
      }
    }
    return score;
  }
}