import { useEffect } from "react";
import { useAppState } from "../store";
import { dummyData } from "../utils/dummyData";
import { handleLogout } from "../services";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = useAppState((state) => state.user);
  const isSignedIn = useAppState((state) => state.isSignedIn);
  const setIsSignedIn = useAppState((state) => state.setIsSignedIn);
  const setInterviewsList = useAppState((state) => state.setInterviewsList);

  const handleSignOut = () => {
    handleLogout();
    setIsSignedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    setInterviewsList(dummyData);
  }, []);

  return (
    <div className="w-full p-4 flex justify-between items-center text-center shadow-md">
      <h1 className="text-2xl font-bold">Interview List</h1>
      {isSignedIn && <h3 className="cursor-pointer">{user?.email}</h3>}
      <button
        onClick={handleSignOut}
        className="block px-4 text-left text-red-600 hover:bg-gray-100 rounded-md"
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export { Header };
