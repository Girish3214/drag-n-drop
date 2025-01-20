import { useCallback, useMemo, useState } from "react";
import { ColumnType, Todo } from "../../types";
import { AddInterview, DropIndicator, JobCard } from "../../components";
import { useDragEvent } from "../../hooks";

const Column = ({
  title,
  headingColor,
  interviews,
  column,
  setInterviewsList,
}: ColumnType) => {
  const {
    clearHighlights,
    getIndicators,
    highlightIndicator,
    getNearestIndicator,
  } = useDragEvent();

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
      clearHighlights(getIndicators(column) as HTMLElement[]);
      const interviewId = e.dataTransfer.getData("interviewId");
      const indicators = getIndicators(column);
      const { element } = getNearestIndicator(
        e,
        indicators as HTMLElement[]
      ) || { element: null };
      if (element) {
        const before = element.dataset.before || "-1";
        if (before !== interviewId) {
          let copy = [...interviews];

          let cardToTransfer = copy.find((c) => c.id === interviewId);
          if (!cardToTransfer) return;
          cardToTransfer = { ...cardToTransfer, type: column };

          copy = copy.filter((c) => c.id !== interviewId);

          const moveToBack = before === "-1";

          if (moveToBack) {
            copy.push(cardToTransfer as Todo);
          } else {
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex === undefined) return;

            copy.splice(insertAtIndex, 0, cardToTransfer as Todo);
          }

          setInterviewsList([...copy]);
        }
      }
    },
    [interviews, setInterviewsList]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e, column);
    setActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearHighlights(getIndicators(column) as HTMLElement[]);
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
            column={column}
            handleDragStart={handleDragStart}
          />
        ))}
        <DropIndicator beforeId={null} column={column} />
        {column === "calls" && (
          <AddInterview column={column} setInterviewsList={setInterviewsList} />
        )}
      </div>
    </div>
  );
};

export { Column };
