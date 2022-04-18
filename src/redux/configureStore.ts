import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {listReducer} from './reducers/listReducers';
import {userReducer} from './reducers/userReducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const getPersistedConfig = (key: string) => {
  return {key, storage: AsyncStorage};
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['list'],
};

const listConfig = {
  key: 'list',
  storage: AsyncStorage,
  blacklist: ['list'],
};

const userConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  list: persistReducer(listConfig, listReducer),
  user: persistReducer(userConfig, userReducer),
});

const rootReducer = (state: any, action: any) => {
  return appReducer({...state}, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>;

sagaMiddleware.run(rootSaga);
