export interface IssueAttributes {
    title: string;
    description: string;
}

export interface Issue extends IssueAttributes {
    id: string;
    labels: string[];
    created: number;
}
