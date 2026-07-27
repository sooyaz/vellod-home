import { WordCard } from "@/lib/wordgame/types/card";
import LetterCard from "./LetterCard";
import { DragState } from "@/lib/wordgame/types/drag";

interface Props {
  cards: WordCard[];
  startDrag: (
    card: WordCard,
    x: number,
    y: number,
    originX: number,
    originY: number
  ) => void;
  endDrag: () => void;
  drag: DragState;
}

export default function ChoiceBoard({
  cards,
  drag,
  startDrag,
  endDrag
}: Props) {

  return (

    <div
      className="
        mt-12
        flex
        flex-wrap
        justify-center
        gap-4
      "
    >

      {cards.map((card) => (

        <LetterCard
          key={card.id}
          card={card}
          drag={drag}
          startDrag={startDrag}
          endDrag={endDrag}
        />

      ))}

    </div>

  );

}