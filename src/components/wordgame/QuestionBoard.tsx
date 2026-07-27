import { WordCard } from "@/lib/wordgame/types/card";
import DropSlot from "./DropSlot";

interface Props {
  hint: string;
  slots: (WordCard | null)[];
  registerSlot: (
    index: number,
    element: HTMLDivElement | null
  ) => void;
}


export default function QuestionBoard({
  hint,
  slots,
  registerSlot
}: Props) {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        gap-8
      "
    >

      <h2
        className="
          text-4xl
          font-bold
        "
      >
        {hint}
      </h2>

      <div
        className="
          flex
          gap-3
        "
      >

      {slots.map((slot, index) => (
        <DropSlot
          key={index}
          index={index}
          card={slot}
          registerSlot={registerSlot}
        />
      ))}

      </div>

    </div>

  );
}