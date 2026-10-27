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
import {generateId} from "@/utils/generateId";

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
            <Table className="relative border border-gray-200 border-solid h-120 p-4">
                <TableBody className="flex flex-col h-120 w-full">
                    {loading ?
                        new Array(3).fill(1).map(() => (
                            <tr key={generateId(5)} className={'flex w-full gap-y-2 flex-col justify-center h-1/3 px-10'}>
                                <td><Skeleton className={'h-4 w-3/4'}/></td>
                                <td><Skeleton className={'h-4 w-1/2'}/></td>
                                <td><Skeleton className={'h-4 w-1/2'}/></td>
                            </tr>
                        ))

                                // <tr className={'flex w-full gap-y-2 flex-col justify-center h-1/3 px-10'}>
                                //     <Skeleton className={'h-4 w-3/4'}/>
                                //     <Skeleton className={'h-4 w-1/2'}/>
                                //     <Skeleton className={'h-4 w-1/2'}/>
                                // </tr>
                                // <tr className={'flex w-full gap-y-2 flex-col justify-center h-1/3 px-10'}>
                                //     <Skeleton className={'h-4 w-3/4'}/>
                                //     <Skeleton className={'h-4 w-1/2'}/>
                                //     <Skeleton className={'h-4 w-1/2'}/>
                                // </tr>
                        :
                        data.map((issue) => (
                            <IssueTableRow key={issue.id} issue={issue} onEdit={onEdit} onDelete={onDelete}/>
                        ))}
                </TableBody>
                {
                    !loading && data.length  !== VISIBLE_ISSUES_COUNT && pages !== 1 &&
                    <TableFooter className={'absolute bottom-0 left-0 w-full h-20 flex items-center justify-center'}>
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