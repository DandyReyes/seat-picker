"use client";
import { useCallback, useEffect, useState } from "react";
import data from "./data.json";
import BuildSections from "./BuildSections";
import ReactModal from "./ReactModal";
import { Sections } from "./types";
import Image from "next/image";
import { LandscapeGate } from "./LandScapeGate";
import { useSocket } from "./SocketProvider";

export const dynamic = "force-dynamic";

export default function Home() {
  const [sections, setSections] = useState<Sections>(data as Sections);
  const [openModal, setOpenModal] = useState(false);
  const [modalDoor, setModalDoor] = useState<keyof Sections>("door1");
  const [counter, setCounter] = useState(0);
  const [userCount, setUserCount] = useState("");

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleTotalCount = (data: string) => {
      console.log(data);
      setUserCount(data);
    };

    socket.on("totalCount", handleTotalCount);

    return () => {
      socket.off("totalCount", handleTotalCount);
    };
  }, [socket]);

  const handleClick = useCallback(
    (
      event: React.MouseEvent,
      rowIndex: number,
      seatKey: string,
      door: keyof Sections,
    ) => {
      event.preventDefault();

      let temp = 0;

      setSections((prev) => {
        const next = structuredClone(prev);
        const seat = next[door].row[rowIndex].seat[seatKey];

        next[door].row[rowIndex].seat[seatKey] = seat ? 0 : 1;

        temp = seat ? -1 : 1;
        return next;
      });

      setCounter((prev) => prev + temp);
    },
    [setSections],
  );

  return (
    <LandscapeGate>
      <main>
        <div className="text-2xl text-red-900 bg-yellow-300">{userCount}</div>
        <Image
          src="/stage.svg"
          alt="theater top view"
          width={720}
          height={200}
          className="absolute top-0 left-0 w-full object-cover -z-10 opacity-30"
        />
        <div className="absolute top-2 left-2">Number of people: {counter}</div>
        <div className="grid grid-cols-4">
          <div
            className="flex items-center justify-end pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door4");
            }}
          >
            <BuildSections rows={sections.door4.row} door="door4" />
          </div>

          <div
            className="flex items-center justify-center h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door3");
            }}
          >
            <BuildSections rows={sections.door3.row} door="door3" />
          </div>

          <div
            className="flex items-center justify-center h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door2");
            }}
          >
            <BuildSections rows={sections.door2.row} door="door2" />
          </div>

          <div
            className="flex items-center justify-start h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door1");
            }}
          >
            <BuildSections rows={sections.door1.row} door="door1" />
          </div>
        </div>

        <ReactModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          row={sections[modalDoor].row}
          door={modalDoor}
          handleClick={handleClick}
        />
      </main>
    </LandscapeGate>
  );
}
