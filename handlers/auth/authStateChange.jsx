import {
  setToggleLoginPageLoading,
  setToggleRootPageLoading,
} from "@/redux/slices/stateProviderSlice";
import { loginUser } from "@/redux/slices/userSlice";
import { auth, realtimeDb } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref as rTRef, set } from "firebase/database";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const userAuthStateChange = async (dispatch) => {
  const pathname = usePathname();
  const navigate = useRouter();
  const userUrls = useSelector((state) => state.userHolder.userUrls);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDetail = await fetchUserFromDatabase(currentUser.uid);

        if (userDetail) {
          dispatch(loginUser(userDetail));

          dispatch(setToggleRootPageLoading(false));

          if (pathname === "/") {
            if (userUrls) {
              navigate.replace(`/${userUrls[0]}`);
            }
          } else {
            navigate.replace(pathname);
          }
        }
      } else {
        navigate.replace("/");
        dispatch(setToggleLoginPageLoading(false));
      }
    });
  }, []);
};

export const userLoginAuthStateChange = async (dispatch) => {
  const pathname = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDetail = await fetchUserFromDatabase(currentUser.uid);

        if (userDetail) {
          dispatch(loginUser(userDetail));

          dispatch(setToggleRootPageLoading(false));

          if (pathname === "/") {
            console.log("We are in first if");

            navigate.replace(`/inventory`);
          } else {
            navigate.replace(pathname);
          }
        }
      } else {
        if (pathname === "/") {
          navigate.replace("/");
        } else if (pathname === "/sign-up") {
          navigate.replace("/sign-up");
        }else {
          navigate.replace("/");
        }
        dispatch(setToggleLoginPageLoading(false));
      }
    });
  });
};

export const fetchUserFromDatabase = async (uid) => {
  try {
    const userRef = rTRef(realtimeDb, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const user = snapshot.val();
      return user;
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return null;
  }
};
