  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const initialState = {
    market_pairs: [],
    active_market: [],  
    status: 'idle',
  };
    


  export const marketSlice = createSlice({
    name: 'market',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
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



  // We can also write thunks by hand, which may contain both sync and async logic.
  // Here's an example of conditionally dispatching actions based on current state.


  export default marketSlice.reducer;
  // const market_pairs = useSelector((state) => state.market.market_pairs)
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const incrementValue = Number(incrementAmount) || 0;

  // useEffect(() => {
  //   dispatch(update_market_pairs({
  //     filtered_pairs: ['BTCUSDT', 'ETHUSDT'],
  //     market: 'USDT'
  //   })
  //   );
  // }, []);