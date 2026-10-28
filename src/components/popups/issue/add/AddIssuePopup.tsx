import { type FC, memo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label as Lb } from '@/components/ui/label';

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';

import { labelService } from '@/services/service';

export interface AddIssuePopupProps {
    onSubmit: (title: string, description: string, labels: string[]) => void;
}

const AddIssuePopup: FC<AddIssuePopupProps> = ({ onSubmit }) => {
    const allLabels = labelService.getAll(undefined);
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (formData: FormData) => {
        const title = formData.get('title')! as string;
        const description = formData.get('description')! as string;
        const checkedLabels = formData.getAll('labels')! as string[];

        onSubmit(title, description, checkedLabels);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button variant={'outline'} className={'cursor-pointer'}>
                        New Issue
                    </Button>
                }
            />
            <DialogContent
                showCloseButton={false}
                className={'flex flex-col gap-y-10'}
            >
                <DialogHeader>
                    <DialogTitle>Add Issue</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className={'flex flex-col gap-y-5'}>
                    <FieldGroup>
                        <Field>
                            <Lb htmlFor="title">Title</Lb>
                            <Input
                                id="title"
                                name="title"
                                placeholder={'Bug report'}
                                required={true}
                            />
                        </Field>
                        <Field>
                            <Lb htmlFor="description">Description</Lb>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder={'Describe the bug '}
                                className={'h-32 overflow-y-auto resize-none'}
                            />
                        </Field>
                    </FieldGroup>

                    {allLabels.length !== 0 && (
                        <FieldGroup>
                            <FieldTitle>Choose Labels</FieldTitle>
                            <FieldGroup className="grid grid-cols-2">
                                {allLabels.map(({ id, name }) => (
                                    <Field orientation="horizontal" key={id}>
                                        <Checkbox
                                            value={id}
                                            name={'labels'}
                                            id={id}
                                            defaultChecked={false}
                                        />
                                        <FieldLabel
                                            className="text-xs capitalize"
                                            htmlFor={id}
                                        >
                                            {name}
                                        </FieldLabel>
                                    </Field>
                                ))}
                            </FieldGroup>
                        </FieldGroup>
                    )}

                    <DialogFooter className={'mt-5'}>
                        <Field>
                            <DialogClose
                                render={
                                    <Button variant="outline">Cancel</Button>
                                }
                            />
                            <Button type="submit">Add</Button>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddIssuePopup);
