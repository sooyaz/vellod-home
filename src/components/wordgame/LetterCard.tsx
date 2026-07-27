import { WordCard } from "@/lib/wordgame/types/card";
import { DragState } from "@/lib/wordgame/types/drag";

interface Props {
  card: WordCard;
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

export default function LetterCard({
  card,
  drag,
  startDrag,
  endDrag
}: Props) {
  if (
    (drag.dragging || drag.returning) &&
    drag.card?.id === card.id
  ) {
    return (
        <div
            className="
                h-16
                w-16
            "
        />
    );
  }
  return (    
    <button
      style={{
        opacity: card.visible ? 1 : 0,
        pointerEvents: card.visible ? "auto" : "none",
      }}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        startDrag(
          card,
          event.clientX,
          event.clientY,
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
      }}
      onPointerUp={endDrag}
      className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-xl
        border
        border-gray-300
        bg-white
        text-2xl
        font-bold
        shadow-sm
        transition-all
        uration-200
      "
    >
      {card.letter}
    </button>
  );

}