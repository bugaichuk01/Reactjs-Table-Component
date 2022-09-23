import React, {useEffect} from 'react';
import {ITable} from "../types/ITable";
import {useTypedDispatch, useTypedSelector} from "../_hooks/redux/redux";
import {setColors, setItems} from "../store/reducers/table.slice";
import './Table.css';
import {Header} from "./Header/Header";

export const Table: React.FC<ITable> = ({items, sort, filters, onFilter, onSort, onBuy}) => {
    const data = useTypedSelector(state => state.table);
    const dispatch = useTypedDispatch();


    useEffect(() => {
        dispatch(setItems(items));
        onFilter(filters);
        onSort(sort);
        data.colors.length < 4 && items.map((el) => dispatch(setColors(el)));
    }, [])

    useEffect(() => {
    }, [])

    return (
        <>
            <Header data={data} onFilter={onFilter} onSort={onSort}/>

            <div>
                {data.filtered.map((item) => (
                    <div
                        className='rounded d-flex align-items-center p-4 m-3'
                        style={{backgroundColor: `${data.colors[item.id - 1].bgColor}`}}
                        key={item.id}
                    >
                        <div className='row w-100'>
                            <div className=' col d-flex align-items-center'>
                                <div className={'sign d-flex'}
                                    style={{
                                        backgroundColor: `${data.colors[item.id - 1].colorSign}`,
                                        boxShadow: `0px 0px 10px 0px ${data.colors[item.id - 1].colorSign}`,
                                    }}
                                ></div>
                                <p>{item.name}</p>
                            </div>
                            <div className='col'>
                                <p>{item.type}</p>
                            </div>
                            <div className='col'>
                                <p>{item.conditions}</p>
                            </div>
                            <div className='col'>
                                <p>$ {item.volume}</p>
                            </div>
                            <div className='col'>
                                <p>{item.roi}</p>
                            </div>
                            <div className='col'>
                                <p>{item.free}</p>
                            </div>
                            <div className='col'>
                                <p>{item.hedge}</p>
                            </div>
                        </div>
                          <div style={{cursor: 'pointer'}} onClick={() => onBuy(item.id)}
                               className='p-2 px-4 rounded button_buy'>
                            <p>Buy</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

