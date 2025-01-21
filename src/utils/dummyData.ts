import { InterviewType } from "../types";

export const dummyData = [
  {
    id: "1",
    companyName: "companyName 1",
    description: "Description 1",
    type: "calls",
    createdTime: "2023-01-01",
    updatedTime: "2023-01-01",
    nextInterviewDate: "2023-01-01",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
    ],
  },
  {
    id: "2",
    companyName: "companyName 2",
    description: "Description 2",
    type: "in-progress",
    createdTime: "2023-01-02",
    updatedTime: "2023-01-02",
    nextInterviewDate: "2023-01-02",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
      {
        experience: "NA - 2",
      },
    ],
  },
  {
    id: "3",
    companyName: "companyName 3",
    description: "Description 3",
    type: "done",
    createdTime: "2023-01-01",
    updatedTime: "2023-01-02",
    nextInterviewDate: "2023-01-03",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
      {
        experience: "NA - 2",
      },
      {
        experience: "NA - 3",
      },
    ],
  },
  {
    id: "4",
    companyName: "companyName 4",
    description: "Description 4",
    type: "calls",
    createdTime: "2023-01-03",
    updatedTime: "2023-01-03",
    nextInterviewDate: "2023-01-03",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
      {
        experience: "NA - 2",
      },
      {
        experience: "NA - 3",
      },
    ],
  },
  {
    id: "5",
    companyName: "companyName 5",
    description: "Description 5",
    type: "in-progress",
    createdTime: "2023-01-04",
    updatedTime: "2023-01-04",
    nextInterviewDate: "2023-01-04",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
    ],
  },
  {
    id: "6",
    companyName: "companyName 6",
    description: "Description 6",
    type: "not-selected",
    createdTime: "2023-01-03",
    updatedTime: "2023-01-03",
    nextInterviewDate: "2023-01-04",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
    ],
  },
  {
    id: "7",
    companyName: "companyName 7",
    description: "Description 7",
    type: "not-selected",
    createdTime: "2023-01-04",
    updatedTime: "2023-01-04",
    nextInterviewDate: "2023-01-04",
    salaryDiscuss: "20L",
    salaryRange: "20L - 30L",
    rounds: [
      {
        experience: "NA",
      },
      {
        experience: "NA - 2",
      },
      {
        experience: "NA - 3",
      },
      {
        experience: "NA - 4",
      },
      {
        experience: "NA - 5",
      },
    ],
  },
] as InterviewType[];
