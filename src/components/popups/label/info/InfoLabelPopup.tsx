import type { FC } from 'react';

import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Label } from "@/models/label/label.type.ts";

export interface IInfoLabelPopupProps {
    data: Label;
}

const InfoLabelPopup: FC<IInfoLabelPopupProps> = ({data}) => {
    return (
        <Dialog>
            <DialogTrigger render={<button className='relative cursor-pointer text-xl font-bold after:absolute after:hidden after:content-[""] after:top-full after:left-0 after:w-full after:h-0.5 after:bg-gray-800 hover:after:block'>{data.name}</button>} />
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{data.name}</DialogTitle>
                    <DialogDescription>
                        Color: {data.color}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant='outline'>Ok</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default InfoLabelPopup;