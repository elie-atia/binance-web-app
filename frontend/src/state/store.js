import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import marketReducer from './marketSlice';
import tradeReducer from './tradeSlice';
import logger from 'redux-logger'
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    market: marketReducer,
    trade: tradeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
},
);
export default store  
