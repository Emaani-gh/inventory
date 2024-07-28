// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slices/userSlice";

// import stateProviderReducer from "./slices/stateProviderSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/es/storage";
// import inventoryReducer from "./pageSlice/inventory-slice";
// import allUsersReducer from "./pageSlice/all-users-slice";

// const persistConfig = {
//   key: "root",
//   storage: storage,
//   whitelist: ["userHolder"],
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     userHolder: userReducer,
//     stateProviderHolder: stateProviderReducer,
//     inventoryHolder: inventoryReducer,
//     allUsersHolder: allUsersReducer,
//   })
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import stateProviderReducer from "./slices/stateProviderSlice";
import inventoryReducer from "./pageSlice/inventory-slice";
import allUsersReducer from "./pageSlice/all-users-slice";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a noop storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Conditionally use localStorage or noop storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userHolder"],
};

const rootReducer = combineReducers({
  userHolder: userReducer,
  stateProviderHolder: stateProviderReducer,
  inventoryHolder: inventoryReducer,
  allUsersHolder: allUsersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
