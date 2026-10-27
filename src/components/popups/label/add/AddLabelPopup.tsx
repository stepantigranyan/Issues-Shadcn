import { type FC, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

export interface AddLabelProps {
    onSubmit: (name: string, color: string) => void;
}

const AddLabelPopup: FC<AddLabelProps> = ({onSubmit}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (formData: FormData) => {
        const name = formData.get("name")! as string;
        const color = formData.get("color")! as string;
        onSubmit(name, color);
        setOpen(false);
    };

    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger render={<Button variant="outline" size="lg" className="cursor-pointer">New Label</Button>}/>
                <DialogContent showCloseButton={false}>
                    <form action={handleSubmit} className='flex flex-col gap-y-5'>
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend className="font-bold text-3xl">Add New Label</FieldLegend>
                                <FieldSeparator />
                                <FieldGroup className="my-5">
                                    <Field>
                                        <FieldLabel className="inline" htmlFor="label-name">
                                            Name
                                        </FieldLabel>
                                        <Input
                                            name="name"
                                            id="label-name"
                                            placeholder="Bug report"
                                            required
                                        />
                                    </Field>
                                    <Field className="flex items-center justify-between" orientation="horizontal">
                                        <FieldLabel className="inline" htmlFor="label-color">
                                            Color
                                        </FieldLabel>
                                        <Input
                                            name="color"
                                            required
                                            className="w-20"
                                            type="color"
                                            id="label-color"/>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <FieldSeparator />
                        </FieldGroup>
                        <DialogFooter>
                            <Field orientation="horizontal">
                                <Button
                                    type="submit"
                                >
                                    Add
                                </Button>
                                <DialogClose render={<Button
                                    variant="outline"
                                    type="button"
                                >
                                    Cancel
                                </Button>}/>
                            </Field>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
    );
};

export default AddLabelPopup;