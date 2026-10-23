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
import type {Issue, IssueAttributes} from "@/models/issue/issue.type.ts";

export interface AddIssuePopupProps {
    onClose: () => void;
    onSubmit: (id: string, data: IssueAttributes, labels: Label[]) => void;
    data: Issue;
}

const EditIssuePopup: FC<AddIssuePopupProps> = ({onClose, onSubmit, data}) => {
    const allLabels = labelService.getAll();
    const [checkedLabels, setCheckedLabels] = useState<Label[]>(data.labels);

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

        onSubmit(data.id, {title, description}, checkedLabels);
        onClose()
    };


    return (
        <Popup onCancel={onClose}>
            <form action={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend className="font-bold text-3xl">Edit Issue</FieldLegend>
                        <FieldSeparator/>
                        <FieldGroup className="my-5">
                            <Field>
                                <FieldLabel htmlFor="issue-title">
                                    Edit Title
                                </FieldLabel>
                                <Input
                                    name="title"
                                    id="issue-title"
                                    placeholder="Bug report"
                                    defaultValue={data.title}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="issue-description">
                                    Edit Description
                                </FieldLabel>
                                <Textarea
                                    name="description"
                                    id="issue-description"
                                    placeholder="Describe a bug"
                                    required
                                    className="resize-none min-h-50 overflow-y-scroll-auto field-sizing-fixed"
                                    defaultValue={data.description}
                                />
                            </Field>
                            <Field className="flex flex-col gap-y-5">
                                <FieldTitle>Choose Labels</FieldTitle>
                                <FieldGroup className="grid grid-cols-2">
                                    {allLabels.map(({id, name}) => (
                                        <Field orientation="horizontal" key={id}>
                                            <Checkbox id={id} defaultChecked={Boolean(data.labels.find((x) => x.id === id))} onCheckedChange={() => {handleToggleLabel(id)}}/>
                                            <FieldLabel className="text-xs capitalize" htmlFor={id}>{name}</FieldLabel>
                                        </Field>
                                    ))}
                                </FieldGroup>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <FieldSeparator/>
                    <Field orientation="horizontal">
                        <Button type="submit">Edit</Button>
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </Popup>
    );
};

export default memo(EditIssuePopup);