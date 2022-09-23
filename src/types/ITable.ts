export interface ITable {
    items: IItem[];
    filters: IFilter;
    sort: string;
    onFilter: (value: IFilter) => void
    onSort: (value: string) => void
    onBuy: (value: number) => void
}

export interface IItem {
    id: number;
    name: string;
    status: string;
    type: string;
    conditions: string;
    volume: number;
    roi: number;
    free: number;
    hedge: number;
}

export interface IFilter {
    status?: string;
    type?: string;
}
