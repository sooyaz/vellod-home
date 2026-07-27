import { DragState } from "@/lib/wordgame/types/drag";

interface Props {
  drag: DragState;
  endDrag: () => void;
}

export default function DragLayer({
  drag,
  endDrag
}: Props) {

  if (!drag.card) {
    return null;
  }

  return (
    <div
      onTransitionEnd={() => {
        if (drag.returning) {
          endDrag();
        }
      }}
      style={{
          position:"fixed",
          left:
              drag.returning
                  ? drag.originX
                  : drag.x,
          top:
              drag.returning
                  ? drag.originY
                  : drag.y,
          transform: "translate(-50%, -50%)",

          pointerEvents:"none",
          zIndex:9999,
          transition:
              drag.returning
                  ? "all .25s ease"
                  : "none",
      }}

      className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-xl
        border
        bg-white
        text-2xl
        font-bold
        shadow-xl
      "
    >
      {drag.card.letter}

    </div>
  );
}