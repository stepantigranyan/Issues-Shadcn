import type { Issue, IssueAttributes } from "@/models/issue/issue.type";

import { generateId } from "@/utils/generateId";

export interface FindAndCountIssues {
    data: Issue[];
    pages: number;
}

export interface IssueRepositoryTypes {
    create: (title: string, description: string, labels: string[]) => Issue;
    getAll: (sortBy: "ASC" | "DESC" | undefined) => Issue[];
    getOne: (id: string) => Issue | undefined;
    update: (id: string, data: IssueAttributes, labels: string[]) => Issue | undefined;
    delete: (id: string) => void;
}

export const ISSUES_STORAGE_KEY = "issues";

export class IssueRepository implements IssueRepositoryTypes {
    create(title: string, description: string, labels: string[]): Issue {
        const issues = this.getAll(undefined);

        const issue: Issue = {
            id: generateId(5),
            labels: labels,
            created: new Date().getTime(),
            title,
            description,
        };

        localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify([issue, ...issues]));
        return issue;
    }

    getAll(sortBy: "ASC" | "DESC" | undefined): Issue[] {
        const data = localStorage.getItem(ISSUES_STORAGE_KEY);

        if (!data) {
            return [] as Issue[];
        }

        if (sortBy === undefined) {
            return JSON.parse(data) as Issue[];
        }

        const parsedData = JSON.parse(data) as Issue[];

        if (sortBy === "ASC") {
             return parsedData.sort((a, b) => a.title < b.title ? -1 : 1)
        }

        else {
            return parsedData.sort((a, b) => b.title < a.title ? -1 : 1)
        }

    }

    getOne(id: string): Issue | undefined {
        const issues = this.getAll(undefined);
        return issues.find(x => x.id === id);
    }

    update(id: string, data: IssueAttributes, labels: string[]): Issue | undefined {
        const issues = this.getAll(undefined);
        const issueIndex = issues.findIndex(x => x.id === id);

        if (issueIndex === -1) {
            return;
        }

        issues[issueIndex] = {...issues[issueIndex], ...data, labels: labels};
        localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));

        return issues[issueIndex];
    }

    delete(id: string): void {
        const issues = this.getAll(undefined);
        const deletedIssue = issues.find(x => x.id === id);

        if (deletedIssue) {
            localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues.filter(x => x.id !== id)));
        }
    }
}