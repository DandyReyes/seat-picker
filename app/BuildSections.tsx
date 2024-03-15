import React from "react";

interface Section {
  row: {
    seat: {
      [index: string]: string | undefined;
    };
  }[];
}

const BuildSections = ({
  section,
  setTheSection,
  index,
  handleClick,
}: {
  section: Section["row"];
  setTheSection?: any;
  index: number;
  handleClick: any;
}) => {
  const elementStyle = [
    "-rotate-45 mt-10 lg:-translated",
    "mt-9",
    "mt-9",
    "justify-end rotate-45 mt-10 lg:translated",
  ];

  return section.map((_, row) => {
    return (
      <div className={`flex ${elementStyle[index]}`} key={Math.random()}>
        {Object.values(section[row].seat).map((element, seat) => {
          return (
            <div
              onClick={(event) =>
                handleClick(event, row, seat, section, setTheSection)
              }
              style={{
                backgroundColor: element === "empty" ? "blue" : "gray",
              }}
              className=" rounded-t-sm md:rounded-t-md lg:rounded-t-lg cursor-pointer w-2 h-2 md:w-6 md:h-6 lg:w-8 lg:h-8 border-0 md:border-2 mr-1 lg:mr-2 border-white"
              key={seat}
            ></div>
          );
        })}
      </div>
    );
  });
};

export default BuildSections;
