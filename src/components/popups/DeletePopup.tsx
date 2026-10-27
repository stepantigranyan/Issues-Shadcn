import { type FC, type JSX } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose, DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface DeleteIssuePopupProps {
    id: string;
    onSubmit: (id: string) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: JSX.Element;
}

const DeletePopup: FC<DeleteIssuePopupProps> = ({onSubmit, id, open, onOpenChange, children}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure?
                    </DialogTitle>
                </DialogHeader>
                {
                    children
                }
                <DialogFooter>
                    <Button onClick={() => onSubmit(id)} variant="destructive">Delete</Button>
                    <DialogClose render={<Button variant="outline">Cancel</Button>}></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default  DeletePopup;
