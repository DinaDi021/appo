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

import { genreReducer, moviesReducer, progressReducer } from "./slice";

const rootReducer = combineReducers({
  movies: moviesReducer,
  genres: genreReducer,
  progress: progressReducer,
  // credits: creditsReducer,
  // searchMovies: searchMoviesReducer,
  // categoriesMovies: categoriesMoviesReducer,
  // themeSwitch: themeReducer,
});

const persistConfig = {
  key: "persist-key",
  storage,
  whitelist: ["movies", "credits", "categoriesMovies", "genres"],
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
