import { kFirebaseError, kSuccess } from "@/constants";
import { auth, realtimeDb, rtRef } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue } from "firebase/database";

export const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
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


// export const newLoginLoginAction = async (e) => {
//   const employeeRef = rtRef(realtimeDb, "employees");

//   onValue(employeeRef, (snapshot) => {
//     Object.entries(snapshot.val()).map(([key, employeeDetail]) => {
//       console.log("emp", employeeDetail);
//       // if (employeeDetail.userUid === userId) {
//       //   setCurrentDetail(employeeDetail);
//       // }
//     });

//     return kSuccess;
//   });
// };

export const checkUserExistence = async (userEmailAddress) => {
  // return new Promise((resolve, reject) => {
  //   const employeeRef = rtRef(realtimeDb, "employees");

  //   onValue(employeeRef, (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       console.log("snapshot.val()", snapshot.val());
  //       // const keys = Object.keys(snapshot.val()).filter((employee) =>
  //       //   console.log("emp", employee)
  //       // );
  //       resolve(keys);
  //     } else {
  //       reject(new Error("Snapshot value is null"));
  //     }
  //   });
  // });

  const employeeRef = rtRef(realtimeDb, "employees");

  onValue(employeeRef, (snapshot) => {
    console.log("snapshot", snapshot.val());
  });
};

// roleName === userEmailAddress;
