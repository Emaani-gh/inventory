import { kFirebaseError, kSuccess } from "@/constants";
import { auth, realtimeDb, rtRef } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { set } from "firebase/database";

export const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    if (user) {
      return kSuccess;
    }
  } catch (error) {
    return error;
  }
};

export const createNewUserAccount = async (
  email,
  password,
  confirmPassword
) => {
  if (password === confirmPassword) {
    try {
      const result = await axios.post(`/api/create-new-user-account`, {
        email,
        password,
      });
      return result;
    } catch (error) {
      console.log("error new user", error.response);
      return error.response;
    }
  } else {
    return { status: 500, data: "Passwords do not match" };
  }
};

export const employeeHandler = async (e, userUid, emailAddress) => {
  const form = e.target;

  const formData = new FormData(form);

  const formValues = {};

  for (let [name, value] of formData.entries()) {
    if (name.includes("password")) {
    } else {
      formValues[name] = value;
    }
  }

  formValues["userUid"] = userUid;

  if (emailAddress) {
    formValues["emailAddress"] = emailAddress;
  }

  try {
    // Update the employee data in the Realtime Database
    await set(rtRef(realtimeDb, `/users/${userUid}`), formValues);

    return kSuccess;
  } catch (error) {
    // Handle any errors that occur during data storage
    alert(error?.message);
  }
};
