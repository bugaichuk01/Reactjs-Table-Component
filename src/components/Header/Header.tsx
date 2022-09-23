import React, {ChangeEvent} from "react";
import {IItem} from "../../types/ITable";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import {RiArrowUpDownFill} from "react-icons/ri";

export const Header = ({data, onFilter, onSort}: any) => {

    const icon = (name: string) => {
        return data.sortConfig === `-${name}`
            ? <AiFillCaretDown/> : data.sortConfig === name
                ? <AiFillCaretUp/> : <RiArrowUpDownFill/>
    }

    const filters = {
        status: new Set(),
        type: new Set(),
    }

    data.items.map((item: IItem) => {
        filters.status.add(item.status);
        filters.type.add(item.type);
        return item;
    })

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilter({...data.filters, status: e.target.value})
    }

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilter({...data.filters, type: e.target.value})
    }

    return (
        <div className='row container d-flex align-items-center p-3 fs-6'>
            <div className='col-sm-2 fw-semibold text-secondary d-flex align-items-center'>
                <select className='form-select' value={data.filters.status} onChange={handleStatusChange}>
                    <option value="All">All</option>
                    {Array.from(filters.status).map(item => <option key={`${item}`} value={`${item}`}>{`${item}`}</option>)}
                </select>
                <span className='px-3'>Project</span>
                <span style={{cursor: 'pointer'}} onClick={() => onSort('name')}>
                    {icon('name')}
                </span>
            </div>

            <div className='col-sm-2 fw-semibold text-secondary d-flex align-items-center'>
                <select className='form-select w-100' value={data.filters.type} onChange={handleTypeChange}>
                    <option value="All">All</option>
                    {Array.from(filters.type).map(item => <option key={`${item}`} value={`${item}`}>{`${item}`}</option>)}
                </select>
                <span className='px-3 w-100'>Token</span>
            </div>

            <div className='col-sm-1 fw-semibold text-secondary'>Conditions</div>
            <div className='col fw-semibold text-secondary'>
                <span className='px-3'>Volume</span>
                <span style={{cursor: 'pointer'}} onClick={() => onSort('volume')}>
                          {icon('volume')}
                </span>
            </div>
            <div className='col fw-semibold text-secondary'>ROI</div>
            <div className='col fw-semibold text-secondary'>Free float</div>
            <div className='col fw-semibold text-secondary'>Insurance hedge</div>
            <div className='col-sm-1 fw-semibold text-secondary' />
        </div>
    );
}