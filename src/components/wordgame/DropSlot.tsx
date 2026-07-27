import { useEffect, useRef } from "react";
import { WordCard } from "@/lib/wordgame/types/card";

interface Props {
  index: number;
  card: WordCard | null;
  registerSlot: (
    index: number,
    element: HTMLDivElement | null
  ) => void;
}

export default function DropSlot({
  index,
  card,
  registerSlot
}: Props) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerSlot(
      index,
      ref.current
    );

    return () => {
      registerSlot(
        index,
        null
      );
    };
  }, [
    index,
    registerSlot,
  ]);

  return (
    <div
      ref={ref}
      data-index={index}
      className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-xl
        border-2
        border-gray-300
        bg-gray-100
        text-2xl
        font-bold
        transition-all
      "
    >

      {card?.letter}

    </div>
  );
}