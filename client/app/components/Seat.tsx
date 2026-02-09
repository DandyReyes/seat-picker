import React from "react";
import { FaChair, FaSquare } from "react-icons/fa";
import { SeatStatus } from "../types";

type SeatProps = {
  status: SeatStatus;
  [key: string]: any;
};

const Seat = React.memo(function Seat({ status, ...rest }: SeatProps) {
  return (
    <FaSquare
      className={`${
        !!status ? "text-gray-700" : "text-white"
      } cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8
       border-0 p-0.5 box-content border-white rotate-180
       touch-manipulation`}
      {...rest}
    />
  );
});

export default Seat;
