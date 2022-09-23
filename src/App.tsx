import React from 'react';
import './App.css';
import {Table} from "./components/Table/Table";
import {setFilters, sortData} from "./store/reducers/table.slice";
import {IFilter} from "./types/ITable";
import {useTypedDispatch, useTypedSelector} from "./_hooks/redux/redux";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Item} from "./components/Item/Item";

function App() {
    const dispatch = useTypedDispatch();
    const {items, filters, sortConfig} = useTypedSelector(state => state.table);

    const onFilter = (value: IFilter) => {
        dispatch(setFilters(value));
    }

    const onSort = (value: string) => {
        dispatch(sortData(value));
    }

    const onBuy = (id: number) => {
        console.log(`Added ${id.toString()} component`)
    }

    return (
        <div className="App container mt-5">
            <Router>
                <Routes>
                    <Route path='/'
                           element={
                               <Table
                                   items={items}
                                   filters={filters}
                                   onFilter={onFilter}
                                   onSort={onSort}
                                   onBuy={onBuy}
                                   sort={sortConfig}
                               />}
                    />
                    <Route path='/project/:id' element={<Item/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
