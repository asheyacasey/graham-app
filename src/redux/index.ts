import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

export type TRootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
const { dispatch } = store;
const persistor = persistStore(store);

export { persistor, store, dispatch };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type
export type AppDispatch = typeof store.dispatch;