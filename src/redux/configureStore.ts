import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import {listReducer} from './reducers/listReducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const getPersistedConfig = (key: string) => {
  return {key, storage: AsyncStorage};
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  list: persistReducer(getPersistedConfig('list'), listReducer),
});

const rootReducer = (state: any, action: any) => {
  return appReducer({...state}, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware)),
);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>;

sagaMiddleware.run(rootSaga);
