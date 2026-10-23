import {type FC, memo} from "react";

import {Button} from "@/components/ui/button";
import Popup from "@/components/popups/popups.tsx";


import type {Issue} from "@/models/issue/issue.type.ts";
import {Item, ItemContent, ItemTitle, ItemActions} from "@/components/ui/item.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export interface InfoIssuePopupProps {
    onClose: () => void;
    data: Issue;
}

const InfoIssuePopup: FC<InfoIssuePopupProps> = ({onClose, data}) => {
    return (
        <Popup onCancel={onClose}>
                <Item className="flex flex-col gap-y-10">
                    <ItemContent className="flex flex-col gap-y-5">
                        <ItemTitle className="flex items-center gap-x-2 max-w-200 grid grid-cols-[2fr_1fr]">
                            <span className="text-2xl break-words">{data.title}</span>
                            <div className="flex items-center gap-x-1">
                                {data.labels.map(label => (
                                    <Badge key={label.id} variant="default" style={{backgroundColor: label.color}}>{label.name}</Badge>
                                ))}
                            </div>
                        </ItemTitle>
                        <div className="whitespace-pre-wrap max-w-200">
                            {data.description}
                        </div>
                    </ItemContent>
                    <ItemActions>
                        <Button onClick={onClose}>Ok</Button>
                    </ItemActions>
                </Item>
        </Popup>
    );
};

export default memo(InfoIssuePopup);