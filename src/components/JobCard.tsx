import { JobCardType } from "../types";
import { DropIndicator } from "./DropIndicator";

const JobCard = ({
  companyName,
  handleDragStart,
  id,
  column,
  nextInterviewDate,
}: JobCardType) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column ?? ""} />
      <div
        id={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { companyName, id })}
        onClick={() => console.log(id)}
        className="flex justify-between items-center text-center cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{companyName}</p>
        <p className="text-sm text-neutral-100">{nextInterviewDate}</p>
      </div>
    </>
  );
};

export { JobCard };
