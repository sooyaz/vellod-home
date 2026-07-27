"use client";

import { useEffect } from "react";
import useWordGame from "@/lib/wordgame/hooks/useWordGame";

import QuestionBoard from "./QuestionBoard";
import ChoiceBoard from "./ChoiceBoard";
import DragLayer from "./DragLayer";

export default function WordGame() {

  const {
    question,
    cards,
    slots,
    drag,
    placeCard,
    startDrag,
    moveDrag,
    returnDrag,
    endDrag,
    registerSlot,
    findSlot,
    getDragPosition,
    finishReturn
  } = useWordGame();

  useEffect(() => {

    const handlePointerMove = (
      event: PointerEvent
    ) => {

      if (
        !drag.dragging ||
        drag.returning
      ) {
        return;
      }

      moveDrag(
        event.clientX,
        event.clientY
      );
    };

    const handlePointerUp = () => {
      if (!drag.dragging || !drag.card) {
        endDrag();
        return;
      }

      const position = getDragPosition();

      const slot =
        findSlot(
          position.x,
          position.y
        );

      if (slot !== null) {
        const success =
          placeCard(
            drag.card,
            slot
          );

        if (success) {
          endDrag();
        } else {
          returnDrag();
        }
      } else {
        returnDrag();
      }
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    };
  }, [
    moveDrag,
    endDrag,
    drag,
    findSlot,
    getDragPosition,
  ]);
  
  return (

    <div
      className="
        mx-auto
        max-w-4xl
        py-10
      "
    >

      <QuestionBoard
        hint={question.hint}
        slots={slots}
        registerSlot={registerSlot}
      />

      <ChoiceBoard
        cards={cards}
        drag={drag}
        startDrag={startDrag}
        endDrag={endDrag}
      />

      <DragLayer
        drag={drag}
        endDrag={finishReturn}
      />

      <pre
        className="mt-6 rounded bg-gray-100 p-4 text-sm text-black"
      >
        {JSON.stringify(drag, null, 2)}
      </pre>

    </div>

  );
}