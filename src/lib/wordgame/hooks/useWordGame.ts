"use client";

import { useRef, useEffect, useMemo, useState } from "react";

import { words } from "../data/words";
import WordGameEngine from "../engine/WordGameEngine";

import { WordCard } from "../types/card";
import { WordQuestion } from "../types/question";
import { DragState } from "../types/drag";

export default function useWordGame() {

  const engine = useMemo(
    () => new WordGameEngine(),
    []
  );

  const [currentIndex] = useState(0);

  const [question, setQuestion] =
    useState<WordQuestion>(
      words[0]
    );

  const [cards, setCards] = useState<WordCard[]>([]);

  const [slots, setSlots] = useState<(WordCard | null)[]>([]);

  const [score, setScore] = useState(0);

  const [drag, setDrag] =
    useState<DragState>({
      card: null,
      x: 0,
      y: 0,

      originX: 0,
      originY: 0,

      dragging: false,
      returning: false,
    });

  const slotRefs =
    useRef<
      Map<
        number,
        HTMLDivElement
      >
    >(
      new Map()
    );

  useEffect(() => {

    const current =
      words[currentIndex];

    setQuestion(current);

    setCards(
      engine.createCards(current)
    );

    setSlots(
      Array(current.answer.length).fill(null)
    );

  }, [
    currentIndex,
    engine,
  ]);

  const placeCard = (
    card: WordCard,
    slotIndex: number
  ): boolean => {

    const answerLetter = question.answer[slotIndex];

    // 틀린 위치면 아무 작업도 하지 않음
    if (answerLetter !== card.letter) {
      return false;
    }

    // 이미 카드가 있는 칸이면 종료
    if (slots[slotIndex]) {
      return false;
    }

    const nextSlots = [...slots];

    nextSlots[slotIndex] = card;

    setSlots(nextSlots);

    setCards(
      prev =>
        prev.map(item =>
          item.id === card.id
            ? {
                ...item,
                visible: false,
                dragging: false
              }
            : item
        )
    );

    return true;
  };

  const startDrag = (
    card: WordCard,
    x: number,
    y: number,
    originX: number,
    originY: number
  ) => {
    setDrag({
      card,
      x,
      y,
      originX,
      originY,
      dragging: true,
      returning: false,
    });
    setCards(prev =>
      prev.map(item =>
          item.id === card.id
              ? {
                  ...item,
                  dragging: true,
                }
                : item
      )
    );
  };

  const moveDrag = (
    x: number,
    y: number
  ) => {
    setDrag(prev => {
      if (!prev.dragging) {
        return prev;
      }

      return {
        ...prev,
        x,
        y,
      };
    });
  };

  const endDrag = () => {
    setDrag({
      card: null,
      x: 0,
      y: 0,
      originX: 0,
      originY: 0,
      dragging: false,
      returning: false,
    });
  };

  const returnDrag = () => {
    if (!drag.card) {
      return;
    }
    
    setDrag(prev => ({
      ...prev,
      dragging: false,
      returning: true,
    }));
  };

  const finishReturn = () => {
    if (!drag.card) {
      endDrag();
      return;
    }

    setCards(prev =>
      prev.map(card =>
        card.id === drag.card!.id
          ? {
              ...card,
              visible: true,
            }
          : card
      )
    );
    endDrag();
  };

  const registerSlot = (
    index: number,
    element: HTMLDivElement | null
  ) => {

    if (!element) {
      slotRefs.current.delete(index);
      return;
    }

    slotRefs.current.set(
      index,
      element
    );
  };

  const findSlot = (
    x: number,
    y: number
  ): number | null => {

    for ( const [index, element] of slotRefs.current ) {

      const rect = element.getBoundingClientRect();

      const inside =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      if (inside) {
        return index;
      }

    }
    return null;
  };

  const getDragPosition = () => {
    return {
      x: drag.x,
      y: drag.y,
    };
  };

  return {
    question,
    cards,
    slots,
    score,
    drag,

    placeCard,
    startDrag,
    moveDrag,
    endDrag,
    returnDrag,
    registerSlot,
    findSlot,
    getDragPosition,
    finishReturn
  };
}