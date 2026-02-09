"use client";

import * as Dialog from "@radix-ui/react-dialog";
import BuildSingleSection from "./components/BuildSingleSection";
import { RowLayout, Sections } from "./types";
import { IoMdCloseCircleOutline } from "react-icons/io";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  row: RowLayout[];
  door: string;
  seats: any;
  setSeats: any;
};

export default function ReactModal({
  isOpen,
  setIsOpen,
  row,
  door,
  seats,
  setSeats,
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Title>
          <span className="text-white text-2xl font-bold">
            {`Section ${door.replace("door", "")}`}
          </span>
        </Dialog.Title>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />

        {/* Modal Content */}
        <Dialog.Content
          className="
            fixed z-50
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            bg-black
            rounded-2xl
            w-[90%] max-w-150
            h-[90vh]
            p-5
            overflow-y-auto
            focus:outline-none
          "
        >
          {/* Close button */}
          <Dialog.Close asChild>
            <button className="flex justify-end w-full">
              <IoMdCloseCircleOutline className="w-8 h-8 text-white hover:opacity-80" />
            </button>
          </Dialog.Close>

          {/* Body */}
          <div className="flex justify-center">
            <BuildSingleSection
              layout={row}
              door={door as keyof Sections}
              seats={seats}
              setSeats={setSeats}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
