import {type FC, memo, useState} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";

import {labelService} from "@/services/service.ts";
import type {Label} from "@/models/label/label.type.ts";
import type {IssueAttributes} from "@/models/issue/issue.type.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Label as Lb} from "@/components/ui/label.tsx";

export interface AddIssuePopupProps {
    onSubmit: (data: IssueAttributes, labels: Label[]) => void;
}

const AddIssuePopup: FC<AddIssuePopupProps> = ({onSubmit}) => {
    const allLabels = labelService.getAll();
    const [checkedLabels, setCheckedLabels] = useState<Label[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const handleToggleLabel = (id: string) => {
        const checkBoxIndex = checkedLabels.findIndex(item => item.id === id);

        if (checkBoxIndex !== -1) {
            setCheckedLabels((prev) => prev.filter((item) => item.id !== id));
        } else {
            setCheckedLabels((prev) => ([...prev, labelService.getOne(id)!]));
        }
    }

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title")! as string;
        const description = formData.get("description")! as string;
        onSubmit({title, description}, checkedLabels);
        setOpen(false);
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant={'outline'}>New Issue</Button>}/>
            <DialogContent className={'flex flex-col gap-y-10'}>
                <DialogHeader>
                    <DialogTitle>Edit Issue</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className={'flex flex-col gap-y-5'}>
                    <FieldGroup>
                        <Field>
                            <Lb htmlFor="title">Title</Lb>
                            <Input id="title" name="title" placeholder={'Bug report'} required={true}/>
                        </Field>
                        <Field>
                            <Lb htmlFor="description">Description</Lb>
                            <Textarea id="description" name="description" className={'h-32 overflow-y-auto resize-none'}/>
                        </Field>
                    </FieldGroup>
                    <FieldGroup>
                        <FieldTitle>Choose Labels</FieldTitle>
                        <FieldGroup className="grid grid-cols-2">
                            {allLabels.map(({id, name}) => (
                                <Field orientation="horizontal" key={id}>
                                    <Checkbox id={id} defaultChecked={false} onCheckedChange={() => {handleToggleLabel(id)}}/>
                                    <FieldLabel className="text-xs capitalize" htmlFor={id}>{name}</FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    </FieldGroup>
                    <DialogFooter className={'mt-5'}>
                        <Field>
                            <DialogClose render={<Button variant="outline">Cancel</Button>} />
                            <Button type="submit">Add</Button>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddIssuePopup);
