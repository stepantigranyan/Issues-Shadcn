import { type FC } from 'react';

import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';

import type { Label } from '@/models/label/label.type';

export interface EditLabelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (label: Label) => void;
    data: Label;
}

const EditLabelPopup: FC<EditLabelProps> = ({
    onSubmit,
    open,
    onOpenChange,
    data,
}) => {
    const handleSubmit = (formData: FormData) => {
        const name = formData.get('name')! as string;
        const color = formData.get('color')! as string;
        onSubmit({ ...data, name, color });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <form action={handleSubmit} className="flex flex-col gap-y-5">
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className="font-bold text-3xl">
                                Edit Label
                            </FieldLegend>
                            <FieldSeparator />
                            <FieldGroup className="my-5">
                                <Field>
                                    <FieldLabel
                                        className="inline"
                                        htmlFor="label-name"
                                    >
                                        Name
                                    </FieldLabel>
                                    <Input
                                        defaultValue={data.name}
                                        name="name"
                                        id="label-name"
                                        placeholder="Bug report"
                                        required
                                    />
                                </Field>
                                <Field
                                    className="flex items-center justify-between"
                                    orientation="horizontal"
                                >
                                    <FieldLabel
                                        className="inline"
                                        htmlFor="label-color"
                                    >
                                        Color
                                    </FieldLabel>
                                    <Input
                                        defaultValue={data.color}
                                        name="color"
                                        required
                                        className="w-20"
                                        type="color"
                                        id="label-color"
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <FieldSeparator />
                    </FieldGroup>
                    <DialogFooter>
                        <Field orientation="horizontal">
                            <Button type="submit">Submit</Button>
                            <DialogClose
                                render={
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                }
                            />
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditLabelPopup;
