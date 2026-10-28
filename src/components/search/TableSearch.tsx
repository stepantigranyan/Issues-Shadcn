import {
    type ChangeEvent,
    type FC,
    memo,
    useCallback,
    useRef,
    useState,
} from 'react';
import { Search, MoveUp, MoveDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ItemTitle } from '@/components/ui/item';
import { debounce } from '@/utils/debounce';

export interface IssuesTableSearchProps {
    onSort: (type: 'ASC' | 'DESC' | undefined) => void;
    onSearch: (input: string) => void;
}

const TableSearch: FC<IssuesTableSearchProps> = ({ onSort, onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [ascSort, setAscSort] = useState<boolean>(false);
    const [descSort, setDescSort] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (input: string) => {
        onSearch(input);
    };

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
    };

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
    };

    const handleInput = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.currentTarget;
            setQuery(value);
            debSearch(value);
        },
        [ascSort, descSort],
    );

    const handleSearchButtonClick = () => {
        ref.current?.focus();
    };

    return (
        <div className="flex justify-between items-center w-full">
            <form className="flex items-center gap-x-2">
                <Button
                    onClick={handleSearchButtonClick}
                    className="cursor-pointer"
                    size="icon"
                >
                    <Search />
                </Button>
                <div className="relative">
                    <Input
                        ref={ref}
                        value={query}
                        onChange={handleInput}
                        name="search"
                        placeholder="Search..."
                    />
                    {query && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                            onClick={() => {
                                setQuery('');
                                onSearch('');
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </form>
            <div className="flex items-center gap-x-2">
                <ItemTitle>Sort</ItemTitle>
                <div className="flex items-center gap-x-1">
                    <label
                        htmlFor="DESC"
                        className="cursor-pointer p-1 rounded-md transition-all duration-100 hover:bg-gray-100 has-checked:bg-gray-200"
                    >
                        <span>
                            <MoveDown size="15" />
                        </span>
                        <input
                            onChange={handleDescSortClick}
                            type="checkbox"
                            id="DESC"
                            className="hidden"
                            name="sort"
                            checked={descSort}
                        />
                    </label>
                    <label
                        htmlFor="ASC"
                        className="cursor-pointer p-1 rounded-md transition-all duration-100 hover:bg-gray-100 has-checked:bg-gray-200"
                    >
                        <span>
                            <MoveUp size="15" />
                        </span>
                        <input
                            onChange={handleAscSortClick}
                            type="checkbox"
                            id="ASC"
                            className="hidden"
                            name="sort"
                            checked={ascSort}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default memo(TableSearch);
