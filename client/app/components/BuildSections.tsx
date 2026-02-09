import { FaChair } from "react-icons/fa";
import { DoorLayout, SeatKey, SeatMap } from "../types";
import { Sections } from "../types";
import { FaSquare } from "react-icons/fa6";

type BuildSectionsProps = {
  layout: DoorLayout;
  door: keyof Sections;
  seats: SeatMap;
  takenSeatsPerSection: Record<string, number>;
};

const sectionStyles = {
  door1: "mb-6 lg:-translate-x-6 md:mb-10",
  door2: "md:mt-3",
  door3: "md:mt-3",
  door4: "mb-6 lg:translate-x-6 md:mb-10",
} as const;

const rotateFirstAndLastRows = {
  door1: "-rotate-12 justify-start",
  door2: "md:mt-1",
  door3: "md:mt-1",
  door4: "rotate-12 justify-end",
};

export default function BuildSections({
  layout,
  door,
  seats,
  takenSeatsPerSection,
}: BuildSectionsProps) {
  return (
    <div
      className={`${sectionStyles[door]} shadow-[-10px_5px_5px_rgba(50,50,50,.5)] p-4 sm:p-2 rounded-lg bg-gray-900`}
    >
      <p>{takenSeatsPerSection[door] ?? 0}</p>
      {layout?.rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-0.5 mb-4 ${rotateFirstAndLastRows[door]}`}
        >
          {Array.from({ length: row.seatCount }).map((_, seatIndex) => {
            const key: SeatKey = `${door}:${rowIndex}:${seatIndex}`;
            const status = seats[key] ?? 0;
            return (
              <FaSquare
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
