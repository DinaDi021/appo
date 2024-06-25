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
  adminReducer,
  appointmentsReducer,
  authReducer,
  cartsReducer,
  filtersReducer,
  imagesReducer,
  progressReducer,
  schedulesReducer,
  servicesReducer,
  usersReducer,
} from "./slice";

const rootReducer = combineReducers({
  auth: authReducer,
  progress: progressReducer,
  users: usersReducer,
  appointments: appointmentsReducer,
  schedules: schedulesReducer,
  carts: cartsReducer,
  filters: filtersReducer,
  services: servicesReducer,
  images: imagesReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: "persist-key",
  storage,
  whitelist: [
    "auth",
    "appointments",
    "schedules",
    "carts",
    "filters",
    "services",
    "images",
  ],
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
