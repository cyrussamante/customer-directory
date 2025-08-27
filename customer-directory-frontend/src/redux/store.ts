import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage


const persistConfig = {
  key: 'app',
  storage,
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: {
    app: persistedAppReducer,
  },
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;