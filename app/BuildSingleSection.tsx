import { FaChair } from "react-icons/fa";
import { Row, Sections } from "./types";

type Props = {
  rows: Row[];
  door: keyof Sections;
  handleClick: (
    event: React.MouseEvent,
    rowIndex: number,
    seatKey: string,
    door: keyof Sections
  ) => void;
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

export default function BuildSingleSection({ rows, door, handleClick }: Props) {
  return (
    <div className={`${sectionStyles[door]}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-2 mb-3 ${rotateFirstAndLastRows[door]}`}
        >
          {Object.entries(row.seat).map(([seatKey, status]) => (
            <FaChair
              key={seatKey}
              className={`${
                status === "occupied" ? "text-gray-700" : "text-white"
              } rounded-t-lg md:rounded-t-xl md:rounded-b-sm lg:rounded-t-lg cursor-pointer 
              w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 border-0 md:border-1 mr-1 
              lg:mr-2 border-white rotate-180`}
              onClick={(e) => handleClick(e, rowIndex, seatKey, door)}
            ></FaChair>
          ))}
        </div>
      ))}
    </div>
  );
}
