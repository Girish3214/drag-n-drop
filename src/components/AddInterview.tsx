import { AddInterviewType } from "../types";
import Add from "../assets/add.svg";
import { memo } from "react";

const AddInterview = memo(function AddInterview({ setOpen }: AddInterviewType) {
  return (
    <>
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
});

export { AddInterview };
