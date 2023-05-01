import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import marketReducer from './MarketSlice/marketSlice';
import tradeReducer from './TradeSlice/tradeSlice';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    market: marketReducer,
    trade: tradeReducer,
  },
},
applyMiddleware(logger)
);
export default store  
