import {combineReducers, configureStore} from '@reduxjs/toolkit'
import tableReducer from './reducers/table.slice';

const rootReducer = combineReducers({
    table: tableReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>