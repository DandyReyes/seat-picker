import React from "react";
import { FaChair } from "react-icons/fa";
import { SeatStatus } from "./types";

type SeatProps = {
  status: SeatStatus;
  onTap: (e: any) => void;
};

const Seat = React.memo(function Seat({ status, onTap }: SeatProps) {
  return (
    <FaChair
      className={`${
        status ? "text-gray-700" : "text-white"
      } cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 border-0 p-0.5 box-content
       border-white rotate-180 touch-manipulation`}
      onPointerDown={onTap}
    />
  );
});

export default Seat;
