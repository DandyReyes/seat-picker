"use client";
import { useState } from "react";
import { door1, door2, door3, door4 } from "./data.json";
import BuildSections from "./BuildSections";
import ReactModal from "./Modal";

interface Section {
  row: {
    seat: {
      [index: string]: string | undefined;
    };
  }[];
}

export default function Home() {
  const [section1, setSection1] = useState<Section["row"]>(door1.row);
  const [section2, setSection2] = useState<Section["row"]>(door2.row);
  const [section3, setSection3] = useState<Section["row"]>(door3.row);
  const [section4, setSection4] = useState<Section["row"]>(door4.row);

  const handleClick = (
    event: any,
    row: any,
    seat: any,
    section: any,
    setTheSection: any
  ) => {
    event.preventDefault();
    const modifiedSection = [...section];
    const currentSeat = modifiedSection[row].seat;

    currentSeat[seat] = currentSeat[seat] === "empty" ? "occupied" : "empty";
    modifiedSection[row].seat = currentSeat;

    setTheSection(modifiedSection);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex h-screen w-screen">
        <div className="hover:bg-gray-800">
          <BuildSections
            section={section4}
            setTheSection={setSection4}
            index={3}
            handleClick={handleClick}
          />
        </div>
        <div className="mr-4 md:mr-9 my-24 lg:my-40 hover:bg-gray-800">
          <BuildSections
            section={section3}
            setTheSection={setSection3}
            index={2}
            handleClick={handleClick}
          />
        </div>
        <div className="my-24 lg:my-40 hover:bg-gray-800">
          <BuildSections
            section={section2}
            setTheSection={setSection2}
            index={1}
            handleClick={handleClick}
          />
        </div>
        <div className="hover:bg-gray-800">
          <BuildSections
            section={section1}
            setTheSection={setSection1}
            index={0}
            handleClick={handleClick}
          />
        </div>
      </div>
      <ReactModal />
    </main>
  );
}
