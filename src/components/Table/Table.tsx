import React, {useEffect} from 'react';
import {ITable} from "../../types/ITable";
import {useTypedDispatch, useTypedSelector} from "../../_hooks/redux/redux";
import {setColors} from "../../store/reducers/table.slice";
import './Table.css';
import {Header} from "../Header/Header";
import {Link} from 'react-router-dom';

export const Table: React.FC<ITable> = ({items, sort, filters, onFilter, onSort, onBuy}) => {
    const data = useTypedSelector(state => state.table);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        onFilter(filters);
        onSort(sort);
    }, [])

    data.colors.length < 4 && items.map((el) => dispatch(setColors(el)));

    return (
        <>
            <Header data={data} onFilter={onFilter} onSort={onSort}/>

            <div>
                {data.filtered.map((item) => (
                    <Link key={item.id} to={`/project/${item.id}`}>
                        <div
                            className='rounded d-flex align-items-center p-4 m-3'
                            style={{backgroundColor: `${data.colors.find(colors => item.id === colors.id)?.bgColor}`}}
                            key={item.id}
                        >
                            <div className='row w-100'>
                                <div className=' col d-flex align-items-center'>
                                    <div className='sign d-flex'
                                         style={{
                                             backgroundColor: `${data.colors.find(colors => item.id === colors.id)?.colorSign}`,
                                             boxShadow: `0px 0px 10px 0px ${data.colors.find(colors => item.id === colors.id)?.colorSign}`,
                                         }}
                                    />
                                    <p>{item.name}</p>
                                </div>
                                <div className='col'><p>{item.type}</p></div>
                                <div className='col'><p>{item.conditions}</p></div>
                                <div className='col'><p>$ {item.volume}</p></div>
                                <div className='col'><p>{item.roi}</p></div>
                                <div className='col'><p>{item.free}</p></div>
                                <div className='col'><p>{item.hedge}</p></div>
                            </div>
                            <div style={{cursor: 'pointer'}} onClick={(e) => onBuy(item.id)}
                                 className='p-2 px-4 rounded button_buy'>
                                <p>Buy</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

