export type InterviewCategoryType =
  | "calls"
  | "in-progress"
  | "done"
  | "not-selected";
export type InterviewType = {
  id: string;
  companyName: string;
  description: string;
  type: InterviewCategoryType;
  nextInterviewDate: string;
  createdTime: string;
  updatedTime: string;
  salaryDiscuss: string;
  salaryRange: string;
  rounds: { experience: string }[];
};

export type TodoState = {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  interviewsList: InterviewType[];
  setInterviewsList: (interviewsList: InterviewType[]) => void;
};

export type JobCardType = InterviewType & {
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    interview: {
      id: string;
      companyName: string;
    }
  ) => void;
  column?: string;
  handleSelectedData: (id: string) => void;
};

export type ModalProps = {
  onClose: (showModal: boolean) => void;
  children: React.ReactNode;
  open: boolean;
  title?: string;
};
