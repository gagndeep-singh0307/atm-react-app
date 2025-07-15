import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import rootSaga from '../sagas/rootSaga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch