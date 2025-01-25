import { useMemo } from "react";
import { JobCardType } from "../types";
import { DropIndicator } from "./DropIndicator";

const JobCard = ({
  companyName,
  handleDragStart,
  id,
  column,
  nextInterviewDate,
  handleSelectedData,
}: JobCardType) => {
  const companyNameMemo = useMemo(() => companyName, [companyName]);
  const interviewDateMemo = useMemo(
    () => new Date(nextInterviewDate).toLocaleDateString(),
    [nextInterviewDate]
  );
  return (
    <>
      <DropIndicator beforeId={id} column={column ?? ""} />
      <div
        id={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { companyName, id })}
        onClick={() => handleSelectedData(id)}
        className="flex justify-between items-center text-center cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100 truncate">{companyNameMemo}</p>
        <p className="text-sm text-neutral-100">{interviewDateMemo}</p>
      </div>
    </>
  );
};

export { JobCard };
