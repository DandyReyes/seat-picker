import { Row, Sections } from "./types";

type Props = {
  rows: Row[];
  door: keyof Sections;
};

const sectionStyles = [
  "mb-6 lg:-translated md:mb-10",
  "mt-6 md:mt-3",
  "mt-6 md:mt-3",
  "mb-6 lg:translated md:mb-10",
] as const;

const rotateFirstAndLastRows = [
  "-rotate-12 justify-start mb-10 md:mb-2",
  "mt-8 md:mt-1",
  "mt-8 md:mt-1",
  "rotate-12 justify-end mb-10 md:mb-2",
];

export default function BuildSections({ rows, door }: Props) {
  return (
    <div className={` ${sectionStyles[parseInt(door.slice(-1)) - 1]}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-1 mb-2 ${
            rotateFirstAndLastRows[parseInt(door.slice(-1)) - 1]
          }`}
        >
          {Object.entries(row.seat).map(([seatKey, status]) => (
            <div
              key={seatKey}
              className={` ${
                status === "occupied" ? "bg-red-500" : "bg-blue-500"
              } rounded-t-sm md:rounded-full lg:rounded-t-lg cursor-pointer 
              w-2 h-2 md:w-3 md:h-3 lg:w-8 lg:h-8 border-0 md:border-1 mr-1 
              lg:mr-2 border-white`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
