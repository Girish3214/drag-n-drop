import { useState } from "react";
import Trash from "../assets/delete.svg";
import { DeleteInterviewType } from "../types";
import { deleteInterview } from "../services";

const DeleteInterview = ({
  interviewsList,
  setInterviewsList,
}: DeleteInterviewType) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const interviewId = e.dataTransfer.getData("interviewId");
    const companyName = interviewsList.find(
      (inter) => inter.id === interviewId
    )?.companyName;

    if (!companyName) {
      return;
    }
    deleteInterview(companyName).then((result) => {
      if (result) {
        setInterviewsList(
          interviewsList.filter((inter) => inter.id !== interviewId)
        );
      } else {
        console.log("something went wrong");
      }
    });

    setActive(false);
  };
  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      <img
        src={Trash}
        alt=""
        className={`w-12 h-w-12 ${active ? "animate-bounce" : ""} `}
      />
    </div>
  );
};

export { DeleteInterview };
