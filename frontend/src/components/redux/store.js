import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";

const persistConfig = {//user feild ne local store ma rakhva 
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // Change this to specifically persist the user field
  debug: true,
};

// First persist the auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // FLUSH → Local storage માં changes લખવા માટે.
// REHYDRATE → Stored data ને Redux store માં પાછું લાવવા માટે.
// PAUSE → Persisted state updates થવા બંધ કરવા.
// PERSIST → State ને persist (save) કરવા માટે.
// PURGE → Local storage માંથી stored state ને કાઢી નાખવા.
// REGISTER → Persisted reducers ને register કરવા.
      },
    }),
  // Add this to ensure initial state is properly structured
  preloadedState: {
    auth: {
      loading: false,
      user: null,
    },
  },
});

// Create persistor after store is created
export const persistor = persistStore(store);

// Debug listener
store.subscribe(() => {
  const state = store.getState();
  console.log("State updated:", state);
  console.log("LocalStorage:", localStorage.getItem("persist:root"));
});

export default store;
