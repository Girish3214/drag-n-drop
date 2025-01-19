import { Todo } from "../types";

export const dummyData = [
  {
    id: "1",
    title: "Title 1",
    description: "Description 1",
    type: "todo",
    createdTime: "2023-01-01",
    updatedTime: "2023-01-01",
  },
  {
    id: "2",
    title: "Title 2",
    description: "Description 2",
    type: "in-progress",
    createdTime: "2023-01-02",
    updatedTime: "2023-01-02",
  },
  {
    id: "3",
    title: "Title 3",
    description: "Description 3",
    type: "done",
    createdTime: "2023-01-01",
    updatedTime: "2023-01-02",
  },
  {
    id: "4",
    title: "Title 4",
    description: "Description 4",
    type: "todo",
    createdTime: "2023-01-03",
    updatedTime: "2023-01-03",
  },
  {
    id: "5",
    title: "Title 5",
    description: "Description 5",
    type: "in-progress",
    createdTime: "2023-01-04",
    updatedTime: "2023-01-04",
  },
  {
    id: "6",
    title: "Title 6",
    description: "Description 6",
    type: "not-selected",
    createdTime: "2023-01-03",
    updatedTime: "2023-01-03",
  },
] as Todo[];
