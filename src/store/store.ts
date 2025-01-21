import { create } from "zustand";
import { TodoState } from "../types";

const useAppState = create<TodoState>((set) => ({
  user: null,
  isSignedIn: true,
  interviewsList: [],
  setUser: (user) => set({ user }),
  setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
  setInterviewsList: (interviewsList) => set({ interviewsList }),
}));

export { useAppState };
