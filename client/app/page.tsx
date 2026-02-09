"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import BuildSections from "./components/BuildSections";
import ReactModal from "./ReactModal";
import { SeatMap, Sections } from "./types";
import Image from "next/image";
import { LandscapeGate } from "./LandScapeGate";
import { useSocket } from "./SocketProvider";
import debounce from "lodash.debounce";
import axios from "axios";
import { sectionsLayout } from "./sectionsLayout";

export const dynamic = "force-dynamic";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [modalDoor, setModalDoor] = useState<keyof Sections>("door1");
  const [userCount, setUserCount] = useState("");
  const [seats, setSeats] = useState<SeatMap>({});
  const [takenSeatsPerSection, setTakenSeatsPerSection] = useState<
    Record<string, number>
  >({});

  const handleDebounceFn = (value: SeatMap) => {
    axios
      .post("http://localhost:8000/api/seating", {
        seats: value,
      })
      .catch((err) => {
        console.error("Error updating seating data:", err);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useMemo(() => debounce(handleDebounceFn, 1000), []);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (Object.keys(seats).length === 0) return;

    debounceFn(seats);
  }, [seats, debounceFn]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/seating")
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching seating data:", err);
      });
  }, []);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleTotalCount = (data: string) => {
      setUserCount(data);
    };

    const handleCounts = (counts: Record<string, number>) => {
      setTakenSeatsPerSection(counts);
    };

    socket.on("totalCount", handleTotalCount);
    socket.on("seatCountsUpdated", handleCounts);

    return () => {
      socket.off("totalCount", handleTotalCount);
      socket.off("seatCountsUpdated", handleCounts);
    };
  }, [socket]);

  return (
    <LandscapeGate>
      <main>
        <div className="text-green-500 text-sm absolute bottom-0 right-0 mr-5">
          Online: {userCount}
        </div>
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
            <BuildSections
              seats={seats}
              layout={sectionsLayout.door4}
              door="door4"
              takenSeatsPerSection={takenSeatsPerSection}
            />
          </div>

          <div
            className="flex items-center justify-center h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door3");
            }}
          >
            <BuildSections
              seats={seats}
              layout={sectionsLayout.door3}
              door="door3"
              takenSeatsPerSection={takenSeatsPerSection}
            />
          </div>

          <div
            className="flex items-center justify-center h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door2");
            }}
          >
            <BuildSections
              seats={seats}
              layout={sectionsLayout.door2}
              door="door2"
              takenSeatsPerSection={takenSeatsPerSection}
            />
          </div>

          <div
            className="flex items-center justify-start h-screen pt-40"
            onClick={() => {
              setOpenModal(true);
              setModalDoor("door1");
            }}
          >
            <BuildSections
              seats={seats}
              layout={sectionsLayout.door1}
              door="door1"
              takenSeatsPerSection={takenSeatsPerSection}
            />
          </div>
        </div>

        <ReactModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          row={sectionsLayout[modalDoor]?.rows}
          door={modalDoor}
          seats={seats}
          setSeats={setSeats}
        />
      </main>
    </LandscapeGate>
  );
}
