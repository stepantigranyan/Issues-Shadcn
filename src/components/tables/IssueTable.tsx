import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableRow,
} from "@/components/ui/table";

import {
    Item,
    ItemTitle,
} from "@/components/ui/item";

import {Skeleton} from '@/components/ui/skeleton';

import IssueTablePagination from "@/components/paginations/IssueTablePagination.tsx";

import {type FC, memo} from "react";
import type {FindAndCountIssues} from "@/repositories/issue/issue.repository.ts";
import type {Issue} from "@/models/issue/issue.type.ts";
import {VISIBLE_ISSUES_COUNT} from "@/consts";
import IssueTableRow from "@/components/tables/IssueTableRow.tsx";

export interface IssueTableProps {
    issues: FindAndCountIssues;
    currentPage: number;
    loading: boolean;
    onChangePage: (direction: "right" | "left", page?: number) => void;
    onEdit: (issue: Issue) => void;
    onDelete: (id: string) => void;
}



const IssuesTable: FC<IssueTableProps> = ({issues, loading, onDelete, onEdit, currentPage, onChangePage}) => {
    const {data, pages} = issues;

    return (
        <>
            <Table className="border border-gray-200 border-solid h-105 p-4">
                <TableBody className="flex flex-col w-full">
                    {loading ?
                            <tr>
                                <td className={'flex w-full gap-y-2 flex-col justify-center h-35 px-10'}>
                                    <Skeleton className={'h-4 w-3/4'}/>
                                    <Skeleton className={'h-4 w-1/2'}/>
                                    <Skeleton className={'h-4 w-1/2'}/>
                                </td>
                                <td className={'flex w-full gap-y-2 flex-col justify-center h-35 px-10'}>
                                    <Skeleton className={'h-4 w-3/4'}/>
                                    <Skeleton className={'h-4 w-1/2'}/>
                                    <Skeleton className={'h-4 w-1/2'}/>
                                </td>
                                <td className={'flex w-full gap-y-2 flex-col justify-center h-35 px-10'}>
                                    <Skeleton className={'h-4 w-3/4'}/>
                                    <Skeleton className={'h-4 w-1/2'}/>
                                    <Skeleton className={'h-4 w-1/2'}/>
                                </td>
                            </tr>
                        :
                        data.map((issue) => (
                            <IssueTableRow key={issue.id} issue={issue} onEdit={onEdit} onDelete={onDelete}/>
                        ))}
                </TableBody>
                {
                    data.length  !== VISIBLE_ISSUES_COUNT && pages !== 1 &&
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
            {pages > 1 && <IssueTablePagination pages={pages} onChangePage={onChangePage} currentPage={currentPage}/>}
        </>

    );
};

export default memo(IssuesTable);