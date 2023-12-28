import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  appointmentsReducer,
  authReducer,
  cartsReducer,
  progressReducer,
  schedulesReducer,
  usersReducer,
} from "./slice";
import { filtersReducer } from "./slice/filtersSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  progress: progressReducer,
  users: usersReducer,
  appointments: appointmentsReducer,
  schedules: schedulesReducer,
  carts: cartsReducer,
  filters: filtersReducer,
});

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { persistor, store };
