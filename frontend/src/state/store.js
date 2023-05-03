import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import marketReducer from './marketSlice';
import tradeReducer from './tradeSlice';
import logger from 'redux-logger'
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  market: marketReducer,
  trade: tradeReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   process.env.NODE_ENV !== 'production'
  //     ? getDefaultMiddleware().concat(logger)
  //     : getDefaultMiddleware(),
});

const persistor = persistStore(store);

export { store, persistor };
