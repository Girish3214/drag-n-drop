import { JobCardType } from "../types";

const JobCard = ({
  title,
  handleDragStart,
  id,
  nextInterviewDate,
}: JobCardType) => {
  return (
    <>
      <div
        id={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id })}
        onClick={() => console.log(id)}
        className="flex justify-between items-center text-center cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
        <p className="text-sm text-neutral-100">{nextInterviewDate}</p>
      </div>
    </>
  );
};

export { JobCard };
