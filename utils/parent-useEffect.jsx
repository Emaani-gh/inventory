import {
  loadInventory,
  loadInventoryCategory,
} from "@/redux/pageSlice/inventory-slice";
import { useEffect } from "react";
import { realtimeDb, rtRef } from "./firebase";
import { onValue } from "firebase/database";
import { loadAllUsers } from "@/redux/pageSlice/all-users-slice";

export const parentLayoutEffects = (dispatch) => {
  // /////////////////////////////////////////////////////
  // /////////////// Inventory Category Database //////////////////
  useEffect(() => {
    const usersRef = rtRef(realtimeDb, "users");

    onValue(usersRef, (snapshot) => {
      dispatch(loadAllUsers(snapshot.val()));
    });
  }, []);


  // /////////////////////////////////////////////////////
  // /////////////// Inventory Category Database //////////////////
  useEffect(() => {
    const inventoryRef = rtRef(realtimeDb, "inventory");

    onValue(inventoryRef, (snapshot) => {
      dispatch(loadInventory(snapshot.val()));
    });
  }, []);

  // /////////////////////////////////////////////////////
  // /////////////// Inventory Category Database //////////////////
  useEffect(() => {
    const expenseCategoryRef = rtRef(realtimeDb, "inventoryCategory");

    onValue(expenseCategoryRef, (snapshot) => {
      dispatch(loadInventoryCategory(snapshot.val()));
    });
  }, []);
};
