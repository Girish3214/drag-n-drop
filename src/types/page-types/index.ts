import { InterviewType, InterviewCategoryType } from "../../types";

export type ColumnType = {
  title: string;
  headingColor: string;
  interviews: InterviewType[];
  column: InterviewCategoryType;
  setInterviewsList: (interviewsList: InterviewType[]) => void;
};

export type InterviewActionButtonsType = {
  interviewsList: InterviewType[];
  setInterviewsList: (interviewsList: InterviewType[]) => void;
};
export type AddInterviewType = InterviewActionButtonsType;

export type DeleteInterviewType = InterviewActionButtonsType;
