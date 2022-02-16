import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import {listReducers} from './reducers/listReducers';

// const sagaMiddleware = createSagaMiddleware();

const getPersistedConfig = (key: string) => {
  return {key, storage: AsyncStorage};
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  list: persistReducer(getPersistedConfig('list'), listReducers),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// sagaMiddleware.run()

export type RootState = ReturnType<typeof persistedReducer>;
