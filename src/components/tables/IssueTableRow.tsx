import { type FC, memo, useState } from 'react';

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import EditIssuePopup from "@/components/popups/issue/edit/EditIssuePopup";
import InfoIssuePopup from "@/components/popups/issue/info/InfoIssuePopup";
import DeletePopup from "@/components/popups/DeletePopup";

import { labelService } from "@/services/service";
import type { Issue } from "@/models/issue/issue.type";

export interface IIssueTableRowProps {
    issue: Issue;
    onEdit: (issue: Issue) => void;
    onDelete: (id: string) => void;
}

const IssueTableRow: FC<IIssueTableRowProps> = ({issue, onEdit, onDelete}) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    return (
        <TableRow className="w-full flex items-center justify-between h-1/3 hover:bg-transparent" key={issue.id}>
            <TableCell>
                <Item>
                    <ItemContent>
                        <div className="flex items-center gap-x-3">
                            <InfoIssuePopup data={issue} />
                            <div className="flex items-center gap-x-2">
                                {issue.labels.map((label) => {
                                    const labelData = labelService.getOne(label)!;
                                    return (<Badge key={labelData.id} variant="default" style={{backgroundColor: labelData.color}}>{labelData.name}</Badge>)
                                })}
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
                        }}>
                            Edit
                        </DropdownMenuItem>
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
                <DeletePopup onOpenChange={setOpenDelete} open={openDelete} onSubmit={onDelete} id={issue.id}/>
            </TableCell>
        </TableRow>
    )
}

export default memo(IssueTableRow)