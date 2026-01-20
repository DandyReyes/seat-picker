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
  door1: "mb-6 lg:-translated md:mb-10",
  door2: "mt-6 md:mt-3",
  door3: "mt-6 md:mt-3",
  door4: "mb-6 lg:translated md:mb-10",
};

const rotateFirstAndLastRows = {
  door1: "-rotate-12 justify-start mb-10 md:mb-0.5",
  door2: "mt-8 md:mt-1",
  door3: "mt-8 md:mt-1",
  door4: "rotate-12 justify-end mb-10 md:mb-0.5",
};

export default function BuildSingleSection({ rows, door, handleClick }: Props) {
  return (
    <div className={`${sectionStyles[door]}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-2 mb-2 ${rotateFirstAndLastRows[door]}`}
        >
          {Object.entries(row.seat).map(([seatKey, status]) => (
            <button
              key={seatKey}
              className={`${
                status === "occupied" ? "bg-red-500" : "bg-blue-500"
              } rounded-t-sm md:rounded-t-lg lg:rounded-t-lg cursor-pointer 
              w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 border-0 md:border-1 mr-1 
              lg:mr-2 border-white`}
              onClick={(e) => handleClick(e, rowIndex, seatKey, door)}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
}
