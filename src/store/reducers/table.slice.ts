import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFilter, IItem} from "../../types/ITable";
import {mockData} from "../../mock/mockData";

interface ITableState {
    items: IItem[];
    filtered: IItem[];
    filters: IFilter;
    sortConfig: string;
    colors: {
        bgColor: string;
        colorSign: string;
        id: number;
    }[]
}

const initialState: ITableState = {
    items: mockData,
    filtered: mockData,
    filters: {status: 'All', type: 'All'},
    sortConfig: '-name',
    colors: []
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<IFilter>) {
            state.filters = action.payload;

            state.filtered = state.items.filter(item => (
                (state.filters.status === 'All' || item.status === state.filters.status)
                && (state.filters.type === 'All' || item.type === state.filters.type)
            ))
        },
        sortData(state, action: PayloadAction<any>) {
            const key = action.payload[0] === '-' ? action.payload.substring(1) : action.payload;

            if (state.sortConfig === action.payload && state.sortConfig[0] !== '-') {
                state.sortConfig = '-' + action.payload
            } else state.sortConfig = action.payload;

            state.filtered = state?.filtered?.sort((a: any, b: any) => {
                if (a[key] < b[key]) return state.sortConfig[0] === '-' ? -1 : 1;
                if (a[key] > b[key]) return state.sortConfig[0] === '-' ? 1 : -1;
                return 0;
            })
        },
        setColors: (state, action: PayloadAction<IItem>) => {
            switch (action.payload.status) {
                case 'green': {
                    state.colors.push({
                        id: action.payload.id,
                        bgColor: "#e7fced",
                        colorSign: '#0ddc36'
                    })
                    break
                }
                case 'yellow': {
                    state.colors.push({
                        id: action.payload.id,
                        bgColor: "#fcffd8",
                        colorSign: "#d79f09"
                    })
                    break
                }
                case 'red': {
                    state.colors.push({
                        id: action.payload.id,
                        bgColor: "#ffe5e5",
                        colorSign: "#d93922"
                    })
                    break
                }
            }
        }
    }
});

export const {setFilters, sortData, setColors} = tableSlice.actions;

export default tableSlice.reducer;