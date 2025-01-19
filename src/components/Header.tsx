import { useEffect } from "react";
import { useAppState } from "../store";
import { dummyData } from "../utils/dummyData";

const Header = () => {
  const isSignedIn = useAppState((state) => state.isSignedIn);
  const setIsSignedIn = useAppState((state) => state.setIsSignedIn);
  const setInterviewsList = useAppState((state) => state.setInterviewsList);

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  useEffect(() => {
    setInterviewsList(dummyData);
  }, []);

  return (
    <div className="w-full p-4 flex justify-between items-center text-center shadow-md">
      <h1 className="text-2xl font-bold">Interview List</h1>
      {isSignedIn && <h3 className="cursor-pointer">Profile</h3>}
      <button
        onClick={isSignedIn ? handleSignOut : () => setIsSignedIn(true)}
        className="block px-4 text-left text-red-600 hover:bg-gray-100 rounded-md"
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export { Header };
