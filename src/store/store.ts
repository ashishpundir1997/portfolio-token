import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { coingeckoApi } from "./services/tokenApi";
import watchlistReducer from "./slices/watchlistSlice";



const persistConfig = {
  key: "root",
  storage,
  whitelist: ["watchlist"], // Only persist watchlist data
};

const rootReducer = combineReducers({
  [coingeckoApi.reducerPath]: coingeckoApi.reducer,
  watchlist: watchlistReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      coingeckoApi.middleware
    ),
});

export const purgeStore = () => {
  store.dispatch({ type: PURGE });
};

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
