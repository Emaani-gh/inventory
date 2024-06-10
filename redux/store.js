import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

import stateProviderReducer from "./slices/stateProviderSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import inventoryReducer from './pageSlice/inventory-slice';
import allUsersReducer from "./pageSlice/all-users-slice";


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userHolder"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    userHolder: userReducer,
    stateProviderHolder: stateProviderReducer,
    inventoryHolder: inventoryReducer,
    allUsersHolder: allUsersReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
