import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  addUserToDataBase,
  auth,
  createUserWithEmail,
  signInWithEmail,
  signInWithGooglePopUp,
} from "../../services";
import { useAppState } from "../../store";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ type }: { type: "login" | "signup" }) => {
  const navigate = useNavigate();

  const setUser = useAppState((state) => state.setUser);
  const setIsSignedIn = useAppState((state) => state.setIsSignedIn);

  const [details, setDetails] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const afterResult = (result: User) => {
    setUser(result);
    addUserToDataBase(result as User);
    setIsSignedIn(true);
    navigate("/");
  };
  // Sign in with email and password
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      let result;
      if (type === "signup") {
        result = await createUserWithEmail(details.email, details.password);
      } else {
        result = await signInWithEmail(details.email, details.password);
      }
      if (result) {
        afterResult(result);
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };
  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGooglePopUp().then((user) => {
        afterResult(user);
      });
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is logged in, set the user state
        setUser(currentUser);
        setIsSignedIn(true);
        navigate("/");

        console.log("User is logged in:", currentUser);
      } else {
        // User is logged out
        setUser(null);
        console.log("No user is logged in");
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        {/* Welcome Message */}
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Welcome
        </h1>
        <p className="text-sm text-center text-gray-400">
          {type === "login"
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            to={type === "login" ? "/signup" : "/login"} // Use Link for navigation
            className="text-blue-500 hover:underline"
          >
            {type === "login" ? "Sign up" : "Login"}
          </Link>
        </p>

        {/* Form */}
        <form className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="email address"
              value={details.email}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={details.password}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={(e) => handleSignIn(e)}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* OR Separator */}
        <div className="flex items-center justify-center my-4">
          <hr className="w-1/3 border-gray-600" />
          <span className="text-gray-400 text-sm mx-2">OR</span>
          <hr className="w-1/3 border-gray-600" />
        </div>

        {/* Social Login */}
        <div className="flex justify-around">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={`w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none ${
              loading ? "cursor-wait" : ""
            }`}
            disabled={loading}
          >
            <span className="text-white text-lg">G</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Login };
