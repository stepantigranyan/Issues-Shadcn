import type {FC} from 'react'

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";

const EmptyDemo: FC<{title: string}> = ({title}) => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>No {title}s found</EmptyTitle>
                <EmptyDescription>
                    We searched our entire database, but we couldn't find the exact {title} you requested. It’s possible that the {title} has been renamed or deleted.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
};

export default EmptyDemo;