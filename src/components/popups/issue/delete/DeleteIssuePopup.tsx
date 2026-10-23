import {type FC, memo} from "react";

import {Button} from "@/components/ui/button";
import Popup from "@/components/popups/popups.tsx";
import {ItemTitle} from "@/components/ui/item.tsx";
import type {Issue} from "@/models/issue/issue.type.ts";

export interface DeleteIssuePopupProps {
    data: Issue;
    onClose: () => void;
    onSubmit: (id: string) => void;
}

const DeleteIssuePopup: FC<DeleteIssuePopupProps> = ({onClose, onSubmit, data}) => {

    return (
        <Popup onCancel={onClose}>
            <div className="flex flex-col items-center gap-y-3">
                <ItemTitle className="text-lg">Are you sure?</ItemTitle>
                <div className="flex items-center gap-x-5">
                    <Button onClick={() => {onSubmit(data.id); onClose();}} variant="destructive">Delete</Button>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                </div>
            </div>
        </Popup>
    );
};

export default memo(DeleteIssuePopup);
