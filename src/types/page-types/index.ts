import { Todo, TodoType } from "../../types";

export type ColumnType = {
  title: string;
  headingColor: string;
  interviews: Todo[];
  column: TodoType;
  setInterviewsList: (interviewsList: Todo[]) => void;
};
