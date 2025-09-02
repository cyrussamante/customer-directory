import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: 'app',
  storage,
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: {
    app: persistedAppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/PURGE',

        ],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;