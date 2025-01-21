import { Dispatch, SetStateAction } from "react";
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

export type ModalFormType = {
  onClose: (value: boolean) => void;
  onSubmit: (values: InterviewType) => void;
  initialData: InterviewType | null;
};

export type AddInterviewType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type DeleteInterviewType = InterviewActionButtonsType;
