import {type LabelRepositoryTypes} from "@/repositories/label/label.repository.ts";
import type {Label, LabelAttributes} from "@/models/label/label.type.ts";

export class LabelService {
    private readonly labelRepository: LabelRepositoryTypes;

    constructor(labelRepository: LabelRepositoryTypes) {
        this.labelRepository = labelRepository;
    }

    create(data: LabelAttributes): Label {
        return this.labelRepository.create(data);
    }

    getAll(): Label[] {
        return this.labelRepository.getAll();
    }

    getOne(id: string): Label | undefined {
        return this.labelRepository.getOne(id);
    }

    update(id: string, data: LabelAttributes): Label {
        return this.labelRepository.update(id, data);
    }

    delete(id: string): void {
        this.labelRepository.delete(id);
    }
}