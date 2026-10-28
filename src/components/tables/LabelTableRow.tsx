import { type FC, memo, useState } from 'react';

import { MoreHorizontalIcon } from 'lucide-react';

import { TableCell, TableRow } from '@/components/ui/table';
import { Item, ItemContent } from '@/components/ui/item';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import InfoLabelPopup from '@/components/popups/label/info/InfoLabelPopup';
import EditLabelPopup from '@/components/popups/label/edit/EditLabelPopup';
import DeletePopup from '@/components/popups/DeletePopup';

import { DialogDescription } from '@/components/ui/dialog';

import type { Label } from '@/models/label/label.type';
import { issueService } from '@/services/service.ts';

export interface ILabelTableRowProps {
    label: Label;
    onEdit: (label: Label) => void;
    onDelete: (id: string) => void;
}

const LabelTableRow: FC<ILabelTableRowProps> = ({
    label,
    onEdit,
    onDelete,
}) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    let usedCount = 0;
    const allIssues = issueService.getAll(undefined);

    for (let i = 0; i < allIssues.length; i++) {
        const issue = allIssues[i];

        if (issue.labels.includes(label.id)) {
            usedCount++;
        }
    }

    return (
        <TableRow
            className="w-full flex items-center justify-between h-1/5 hover:bg-transparent"
            key={label.id}
        >
            <TableCell>
                <Item>
                    <ItemContent>
                        <InfoLabelPopup data={label} />
                    </ItemContent>
                </Item>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" size="icon">
                                <MoreHorizontalIcon />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenDelete(false);
                                setOpenEdit(true);
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenEdit(false);
                                setOpenDelete(true);
                            }}
                            variant="destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditLabelPopup
                    data={label}
                    open={openEdit}
                    onOpenChange={setOpenEdit}
                    onSubmit={onEdit}
                />
                <DeletePopup
                    onOpenChange={setOpenDelete}
                    open={openDelete}
                    onSubmit={onDelete}
                    id={label.id}
                >
                    {usedCount !== 0 ? (
                        <DialogDescription>
                            There are {usedCount} issues which are using this
                            label.
                        </DialogDescription>
                    ) : (
                        <></>
                    )}
                </DeletePopup>
            </TableCell>
        </TableRow>
    );
};

export default memo(LabelTableRow);
