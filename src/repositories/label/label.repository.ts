import type {Label, LabelAttributes} from "@/models/label/label.type.ts";
import {generateId} from "@/utils/generateId";
import {ISSUES_STORAGE_KEY} from "@/repositories/issue/issue.repository.ts";
import type {Issue} from "@/models/issue/issue.type.ts";

export interface FindAndCountLabels {
    data: Label[],
    pages: number,
}

export interface LabelRepositoryTypes {
    create: (labelAttributes: LabelAttributes) => Label;
    getAll: (sortBy: 'ASC' | 'DESC' | undefined) => Label[];
    getOne: (id: string) => Label | undefined;
    update: (id: string, labelAttributes: LabelAttributes) => Label;
    delete: (id: string) => void;
}

export const LABELS_STORAGE_KEY = "labels";

export class LabelRepository implements LabelRepositoryTypes  {
    create(data: LabelAttributes): Label {
        const labels = this.getAll(undefined);

        const label: Label = {
            id: generateId(5),
            created: new Date().getTime(),
            ...data,
        };

        localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify([...labels, label]));
        return label;
    }

    getAll(sortBy: 'ASC' | 'DESC' | undefined): Label[] {
        const data = localStorage.getItem(LABELS_STORAGE_KEY);

        if (!data) {
            return [] as Label[];
        }

        if (sortBy === undefined) {
            return JSON.parse(data) as Label[];
        }

        const parsedData = JSON.parse(data) as Label[];

        if (sortBy === "ASC") {
            return parsedData.sort((a, b) => a.name < b.name ? -1 : 1)
        }

        else {
            return parsedData.sort((a, b) => b.name < a.name ? -1 : 1)
        }
    }


    getOne(id: string): Label | undefined {
        const labels = this.getAll(undefined);
        return labels.find((x) => x.id === id);
    }

    update(id: string, data: LabelAttributes): Label {
        const labels = this.getAll(undefined);
        const labelIndex = labels.findIndex((x) => x.id === id);

        labels[labelIndex] = {...labels[labelIndex], ...data};
        localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify(labels));

        return labels[labelIndex];
    }

    delete(id: string): void {
        const labels = this.getAll(undefined);
        localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify(labels.filter(x => x.id !== id)));
        
        const issues = JSON.parse(localStorage.getItem(ISSUES_STORAGE_KEY) || "[]") as Issue[];

        const updatedIssues = issues.map((issue) => {
            issue.labels = issue.labels.filter((x) => x !== id);
            return issue;
        });

        localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(updatedIssues));
    }
}