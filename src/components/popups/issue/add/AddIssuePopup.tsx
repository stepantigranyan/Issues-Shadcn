import {type FC, memo, useState} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox";
import Popup from "@/components/popups/popups.tsx";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet, FieldTitle,
} from "@/components/ui/field";

import {labelService} from "@/services/service.ts";
import type {Label} from "@/models/label/label.type.ts";
import type {IssueAttributes} from "@/models/issue/issue.type.ts";

export interface AddIssuePopupProps {
    onClose: () => void;
    onSubmit: (data: IssueAttributes, labels: Label[]) => void;
}

const AddIssuePopup: FC<AddIssuePopupProps> = ({onClose, onSubmit}) => {
    const allLabels = labelService.getAll();
    const [checkedLabels, setCheckedLabels] = useState<Label[]>([]);

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
        onClose()
    }


    return (
        <Popup onCancel={onClose}>
            <form action={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend className="font-bold text-3xl">Add new Issue</FieldLegend>
                        <FieldSeparator/>
                        <FieldGroup className="my-5">
                            <Field>
                                <FieldLabel htmlFor="issue-title">
                                    Add title
                                </FieldLabel>
                                <Input
                                    name="title"
                                    id="issue-title"
                                    placeholder="Bug report"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="issue-description">
                                    Add Description
                                </FieldLabel>
                                <Textarea
                                    name="description"
                                    id="issue-description"
                                    placeholder="Describe a bug"
                                    required
                                    className="resize-none min-h-50 overflow-y-scroll-auto field-sizing-fixed"
                                />
                            </Field>
                            <Field className="flex flex-col gap-y-5">
                                <FieldTitle>Choose Labels</FieldTitle>
                                <FieldGroup className="grid grid-cols-2">
                                    {allLabels.map(({id, name}) => (
                                        <Field orientation="horizontal" key={id}>
                                            <Checkbox id={id} defaultChecked={false} onCheckedChange={() => {handleToggleLabel(id)}}/>
                                            <FieldLabel className="text-xs capitalize" htmlFor={id}>{name}</FieldLabel>
                                        </Field>
                                    ))}
                                </FieldGroup>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <FieldSeparator/>
                    <Field orientation="horizontal">
                        <Button type="submit">Add</Button>
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </Popup>
    );
};

export default memo(AddIssuePopup);
