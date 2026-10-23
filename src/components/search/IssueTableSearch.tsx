import {Search} from 'lucide-react';
import {ListRestart} from 'lucide-react'

import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import type {FC} from "react";

export interface IssuesTableSearchProps {
    onSort: (type: "ASC" | "DESC") => void;
    onSearch: (input: string) => void;
    onReset: () => void;
}

const IssueTableSearch: FC<IssuesTableSearchProps> = ({onSort, onSearch, onReset}) => {
    const handleSubmit = (formData: FormData) => {
        const name = formData.get("search")! as string;

        onSearch(name);
    }

    return (
        <div className="flex justify-between items-center w-full">
            <form action={handleSubmit} className="flex items-center gap-x-2">
                <Input name="search" placeholder="Search..." required={true} />
                <Button type="submit" className="cursor-pointer" size="icon"><Search/></Button>
                <Button variant="outline" onClick={onReset} className="cursor-pointer" size="icon"><ListRestart/></Button>
            </form>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" size="default">Options</Button>} />
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSort("ASC")}>Sort By A-Z</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSort("DESC")}>Sort By Z-A</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default IssueTableSearch;