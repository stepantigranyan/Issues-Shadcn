import {type FindAndCountIssues, type IssueRepositoryTypes} from "@/repositories/issue/issue.repository.ts";
import type {Issue, IssueAttributes} from "@/models/issue/issue.type.ts";
import type {Label} from "@/models/label/label.type.ts";

export class IssueService {
    private readonly issueRepository: IssueRepositoryTypes;

    constructor(issueRepository: IssueRepositoryTypes) {
        this.issueRepository = issueRepository;
    }

    create(data: IssueAttributes, labels: Label[]): Issue {
        return this.issueRepository.create(data, labels);
    }

    getAll(): Issue[] {
        return this.issueRepository.getAll();
    }


    getAllAndCount(): FindAndCountIssues {
        return this.issueRepository.getAllAndCount();
    }


    update(id: string, data: IssueAttributes, labels: Label[]): Issue | undefined {
        return this.issueRepository.update(id, data, labels);
    }

    delete(id: string): void {
        return this.issueRepository.delete(id);
    }
 }
