import { useState } from "react";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, googleProvider } from "../../services";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const [user, setUser] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log({ user });
  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result: UserCredential = await signInWithPopup(
        auth,
        googleProvider
      );
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        {/* Welcome Message */}
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Welcome
        </h1>
        <p className="text-sm text-center text-gray-400">
          Don't have an account yet?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Login
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
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
              loading ? "cursor-wait" : ""
            }`}
            disabled={loading}
            // className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none"
          >
            <span className="text-white text-lg">G</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Login };
