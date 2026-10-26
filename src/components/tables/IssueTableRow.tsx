import {type FC, memo, useState} from 'react';

import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Item, ItemContent, ItemDescription} from "@/components/ui/item.tsx";
import InfoIssuePopup from "@/components/popups/issue/info/InfoIssuePopup.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontalIcon} from "lucide-react";
import EditIssuePopup from "@/components/popups/issue/edit/EditIssuePopup.tsx";
import type {Issue} from "@/models/issue/issue.type.ts";
import DeleteIssuePopup from "@/components/popups/issue/delete/DeleteIssuePopup.tsx";

export interface IIssueTableRowProps {
    issue: Issue;
    onEdit: (issue: Issue) => void;
    onDelete: (id: string) => void;
}

const IssueTableRow: FC<IIssueTableRowProps> = ({issue, onEdit, onDelete}) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    return (
        <TableRow className="w-full flex items-center justify-between h-35 hover:bg-transparent" key={issue.id}>
            <TableCell>
                <Item>
                    <ItemContent>
                        <div className="flex items-center gap-x-3">
                            <InfoIssuePopup data={issue} />
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
                        <DropdownMenuItem onClick={(e) => {
                            e.preventDefault();
                            setOpenDelete(false);
                            setOpenEdit(true);
                        }}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                            e.preventDefault();
                            setOpenEdit(false);
                            setOpenDelete(true);
                        }} variant="destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditIssuePopup onOpenChange={setOpenEdit} open={openEdit} onSubmit={onEdit} data={issue} />
                <DeleteIssuePopup onOpenChange={setOpenDelete} open={openDelete} onSubmit={onDelete} data={issue}/>
            </TableCell>
        </TableRow>
    )
}

export default memo(IssueTableRow)