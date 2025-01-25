import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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
import { showToast } from "../../components/Toast";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
const Login = ({ type }: { type: "login" | "signup" }) => {
  const navigate = useNavigate();

  const setUser = useAppState((state) => state.setUser);
  const setIsSignedIn = useAppState((state) => state.setIsSignedIn);

  const [loading, setLoading] = useState<boolean>(false);

  const afterResult = (result: User) => {
    setUser(result);
    addUserToDataBase(result as User);
    setIsSignedIn(true);
    showToast({
      type: "success",
      message: "Successfully signed in",
    });
    navigate("/");
  };
  // Sign in with email and password
  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      let result;
      if (type === "signup") {
        result = await createUserWithEmail(values.email, values.password);
      } else {
        result = await signInWithEmail(values.email, values.password);
      }
      if (result) {
        afterResult(result);
      }
    } catch (error) {
      showToast({
        type: "error",
        message: "Error signing in",
      });

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
        if (!user) {
          showToast({
            type: "error",
            message: "Error signing in with Google",
          });
          return;
        } else {
          afterResult(user);
        }
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Error signing in with Google",
      });
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

        console.log("User is logged in:");
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
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSignIn(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-6">
              <>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-400"
                  >
                    Email address
                  </label>
                  <Field
                    name="email"
                    placeholder="Enter Email"
                    className="block w-full rounded-lg bg-gray-700 text-gray-200 border border-neutral-500 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {touched.email && errors.email && (
                    <div className="text-sm text-red-500 mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-400"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="block w-full rounded-lg bg-gray-700 text-gray-200 border border-neutral-500 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {touched.password && errors.password && (
                    <div className="text-sm text-red-500 mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  {type === "login" ? "Login" : "Sign Up"}
                </button>
              </>
            </Form>
          )}
          {/* Form */}
        </Formik>
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
