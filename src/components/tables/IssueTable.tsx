import { type FC, memo } from 'react';

import { Table, TableBody } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

import TablePagination from '@/components/paginations/TablePagination';
import EmptyDemo from '@/components/empty/EmptyTable';
import IssueTableRow from '@/components/tables/IssueTableRow';

import type { FindAndCountIssues } from '@/repositories/issue/issue.repository';
import type { Issue } from '@/models/issue/issue.type';

import { generateId } from '@/utils/generateId';
import { VISIBLE_ISSUES_COUNT } from '@/consts';

export interface IssueTableProps {
    issues: FindAndCountIssues;
    currentPage: number;
    loading: boolean;
    notFound: boolean;
    onChangePage: (page: number) => void;
    onEdit: (issue: Issue) => void;
    onDelete: (id: string) => void;
}

const IssuesTable: FC<IssueTableProps> = ({
    issues,
    notFound,
    loading,
    onDelete,
    onEdit,
    currentPage,
    onChangePage,
}) => {
    const { data, pages } = issues;

    return (
        <>
            <Table className="relative border border-gray-200 border-solid h-120 p-4">
                <TableBody className="flex flex-col h-120 w-full">
                    {loading ? (
                        new Array(VISIBLE_ISSUES_COUNT).fill(1).map(() => (
                            <tr
                                key={generateId(5)}
                                className="flex w-full gap-y-2 flex-col justify-center h-1/3 px-10"
                            >
                                <td>
                                    <Skeleton className="h-4 w-3/4" />
                                </td>
                                <td>
                                    <Skeleton className="h-4 w-1/2" />
                                </td>
                                <td>
                                    <Skeleton className="h-4 w-1/2" />
                                </td>
                            </tr>
                        ))
                    ) : notFound ? (
                        <tr className="flex w-full gap-y-2 flex-col justify-center h-1/3 px-10">
                            <td>
                                <EmptyDemo title="issue" />
                            </td>
                        </tr>
                    ) : (
                        data.map((issue) => (
                            <IssueTableRow
                                key={issue.id}
                                issue={issue}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
            {pages > 1 && (
                <TablePagination
                    pages={pages}
                    onChangePage={onChangePage}
                    currentPage={currentPage}
                />
            )}
        </>
    );
};

export default memo(IssuesTable);
