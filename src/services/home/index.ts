import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { InterviewType } from "../../types";
import { auth, db } from "../firebase";
import { showToast } from "../../components";

const addInterview = async (interview: InterviewType) => {
  try {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("User is not logged in or email is not available");
    }

    if (!interview.companyName) {
      throw new Error("Company name is not available");
    }

    // Replace spaces with underscores in the company name
    const companyNameSanitized = interview.companyName.replace(/ /g, "_");

    // Firestore path: users/{email}/{companyName}
    const interviewRef = doc(
      db,
      `users/${user.email}/interviews/${companyNameSanitized}`
    );

    // Check if the interview already exists
    const docSnapshot = await getDoc(interviewRef);

    if (docSnapshot.exists()) {
      throw new Error(
        `An interview for ${interview.companyName} already exists.`
      );
    }

    await setDoc(interviewRef, {
      ...interview,
      type: "calls",
      createdAt: new Date().toISOString(),
    });

    showToast({
      type: "success",
      message: "Interview added successfully",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as { message?: string })?.message || "Error adding interview";
    showToast({
      type: "error",
      message: errorMessage,
    });
    console.error("Error adding interview: ", error);
    return {
      message: `An interview for ${interview.companyName} already exists.`,
      type: "error",
    };
  }
};

const editInterview = async (interview: InterviewType) => {
  try {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("User is not logged in or email is not available");
    }

    if (!interview.companyName) {
      throw new Error("Company name is not available");
    }

    // Replace spaces with underscores in the company name
    const companyNameSanitized = interview.companyName.replace(/ /g, "_");

    // Firestore path: users/{email}/interviews/{companyName}
    const interviewRef = doc(
      db,
      `users/${user.email}/interviews/${companyNameSanitized}`
    );

    // Check if the interview document exists
    const docSnapshot = await getDoc(interviewRef);

    if (!docSnapshot.exists()) {
      throw new Error(
        `No interview found for ${interview.companyName} to edit.`
      );
    }
    // Update the interview data if it exists
    await updateDoc(interviewRef, {
      ...interview,
      updatedAt: new Date().toISOString(), // Optional: Store last updated time
    });

    showToast({
      type: "success",
      message: "Interview updated successfully",
    });
  } catch (error) {
    console.error("Error editing interview: ", error);
    showToast({
      type: "error",
      message: "Error editing interview",
    });
    return {
      message: `Error editing interview: No interview for ${interview.companyName} to edit.`,
      type: "error",
    };
  }
};

const deleteInterview = async (companyName: string) => {
  try {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("User is not logged in or email is not available");
    }

    if (!companyName) {
      throw new Error("Company name is not available");
    }

    // Firestore path: users/{email}/interviews/{companyName}
    const companyNameSanitized = companyName.replace(/ /g, "_");
    const interviewRef = doc(
      db,
      `users/${user.email}/interviews/${companyNameSanitized}`
    );

    // Delete the interview document
    await deleteDoc(interviewRef);

    showToast({
      type: "success",
      message: "Interview deleted successfully",
    });

    return true; // Return true when deletion is successful
  } catch (error) {
    console.error("Error deleting interview: ", error);
    showToast({
      type: "error",
      message: "Error deleting interview",
    });
    return false; // Return false if there's an error
  }
};

const fetchInterviews = async () => {
  try {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("User is not logged in or email is not available");
    }

    // Firestore path: users/{email}
    const interviewsRef = collection(db, `users/${user.email}/interviews`);

    // Get all documents under this collection
    const snapshot = await getDocs(interviewsRef);

    // Extract interview details from the snapshot
    const interviews: InterviewType[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id, // Document ID (company name)
          ...doc.data(), // Document data
        } as InterviewType)
    );

    return interviews; // Return the array of interviews
  } catch (error) {
    console.error("Error fetching interviews: ", error);
    return [];
  }
};

export { addInterview, fetchInterviews, editInterview, deleteInterview };
