import React from 'react';
import {useParams} from 'react-router-dom';
import {useTypedSelector} from "../../_hooks/redux/redux";

export const Item = () => {
    const {id} = useParams();
    const {items} = useTypedSelector(state => state.table)
    const currentItem = items.find(item => item.id === Number(id))

    return (
        <div className='container d-flex justify-content-between'>
            <span>{currentItem?.name}</span>
            <span>{currentItem?.type}</span>
            <span>{currentItem?.conditions}</span>
            <span>${currentItem?.volume}</span>
            <span>{currentItem?.roi}</span>
            <span>{currentItem?.free}</span>
            <span>{currentItem?.hedge}</span>
        </div>
    );
}

