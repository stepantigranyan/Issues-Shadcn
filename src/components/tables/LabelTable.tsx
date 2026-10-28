import { type FC, memo } from 'react';

import { Table, TableBody } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

import TablePagination from '@/components/paginations/TablePagination';
import EmptyDemo from '@/components/empty/EmptyTable';
import LabelTableRow from '@/components/tables/LabelTableRow';

import type { Label } from '@/models/label/label.type';
import type { FindAndCountLabels } from '@/repositories/label/label.repository';

import { generateId } from '@/utils/generateId';

export interface IssueTableProps {
    labels: FindAndCountLabels;
    currentPage: number;
    loading: boolean;
    notFound: boolean;
    onChangePage: (direction: 'right' | 'left', page?: number) => void;
    onEdit: (label: Label) => void;
    onDelete: (id: string) => void;
}

const LabelTable: FC<IssueTableProps> = ({
    labels,
    loading,
    notFound,
    onDelete,
    onEdit,
    currentPage,
    onChangePage,
}) => {
    const { data, pages } = labels;

    return (
        <>
            <Table className="relative border border-gray-200 border-solid h-120 p-4">
                <TableBody className="flex flex-col h-120 w-full">
                    {loading ? (
                        new Array(3).fill(1).map(() => (
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
                            </tr>
                        ))
                    ) : notFound ? (
                        <tr className="flex w-full gap-y-2 flex-col justify-center h-1/3 px-10">
                            <td>
                                <EmptyDemo title="label" />
                            </td>
                        </tr>
                    ) : (
                        data.map((label) => (
                            <LabelTableRow
                                key={label.id}
                                label={label}
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

export default memo(LabelTable);
