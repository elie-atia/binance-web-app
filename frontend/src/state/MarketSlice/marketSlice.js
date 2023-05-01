  import { createSlice } from '@reduxjs/toolkit';

  const initialState = {
    market_pairs: [],
    active_market: [],  
    status: 'idle',
  };
    
  export const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
      update_market_pairs: (state = {}, action) => {
        state.market_pairs = action.payload
      },
      set_active_market: (state = {}, action) => {
        state.active_market = action.payload
      },
    },
  });

  export const { update_market_pairs, set_active_market } = marketSlice.actions;

  export default marketSlice.reducer;
