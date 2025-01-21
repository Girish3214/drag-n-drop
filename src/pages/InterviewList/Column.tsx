import { useCallback, useMemo, useState } from "react";
import { ColumnType, InterviewType } from "../../types";
import {
  AddInterview,
  DropIndicator,
  JobCard,
  Modal,
  ModalForm,
} from "../../components";
import { useDragEvent } from "../../hooks";
import { addInterview, editInterview } from "../../services";

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
  const [selectedInterviewCard, setSelectedInterviewCard] = useState<
    InterviewType | undefined
  >(undefined);

  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (interview: InterviewType) => {
      console.log({ selectedInterviewCard, interview });
      if (selectedInterviewCard) {
        const result = await editInterview({
          ...selectedInterviewCard,
          ...interview,
        });
        if (!result?.message) {
          const filteredInterviews: InterviewType[] = interviews.map((inter) =>
            inter.companyName.replace(/ /g, "_") ===
            selectedInterviewCard?.companyName.replace(/ /g, "_")
              ? { ...inter, ...interview } // Merge the updated fields
              : inter
          );

          // Update the state with the new list of interviews
          setInterviewsList(filteredInterviews);
          setOpen(false);
        }
        return;
      }
      const result = await addInterview(interview);

      if (!result?.message) {
        setInterviewsList([
          ...interviews,
          {
            ...interview,
            id: interview?.companyName.replace(/ /g, "_"),
            type: "calls",
          },
        ]);
        setOpen(false);
      }
    },
    [interviews, setInterviewsList, selectedInterviewCard]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedInterviewCard(undefined);
  }, []);

  const interviewsListMemo = useMemo(() => {
    return interviews.filter((inter) => inter.type === column);
  }, [column, interviews]);

  const handleDragStart = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      interview: {
        id: string;
        companyName: string;
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
            copy.push(cardToTransfer as InterviewType);
          } else {
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex === undefined) return;

            copy.splice(insertAtIndex, 0, cardToTransfer as InterviewType);
          }

          setInterviewsList([...copy]);
          editInterview(cardToTransfer as InterviewType);
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

  console.log({ interviewsListMemo });
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title={selectedInterviewCard ? `Edit Interview` : `Add Interview`}
      >
        <ModalForm
          onClose={handleClose}
          onSubmit={(interview: InterviewType) => handleSubmit(interview)}
          initialData={selectedInterviewCard || null}
        />
      </Modal>
      <div className="w-1/6 shrink-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
          <span className="rounded text-sm text-neutral-400">
            {interviewsListMemo.length}
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
          {interviewsListMemo.map((interview) => (
            <JobCard
              key={interview.id}
              {...interview}
              column={column}
              handleDragStart={handleDragStart}
              handleSelectedData={(id: string) => {
                setSelectedInterviewCard(interviews.find((c) => c.id === id));
                setOpen(true);
              }}
            />
          ))}
          <DropIndicator beforeId={null} column={column} />
          {column === "calls" && <AddInterview setOpen={setOpen} />}
        </div>
      </div>
    </>
  );
};

export { Column };
