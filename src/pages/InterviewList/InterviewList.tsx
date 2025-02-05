import { DeleteInterview } from "../../components";
import { useAppState } from "../../store";
import { Column } from "./Column";

const InterviewList = () => {
  const interviewsList = useAppState((state) => state.interviewsList);
  const setInterviewsList = useAppState((state) => state.setInterviewsList);
  return (
    <div className="flex h-screen w-full gap-3 overflow-auto p-12">
      <Column
        title="Phone Calls"
        column="calls"
        interviews={interviewsList}
        headingColor="text-yellow-200"
        setInterviewsList={setInterviewsList}
      />
      <Column
        title="In Progess"
        column="in-progress"
        interviews={interviewsList}
        headingColor="text-blue-200"
        setInterviewsList={setInterviewsList}
      />
      <Column
        title="Selected"
        column="done"
        interviews={interviewsList}
        headingColor="text-emerald-200"
        setInterviewsList={setInterviewsList}
      />
      <Column
        title="Not Selected"
        column="not-selected"
        interviews={interviewsList}
        headingColor="text-neutral-500"
        setInterviewsList={setInterviewsList}
      />
      <DeleteInterview
        interviewsList={interviewsList}
        setInterviewsList={setInterviewsList}
      />
    </div>
  );
};

export { InterviewList };
