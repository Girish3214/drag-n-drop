import { AddInterviewType, InterviewType } from "../types";
import Add from "../assets/add.svg";
import { Modal } from "./Modal";
import { memo, useCallback, useState } from "react";
import { ModalForm } from "./ModalForm";

const AddInterview = memo(function AddInterview({
  interviewsList,
  setInterviewsList,
}: AddInterviewType) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (interview: InterviewType) => {
      setInterviewsList([...interviewsList, { ...interview, type: "calls" }]);
      setOpen(false);
    },
    [interviewsList, setInterviewsList]
  );
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Interview">
        <ModalForm
          onClose={() => setOpen(false)}
          onSubmit={(interview: InterviewType) => handleSubmit(interview)}
        />
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
});

export { AddInterview };
