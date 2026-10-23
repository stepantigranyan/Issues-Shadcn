import {IssueRepository} from "../repositories/issue/issue.repository.ts";
import {IssueService} from "./issue/issue.service.ts";

import {LabelRepository} from "../repositories/label/label.repository.ts";
import {LabelService} from "./label/label.service.ts";

export const issueService = new IssueService(new IssueRepository());
export const labelService = new LabelService(new LabelRepository());
