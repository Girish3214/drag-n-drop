import { useAppState } from "../../store";

const InterviewList = () => {
  const interviewsList = useAppState((state) => state.interviewsList);
  console.log({ interviewsList });
  return <div></div>;
};

export { InterviewList };
