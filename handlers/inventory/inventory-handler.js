import { kSuccess } from "@/constants";
import { realtimeDb, rtRef } from "@/utils/firebase";
import { push, set } from "firebase/database";

export const inventoryHandler = async (e, addedBy, itemId, date) => {
  const form = e.target;

  const formData = new FormData(form);

  const formValues = {};

  for (let [name, value] of formData.entries()) {
    formValues[name] = value;
  }

  try {
    if (itemId) {
      formValues["itemId"] = itemId;

      formValues["date"] = date;

      formValues["addedBy"] = addedBy;

      await set(rtRef(realtimeDb, `/inventory/${itemId}`), formValues);
    } else {
      const itemRef = push(rtRef(realtimeDb, "inventory"));

      const newItemId = itemRef.key;

      formValues["date"] = Date.now();

      formValues["addedBy"] = addedBy;

      formValues["itemId"] = newItemId;

      await set(rtRef(realtimeDb, `/inventory/${newItemId}`), formValues);
    }

    return kSuccess;
  } catch (error) {
    console.log("error", error);
  }
};
