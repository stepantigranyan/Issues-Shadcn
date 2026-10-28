import { IssueRepository } from "../repositories/issue/issue.repository";
import { IssueService } from "./issue/issue.service";

import { LabelRepository } from "../repositories/label/label.repository";
import { LabelService } from "./label/label.service";

export const issueService = new IssueService(new IssueRepository());
export const labelService = new LabelService(new LabelRepository());
