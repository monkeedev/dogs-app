import {RootState} from './configureStore';

export const getDogsCatalog = (state: RootState) => state.list;
export const getUserStorage = (state: RootState) => state.user;
