"use client";
import { useState } from "react";
import data from "./data.json";
import { door1, door2, door3, door4 } from "./data.json";
import BuildSections from "./BuildSections";
import ReactModal from "./ReactModal";

type Rows = {
  row: {
    seat: {
      [index: string]: string | undefined;
    };
  }[];
};
interface Sections {
  door1: Rows;
  door2: Rows;
  door3: Rows;
  door4: Rows;
}
interface Section {
  row: {
    seat: {
      [index: string]: string | undefined;
    };
  }[];
}

export default function Home() {
  const [sections, setSections] = useState<Sections>(data);
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

  const [openModal, setOpenModal] = useState(false);

  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <div className="flex h-screen w-screen">
          <div
            onClick={() => {
              setOpenModal(true);
            }}
            className="hover:bg-gray-800"
          >
            <BuildSections
              section={section4}
              setTheSection={setSection4}
              index={3}
              handleClick={handleClick}
            />
          </div>
          <div
            onClick={() => {
              setOpenModal(true);
            }}
            className="py-24 lg:py-40 pl-2 md:pr-4 hover:bg-gray-800"
          >
            <BuildSections
              section={section3}
              setTheSection={setSection3}
              index={2}
              handleClick={handleClick}
            />
          </div>
          <div
            onClick={() => {
              setOpenModal(true);
            }}
            className="py-24 lg:py-40 pl-2 md:pl-4 hover:bg-gray-800"
          >
            <BuildSections
              section={section2}
              setTheSection={setSection2}
              index={1}
              handleClick={handleClick}
            />
          </div>
          <div
            onClick={() => {
              setOpenModal(true);
            }}
            className="hover:bg-gray-800"
          >
            <BuildSections
              section={section1}
              setTheSection={setSection1}
              index={0}
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
      <ReactModal isOpen={openModal} setIsOpen={setOpenModal} />
    </main>
  );
}
