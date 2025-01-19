import { create } from "zustand";
import { TodoState } from "../types";

const useAppState = create<TodoState>((set) => ({
  isSignedIn: false,
  interviewsList: [],
  setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
  setInterviewsList: (interviewsList) => set({ interviewsList }),
}));

export { useAppState };
