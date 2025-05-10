import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';
import quotationReducer from '../redux/reducers/quotationSlice';

const persistConfig = {
    key: "root",
    storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, quotationReducer);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);