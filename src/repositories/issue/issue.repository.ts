import type {Issue, IssueAttributes} from "@/models/issue/issue.type.ts";
import type {Label} from "@/models/label/label.type.ts";
import {generateId} from "@/utils/generateId";
import {VISIBLE_ISSUES_COUNT} from "@/consts";

export interface FindAndCountIssues {
    data: Issue[];
    count: number;
}

export interface IssueRepositoryTypes {
    create: (data: IssueAttributes, labels: Label[]) => Issue;
    getAll: () => Issue[];
    getAllAndCount: () => FindAndCountIssues;
    getOne: (id: string) => Issue | undefined;
    update: (id: string, data: IssueAttributes, labels: Label[]) => Issue | undefined;
    delete: (id: string) => void;
}

const STORAGE_KEY = "issues";

export class IssueRepository implements IssueRepositoryTypes {
    create(data: IssueAttributes, labels: Label[]): Issue {
        const issues = this.getAll();

        const issue: Issue = {
            id: generateId(5),
            labels: labels,
            ...data
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([issue, ...issues]));
        return issue;
    }

    getAllAndCount(): FindAndCountIssues {
        const issues = this.getAll();

        if (!issues) {
            return ({data: [], count: 1});
        }

        return ({data: issues, count: Math.ceil(issues.length / VISIBLE_ISSUES_COUNT)});

    };

    getAll() {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [] as Issue[];
        }

        return JSON.parse(data) as Issue[];
    }

    getOne(id: string): Issue | undefined {
        const issues = this.getAll();
        return issues.find(x => x.id === id);
    }

    update(id: string, data: IssueAttributes, labels: Label[]): Issue | undefined {
        const issues = this.getAll();
        const issueIndex = issues.findIndex(x => x.id === id);

        if (issueIndex === -1) {
            return;
        }

        issues[issueIndex] = {...issues[issueIndex], ...data, labels: labels};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));

        return issues[issueIndex];
    }

    delete(id: string): void {
        const issues = this.getAll();
        const deletedIssue = issues.find(x => x.id === id);

        if (deletedIssue) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(issues.filter(x => x.id !== id)));
        }
    }
}