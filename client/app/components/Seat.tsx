import { memo } from "react";
import { SeatStatus } from "../types";

type SeatProps = {
  status: SeatStatus;
  dataIndex: string;
  onClick?: () => void;
};

const Seat = memo(function Seat({ status, dataIndex, onClick }: SeatProps) {
  return (
    <div
      className={`${
        !!status ? "bg-gray-700" : "bg-white"
      } cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8
       border-0 p-0.5 box-content border-white rotate-180
       touch-manipulation rounded-full`}
      data-index={dataIndex}
      onClick={onClick}
    />
  );
});

export default Seat;
