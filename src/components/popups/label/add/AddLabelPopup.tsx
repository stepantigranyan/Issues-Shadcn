import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field.tsx";

import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Popup from "@/components/popups/popups.tsx";
import {type FC, memo} from "react";
import {labelService} from "@/services/service.ts";

export interface AddLabelPopupProps {
    onClose: () => void;
}

const AddLabelPopup: FC<AddLabelPopupProps> = ({onClose}) => {
    const handleSubmit = (formData: FormData) => {
        const name = formData.get("name")! as string;
        const color = formData.get("color")! as string;

        labelService.create({name, color});
        onClose();
    }

    return (
        <Popup onCancel={onClose}>
            <form action={handleSubmit}>
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
                    <Field orientation="horizontal">
                        <Button
                            type="submit"
                        >
                            Add
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </Popup>
    );
};

export default memo(AddLabelPopup);