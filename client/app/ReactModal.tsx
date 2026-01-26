import React from "react";
import Modal from "react-modal";
import BuildSingleSection from "./BuildSingleSection";
import { Sections } from "./types";
import { IoMdCloseCircleOutline } from "react-icons/io";

const customStyles = {
  content: {
    backgroundColor: "black",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    padding: "20px",
    height: "90vh",
    overflowY: "auto" as "auto",
  },
};

function ReactModal({
  isOpen,
  setIsOpen,
  row,
  door,
  handleClick,
}: {
  isOpen: boolean;
  setIsOpen: any;
  row: any;
  door: string;
  handleClick: (
    event: React.MouseEvent,
    rowIndex: number,
    seatKey: string,
    door: keyof Sections
  ) => void;
}) {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div onClick={closeModal} className="flex justify-end">
        <IoMdCloseCircleOutline className="w-8 h-8" />
      </div>
      <div className="flex justify-center">
        <BuildSingleSection
          rows={row}
          door={door as keyof Sections}
          handleClick={handleClick}
        />
      </div>
    </Modal>
  );
}

export default ReactModal;
