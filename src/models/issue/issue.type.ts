import type {Label} from "../label/label.type.ts";

export interface IssueAttributes {
    title: string;
    description: string;
}

export interface Issue extends IssueAttributes {
    id: string;
    labels: Label[];
}