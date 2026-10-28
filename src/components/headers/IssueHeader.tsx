import { type FC, memo } from "react";

import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from "@/components/ui/item";
import AddIssuePopup from "@/components/popups/issue/add/AddIssuePopup";

export interface MainHeaderProps {
    onAddIssue: (title: string, description: string, labels: string[]) => void;
}

const IssueHeader: FC<MainHeaderProps> = ({onAddIssue}) => {
    return (
        <Item variant="default" className="px-0">
            <ItemContent>
                <ItemTitle className="text-4xl font-bold">Issues</ItemTitle>
            </ItemContent>
            <ItemActions>
                <AddIssuePopup onSubmit={onAddIssue} />
            </ItemActions>
        </Item>
    );
};

export default memo(IssueHeader);