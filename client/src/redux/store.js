
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import  userReducer  from '../redux/user/userSlice';
import themeReducer from "./theme/themeSlice.js";
import { persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { version } from 'react';


const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export const persistor = persistStore(store);