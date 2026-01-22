import { FaChair } from "react-icons/fa";
import { Row, Sections } from "./types";

type Props = {
  rows: Row[];
  door: keyof Sections;
};

const sectionStyles = [
  "mb-6 lg:-translated md:mb-10",
  "md:mt-3",
  "md:mt-3",
  "mb-6 lg:translated md:mb-10",
] as const;

const rotateFirstAndLastRows = [
  "-rotate-12 justify-start mb-10",
  "md:mt-1",
  "md:mt-1",
  "rotate-12 justify-end mb-10",
];

export default function BuildSections({ rows, door }: Props) {
  return (
    <div
      className={` ${
        sectionStyles[parseInt(door.slice(-1)) - 1]
      } "shadow-sm shadow-[-10px_5px_5px_rgba(50,50,50,.5)] p-4 sm:p-2 rounded-lg bg-gray-900`}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-1 mb-4 ${
            rotateFirstAndLastRows[parseInt(door.slice(-1)) - 1]
          }`}
        >
          {Object.entries(row.seat).map(([seatKey, status]) => (
            <FaChair
              key={seatKey}
              className={` ${
                status === "occupied" ? "text-gray-700" : "text-white"
              } cursor-pointer 
              w-3 h-3 md:w-4 md:h-4 mr-0 rotate-180`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
