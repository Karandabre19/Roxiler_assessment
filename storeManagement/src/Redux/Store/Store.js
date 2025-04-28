import { combineReducers , configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "../Slices/AuthenticationSlice"

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["authentications"],
  };

  const rootReducer = combineReducers({
    Authentication : authReducer
  })

  const persistedReducer = persistReducer(persistConfig , rootReducer)

  const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });

export const persister = persistStore(store);
export default store;