import {type FC} from "react";

import {Button} from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import type {Issue} from "@/models/issue/issue.type.ts";
import {Badge} from "@/components/ui/badge.tsx";

export interface InfoIssuePopupProps {
    data: Issue;
}

const InfoIssuePopup: FC<InfoIssuePopupProps> = ({data}) => {
    return (
        <Dialog>
            <DialogTrigger render={
                <button className={"relative cursor-pointer text-xl font-bold after:absolute after:hidden after:content-[''] after:top-full after:left-0 after:w-full after:h-0.5 after:bg-gray-800 hover:after:block"}>
                                   {data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}
                </button>
            } />
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{data.title}</DialogTitle>
                    <div className={'flex items-center gap-x-1'}>
                        {
                            data.labels.map((label) => (
                                <Badge key={label.id} variant="default" style={{backgroundColor: label.color}}>{label.name}</Badge>
                            ))
                        }
                    </div>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    <p className="mb-4 leading-normal whitespace-pre-wrap break-all">
                        {data.description}
                    </p>
                </div>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Close</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InfoIssuePopup;