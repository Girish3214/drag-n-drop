export type TodoType = "todo" | "in-progress" | "done" | "not-selected";
export type Todo = {
  id: string;
  title: string;
  description: string;
  type: TodoType;
  createdTime: string;
  updatedTime: string;
};

export type TodoState = {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  interviewsList: Todo[];
  setInterviewsList: (interviewsList: Todo[]) => void;
};
