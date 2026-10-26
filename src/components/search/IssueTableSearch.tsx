import {Search} from 'lucide-react';
import {ListRestart} from 'lucide-react';
import {MoveUp} from 'lucide-react';
import {MoveDown} from 'lucide-react';

import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input";
import {ItemTitle} from "@/components/ui/item.tsx";
import {type ChangeEvent, type FC, memo, useState} from "react";
import {debounce} from "@/utils/debounce";

export interface IssuesTableSearchProps {
    onSort: (type: "ASC" | "DESC" | undefined) => void;
    onSearch: (input: string) => void;
    onReset: () => void;
}

const IssueTableSearch: FC<IssuesTableSearchProps> = ({onSort, onSearch, onReset}) => {
    const [title, setName] = useState<string>('');
    const [ascSort, setAscSort] = useState<boolean>(false);
    const [descSort, setDescSort] = useState<boolean>(false);

    const handleSubmit = () => {
        onSearch(title);
    }

    const debSearch = debounce(handleSubmit, 1000);

    const handleAscSortClick = () => {
        if (descSort) {
            setDescSort(false);
        }

        if (ascSort) {
            onSort(undefined);
            setAscSort(false);
            return;
        }


        onSort('ASC');
        setAscSort(true);
    }

    const handleDescSortClick = () => {
        if (ascSort) {
            setAscSort(false);
        }

        if (descSort) {
            onSort(undefined);
            setDescSort(false);
            return;
        }

        onSort('DESC');
        setDescSort(true);
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setName(value);
        debSearch();
    }


    return (
        <div className="flex justify-between items-center w-full">
            <form action={handleSubmit} className="flex items-center gap-x-2">
                <Input value={title} onChange={handleInput} name="search" placeholder="Search..." />
                <Button type="submit" className="cursor-pointer" size="icon"><Search/></Button>
                <Button variant="outline" onClick={() => {
                    setName('');
                    onReset();
                }} className="cursor-pointer" size="icon"><ListRestart/></Button>
            </form>
            <div className={'flex items-center gap-x-2'}>
                <ItemTitle>Sort</ItemTitle>
                <div className={'flex items-center gap-x-1'}>
                    <label htmlFor="DESC" className={'cursor-pointer p-1 rounded-md transition-all duration-100 hover:bg-gray-100 has-checked:bg-gray-200'}>
                        <span><MoveDown size={15}/></span>
                        <input onChange={handleDescSortClick} type="checkbox" id='DESC' className={'hidden'} name={'sort'} checked={descSort}/>
                    </label>
                    <label htmlFor="ASC" className={'cursor-pointer p-1 rounded-md transition-all duration-100 hover:bg-gray-100 has-checked:bg-gray-200'}>
                        <span><MoveUp size={15} /></span>
                        <input onChange={handleAscSortClick} type="checkbox" id='ASC' className={'hidden'} name={'sort'} checked={ascSort}/>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default memo(IssueTableSearch);