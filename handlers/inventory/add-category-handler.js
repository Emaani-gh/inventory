import { realtimeDb, rtRef } from "@/utils/firebase";
import { push,set } from "firebase/database";

export const inventoryCategoryHandler = async (e, categoryId) => {
  const form = e.target;

  const formData = new FormData(form);

  const formValues = {};

  for (let [name, value] of formData.entries()) {
    formValues[name] = value;
  }

  try {
    if (categoryId) {
      formValues["categoryId"] = categoryId;

      await set(
        rtRef(realtimeDb, `/inventoryCategory/${categoryId}`),
        formValues
      );
    } else {
      const expenseCategoryRef = push(rtRef(realtimeDb, "inventoryCategory"));

      const newCategoryId = expenseCategoryRef.key;

      formValues["categoryId"] = newCategoryId;

      await set(
        rtRef(realtimeDb, `/inventoryCategory/${newCategoryId}`),
        formValues
      );
    }

    return kSuccess;
  } catch (error) {
    console.log("error", error);
  }
};
