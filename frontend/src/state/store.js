import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import marketReducer from './MarketSlice/marketSlice';
import tradeReducer from './TradeSlice/tradeSlice';
import logger from 'redux-logger'

const store = configureStore({
  reducer: {
    market: marketReducer,
    trade: tradeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
},
);
export default store  
