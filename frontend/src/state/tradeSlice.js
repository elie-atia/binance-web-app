import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ticker: [],
  depth: [],  
  trades: [],
  status: 'idle',
};

export const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    set_ticker: (state = {}, action) => {
      state.ticker = action.payload
    },
    set_depth: (state = {}, action) => {
      state.depth = action.payload
    },
    set_trades: (state, action) => {
      state.trades =  (state.trades.concat(action.payload)).slice(-100);
    },
  },
});

export const { set_ticker, set_depth, set_trades } = tradeSlice.actions;

export default tradeSlice.reducer;
