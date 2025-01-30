/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import scholarshipSlice from './scholarshipSlice';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';


// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };

const store = configureStore({
    reducer:{
        auth: authSlice,
        scholarship : scholarshipSlice
    }
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

//export const persistor = persistStore(store); // Export the persistor
export default store; // Export the store
