import {type FC, memo} from "react";

import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from "@/components/ui/item";

import {Button} from "@/components/ui/button.tsx";

export interface MainHeaderProps {
    onAddIssue: () => void;
    onAddLabel: () => void;
}

const MainHeader: FC<MainHeaderProps> = ({onAddIssue, onAddLabel}) => {
    return (
        <Item variant="default" className="px-0">
            <ItemContent>
                <ItemTitle className={"text-2xl font-bold"}>Issues</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                    onClick={onAddIssue}
                >
                    New Issue
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                    onClick={onAddLabel}
                >New Label</Button>
            </ItemActions>
        </Item>
    );
};

export default memo(MainHeader);