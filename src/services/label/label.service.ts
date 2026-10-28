import { type LabelRepositoryTypes } from "@/repositories/label/label.repository";
import type { Label, LabelAttributes } from "@/models/label/label.type";

export class LabelService {
    private readonly labelRepository: LabelRepositoryTypes;

    constructor(labelRepository: LabelRepositoryTypes) {
        this.labelRepository = labelRepository;
    }

    create(data: LabelAttributes): Label {
        return this.labelRepository.create(data);
    }

    getAll(sortBy: 'ASC' | 'DESC' | undefined): Label[] {
        return this.labelRepository.getAll(sortBy);
    }

    getOne(id: string): Label | undefined {
        return this.labelRepository.getOne(id);
    }

    update(lb: Label): Label {
        return this.labelRepository.update(lb.id, {name: lb.name, color: lb.color});
    }

    delete(id: string): void {
        this.labelRepository.delete(id);
    }
}