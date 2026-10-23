import { MoreHorizontalIcon } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableRow,
} from "@/components/ui/table";

import {
    Item,
    ItemDescription,
    ItemContent,
    ItemTitle,
} from "@/components/ui/item";

import {Button} from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Badge} from "@/components/ui/badge.tsx";


import {IssueTablePagination} from "@/components/paginations/IssueTablePagination.tsx";
import {type FC, memo} from "react";
import type {FindAndCountIssues} from "@/repositories/issue/issue.repository.ts";
import type {Issue} from "@/models/issue/issue.type.ts";
import {VISIBLE_ISSUES_COUNT} from "@/consts";
import IssueTableSearch from "@/components/search/IssueTableSearch.tsx";

export interface IssueTableProps {
    issues: FindAndCountIssues;
    currentPage: number;
    onChangePage: (direction: "right" | "left", page?: number) => void;
    onEdit: (issue: Issue) => void;
    onInfo: (issue: Issue) => void;
    onDelete: (issue: Issue) => void;
    onSort: (type: "ASC" | "DESC") => void;
    onSearch: (input: string) => void;
    onReset: () => void;
}

const IssuesTable: FC<IssueTableProps> = ({issues, onDelete, onEdit, currentPage, onChangePage, onSort,onInfo, onSearch, onReset}) => {
    const {data, count} = issues;

    const reset = () => {
        onReset();
        onChangePage("right", 1);
    }

    return (
        <>
            <IssueTableSearch onSort={onSort} onSearch={onSearch} onReset={reset}></IssueTableSearch>
            <Table className="border border-gray-200 border-solid h-105 p-4">
                <TableBody className="flex flex-col w-full">
                    {data.map((issue) => (
                        <TableRow className="w-full flex items-center justify-between h-35 hover:bg-transparent" key={issue.id}>
                            <TableCell>
                                <Item>
                                    <ItemContent>
                                        <div className="flex items-center gap-x-3">
                                            <ItemTitle className="overflow-visible">
                                                <h4 className="relative text-xl font-bold cursor-pointer after:absolute after:hidden after:content-[''] after:top-full after:left-0 after:w-full after:h-0.5 after:bg-gray-800 hover:after:block" onClick={() => {
                                                    onInfo(issue);
                                                    }
                                                }
                                                >
                                                    {issue.title.length > 20 ? `${issue.title.slice(0, 20)}...` : issue.title}
                                                </h4>
                                            </ItemTitle>
                                            <div className="flex items-center gap-x-2">
                                                {issue.labels.map((label) => (
                                                    <Badge key={label.id} variant="default" style={{backgroundColor: label.color}}>{label.name}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <ItemDescription className="w-2/3 whitespace-pre-wrap break-all line-clamp-3">{issue.description}</ItemDescription>
                                    </ItemContent>
                                </Item>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon"><MoreHorizontalIcon /></Button>} />
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => {onEdit(issue)}}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => {onDelete(issue)}} variant="destructive">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {
                    data.length  !== VISIBLE_ISSUES_COUNT && count !== 1 &&
                    <TableFooter>
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={2}>
                                <Item className="flex items-center justify-center">
                                    <ItemTitle className="text-center">No more issues</ItemTitle>
                                </Item>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                }
            </Table>
            {count > 1 && <IssueTablePagination count={count} onChangePage={onChangePage} currentPage={currentPage}/>}
        </>

    );
};

export default memo(IssuesTable);