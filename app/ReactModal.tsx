import React from "react";
import Modal from "react-modal";
import BuildSingleSection from "./BuildSingleSection";
import { Sections } from "./types";

const customStyles = {
  content: {
    backgroundColor: "black",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => ({})}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <BuildSingleSection
          rows={row}
          door={door as keyof Sections}
          handleClick={handleClick}
        />
      </Modal>
    </div>
  );
}

export default ReactModal;
