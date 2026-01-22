import React from "react";
import { FaChair } from "react-icons/fa";

type SeatProps = {
  status: "occupied" | "empty";
  onTap: (e: any) => void;
};

const Seat = React.memo(function Seat({ status, onTap }: SeatProps) {
  return (
    <FaChair
      className={`${
        status === "occupied" ? "text-gray-700" : "text-white"
      } rounded-t-lg md:rounded-t-xl md:rounded-b-sm lg:rounded-t-lg
      cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 border-0 md:border-1
      mr-1 lg:mr-2 border-white rotate-180 touch-manipulation select-none`}
      onPointerDown={onTap}
    />
  );
});

export default Seat;
