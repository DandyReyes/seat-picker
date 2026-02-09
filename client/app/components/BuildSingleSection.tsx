import { BackendRow, RowLayout, SeatStatus, Sections } from "../types";
import Seat from "./Seat";
import { useRef, useState } from "react";
import { SeatKey } from "../types";

type Props = {
  layout: RowLayout[];
  door: keyof Sections;
  seats: Record<string, SeatStatus>;
  setSeats: React.Dispatch<React.SetStateAction<Record<string, SeatStatus>>>;
};

const sectionStyles = {
  door1: "mb-6 lg:-translated",
  door2: "mt-6 md:mt-3",
  door3: "mt-6 md:mt-3",
  door4: "mb-6 lg:translated",
};

const rotateFirstAndLastRows = {
  door1: "justify-start -rotate-12",
  door2: "md:mt-1",
  door3: "md:mt-1",
  door4: "justify-end rotate-12",
};

export default function BuildSingleSection({
  layout: rows,
  door,
  seats,
  setSeats,
}: Props) {
  const isPainting = useRef(false);
  const paintedThisDrag = useRef<Set<SeatKey>>(new Set());
  const paintValue = useRef<0 | 1>(1);

  const resolveSeatKey = (el: HTMLElement | null): SeatKey | null => {
    if (!el) return null;
    const seatEl = el.closest("[data-index]") as HTMLElement | null;
    return seatEl?.getAttribute("data-index") as SeatKey | null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();

    isPainting.current = true;
    paintedThisDrag.current = new Set();

    const key = resolveSeatKey(e.target as HTMLElement);
    if (!key) return;

    paintValue.current = seats[key] ? 0 : 1;

    paintedThisDrag.current.add(key);
    paintSeat(key);

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPainting.current) return;

    const el = document.elementFromPoint(
      e.clientX,
      e.clientY,
    ) as HTMLElement | null;
    const key = resolveSeatKey(el);
    if (!key) return;

    if (paintedThisDrag.current.has(key)) return;

    paintedThisDrag.current.add(key);
    paintSeat(key);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPainting.current = false;
    paintedThisDrag.current = new Set();
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handlePointerCancel = () => {
    isPainting.current = false;
    paintedThisDrag.current = new Set();
  };

  const paintSeat = (key: SeatKey) => {
    setSeats((prev) => {
      if (prev[key] === paintValue.current && paintValue.current === 0)
        return prev;
      return { ...prev, [key]: paintValue.current };
    });
  };

  return (
    <div
      className={`${sectionStyles[door]}`}
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {rows?.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-0.5 mb-4 ${rotateFirstAndLastRows[door]}`}
        >
          {Array.from({ length: row.seatCount }).map((_, seatIndex) => {
            const key: SeatKey = `${door}:${rowIndex}:${seatIndex}`;
            const status = seats[key] ?? 0;
            return (
              <Seat
                key={seatIndex}
                status={status as SeatStatus}
                data-index={`${door}:${rowIndex}:${seatIndex}`}
                onClick={() => console.log(key)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
