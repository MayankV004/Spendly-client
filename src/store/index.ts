import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice'
export const store = configureStore({
    reducer:{
        transactions:transactionReducer,
        
    }, 
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:['persist/PERSIST']
        },
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;