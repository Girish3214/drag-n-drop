import { useCallback, useMemo, useState } from "react";
import { ColumnType } from "../../types";
import { AddInterview, JobCard } from "../../components";

const Column = ({
  title,
  headingColor,
  interviews,
  column,
  setInterviewsList,
}: ColumnType) => {
  const [active, setActive] = useState<boolean>(false);

  const interviewsList = useMemo(() => {
    return interviews.filter((inter) => inter.type === column);
  }, [column, interviews]);

  const handleDragStart = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      interview: {
        id: string;
        title: string;
      }
    ) => {
      e.dataTransfer.setData("interviewId", interview.id);
    },
    []
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setActive(false);
      // const id = e.dataTransfer.getData("id");
      // const column = e.dataTransfer.getData("column");
      // const interviewsList = interviews.filter((inter) => inter.id !== id);

      // setInterviewsList(interviewsList);
    },
    [interviews, setInterviewsList]
  );
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
  }, []);

  return (
    <div className="w-1/6 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {interviewsList.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {interviewsList.map((interview) => (
          <JobCard
            key={interview.id}
            {...interview}
            handleDragStart={handleDragStart}
          />
        ))}
        {column === "calls" && (
          <AddInterview column={column} setInterviewsList={setInterviewsList} />
        )}
      </div>
    </div>
  );
};

export { Column };
