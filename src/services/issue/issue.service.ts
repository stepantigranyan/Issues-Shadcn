import {type IssueRepositoryTypes} from "@/repositories/issue/issue.repository.ts";
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

    getAll(sortBy: 'ASC' | 'DESC' | undefined): Issue[] {
        return this.issueRepository.getAll(sortBy);
    }

    update(iss: Issue): Issue | undefined {
        return this.issueRepository.update(iss.id, {title: iss.title, description: iss.description}, iss.labels);
    }

    delete(id: string): void {
        return this.issueRepository.delete(id);
    }
 }
