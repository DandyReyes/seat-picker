const sectionStyles = {
  door1: "mb-6 lg:-translated md:mb-10",
  door2: "md:mt-3",
  door3: "md:mt-3",
  door4: "mb-6 lg:translated md:mb-10",
} as const;

const rotateFirstAndLastRows = {
  door1: "-rotate-12 justify-start mb-10",
  door2: "md:mt-1",
  door3: "md:mt-1",
  door4: "rotate-12 justify-end mb-10",
};

import { FaChair } from "react-icons/fa";
import { DoorLayout, SeatKey, SeatMap } from "./types";
import { Sections } from "./types";

type BuildSectionsProps = {
  layout: DoorLayout;
  door: keyof Sections;
  seats: SeatMap;
};

export default function BuildSections({
  layout,
  door,
  seats,
}: BuildSectionsProps) {
  return (
    <div
      className={` ${
        sectionStyles[door]
      } "shadow-sm shadow-[-10px_5px_5px_rgba(50,50,50,.5)] p-4 sm:p-2 rounded-lg bg-gray-900`}
    >
      {layout.rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-0.5 mb-4 ${rotateFirstAndLastRows[door]}`}
        >
          {Array.from({ length: row.seatCount }).map((_, seatIndex) => {
            const key: SeatKey = `${door}:${rowIndex}:${seatIndex}`;
            const status = seats[key] ?? 0;
            return (
              <FaChair
                key={key}
                className={` ${
                  status ? "text-gray-700" : "text-white"
                } cursor-pointer 
              w-3 h-3 md:w-4 md:h-4 mr-0 rotate-180`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
