import {type FC, memo} from "react";

import {Button} from "@/components/ui/button";
import type {Issue} from "@/models/issue/issue.type.ts";

import {
    Dialog,
    DialogClose, DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface DeleteIssuePopupProps {
    data: Issue;
    onSubmit: (id: string) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const DeleteIssuePopup: FC<DeleteIssuePopupProps> = ({onSubmit, data, open, onOpenChange}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure?
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => onSubmit(data.id)} variant="destructive">Delete</Button>
                    <DialogClose render={<Button variant={"outline"}>Cancel</Button>}></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default  memo(DeleteIssuePopup);
