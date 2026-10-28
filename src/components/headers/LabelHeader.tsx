import { type FC, memo } from "react";

import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from "@/components/ui/item";

import AddLabelPopup from "@/components/popups/label/add/AddLabelPopup.tsx";

export interface MainHeaderProps {
    onAddLabel: (name: string, color: string) => void;
}

const LabelHeader: FC<MainHeaderProps> = ({onAddLabel}) => {
    return (
        <Item variant="default" className="px-0">
            <ItemContent>
                <ItemTitle className="text-4xl font-bold">Labels</ItemTitle>
            </ItemContent>
            <ItemActions>
                <AddLabelPopup onSubmit={onAddLabel}/>
            </ItemActions>
        </Item>
    );
};

export default memo(LabelHeader);