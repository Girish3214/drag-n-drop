export type TodoType = "calls" | "in-progress" | "done" | "not-selected";
export type Todo = {
  id: string;
  title: string;
  description: string;
  type: TodoType;
  nextInterviewDate: string;
  createdTime: string;
  updatedTime: string;
};

export type TodoState = {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  interviewsList: Todo[];
  setInterviewsList: (interviewsList: Todo[]) => void;
};

export type JobCardType = Todo & {
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    interview: {
      id: string;
      title: string;
    }
  ) => void;
};

export type ModalProps = {
  onClose: (showModal: boolean) => void;
  children: React.ReactNode;
  open: boolean;
};
