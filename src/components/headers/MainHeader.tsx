import {type FC, memo} from "react";

import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from "@/components/ui/item";

import type {IssueAttributes} from "@/models/issue/issue.type.ts";
import type {Label} from "@/models/label/label.type.ts";

import AddIssuePopup from "@/components/popups/issue/add/AddIssuePopup.tsx";
import AddLabelPopup from "@/components/popups/label/add/AddLabelPopup.tsx";

export interface MainHeaderProps {
    onAddIssue: (data: IssueAttributes, labels: Label[]) => void;
}

const MainHeader: FC<MainHeaderProps> = ({onAddIssue}) => {
    return (
        <Item variant="default" className="px-0">
            <ItemContent>
                <ItemTitle className={"text-2xl font-bold"}>Issues</ItemTitle>
            </ItemContent>
            <ItemActions>
                <AddIssuePopup onSubmit={onAddIssue} />
                <AddLabelPopup />
            </ItemActions>
        </Item>
    );
};

export default memo(MainHeader);