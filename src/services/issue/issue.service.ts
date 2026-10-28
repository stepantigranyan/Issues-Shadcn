import { type IssueRepositoryTypes } from "@/repositories/issue/issue.repository";
import type { Issue } from "@/models/issue/issue.type";

export class IssueService {
    private readonly issueRepository: IssueRepositoryTypes;

    constructor(issueRepository: IssueRepositoryTypes) {
        this.issueRepository = issueRepository;
    }

    create(title: string, description: string, labels: string[]): Issue {
        return this.issueRepository.create(title, description, labels);
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
