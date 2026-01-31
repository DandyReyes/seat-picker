"use client";
import { useEffect, useState } from "react";
import data from "./data.json";
import BuildSections from "./BuildSections";
import ReactModal from "./ReactModal";
import { DoorId, SeatMap, Sections, SectionsLayout } from "./types";
import Image from "next/image";
import { LandscapeGate } from "./LandScapeGate";
import { useSocket } from "./SocketProvider";

export const dynamic = "force-dynamic";

export default function Home() {
  const [sections, setSections] = useState<Sections>(data as Sections);
  const [openModal, setOpenModal] = useState(false);
  const [modalDoor, setModalDoor] = useState<keyof Sections>("door1");
  // const [counter, setCounter] = useState(0);
  const [userCount, setUserCount] = useState("");
  const [seats, setSeats] = useState<SeatMap>({});

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

  const buildLayout = (): SectionsLayout => {
    const layout = {} as SectionsLayout;

    (Object.keys(sections) as DoorId[]).forEach((doorId) => {
      layout[doorId] = {
        rows: sections[doorId].row.map((row) => ({
          seatCount: Object.keys(row.seat).length,
        })),
      };
    });

    return layout;
  };

  const layout = buildLayout();

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
        {/* <div className="absolute top-2 left-2">Number of people: {counter}</div> */}
        <div className="grid grid-cols-4">
          <div
            className="flex items-center justify-end pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door4");
            }}
          >
            <BuildSections seats={seats} layout={layout.door4} door="door4" />
          </div>

          <div
            className="flex items-center justify-center h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door3");
            }}
          >
            <BuildSections seats={seats} layout={layout.door3} door="door3" />
          </div>

          <div
            className="flex items-center justify-center h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door2");
            }}
          >
            <BuildSections seats={seats} layout={layout.door2} door="door2" />
          </div>

          <div
            className="flex items-center justify-start h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door1");
            }}
          >
            <BuildSections seats={seats} layout={layout.door1} door="door1" />
          </div>
        </div>

        <ReactModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          row={layout[modalDoor].rows}
          door={modalDoor}
          seats={seats}
          setSeats={setSeats}
        />
      </main>
    </LandscapeGate>
  );
}
