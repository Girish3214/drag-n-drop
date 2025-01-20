import { AddInterviewType } from "../types";
import Add from "../assets/add.svg";
import { Modal } from "./Modal";
import { useState } from "react";

const AddInterview = ({ setInterviewsList, column }: AddInterviewType) => {
  console.log({ column, setInterviewsList });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        Name
      </Modal>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center text-center gap-1.5 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Interview</span>
          <span className="text-base">
            <img src={Add} alt="" className="w-4 h-4" />
          </span>
        </button>
      </div>
    </>
  );
};

export { AddInterview };
