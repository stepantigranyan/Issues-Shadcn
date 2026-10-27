import {useState, useLayoutEffect, useCallback} from "react";
import {VISIBLE_LABELS_COUNT} from "@/consts";
import type {Label} from "@/models/label/label.type.ts";
import type {LabelService} from "@/services/label/label.service.ts";
import type {FindAndCountLabels} from "@/repositories/label/label.repository.ts";

const useLabelService = (service: LabelService) => {
    const [labels, setLabels] = useState<Label[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [visibleLabels, setVisibleLabels] = useState<FindAndCountLabels>({data: [], pages: 0});
    const [sortBy, setSortBy] = useState<'ASC' | 'DESC' | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    const loadLabels = useCallback(() => {
        try {
            setLoading(true);
            setCurrentPage(1);
            const allLabels = service.getAll(sortBy);
            setLabels(allLabels);
            const offsetLabels = allLabels.slice(0, VISIBLE_LABELS_COUNT);
            setVisibleLabels({pages: Math.ceil(allLabels.length / VISIBLE_LABELS_COUNT), data: offsetLabels});
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [service, sortBy]);

    useLayoutEffect(() => {
        loadLabels();
    }, []);

    const addLabel = useCallback((name: string, color: string) => {
        try {
            setLoading(true);
            setCurrentPage(1);
            const label = service.create({name, color});
            setLabels((prev) => [label, ...prev]);

            const offsetLabels = ([label, ...labels]).slice(0, VISIBLE_LABELS_COUNT);

            setVisibleLabels({pages: Math.ceil((labels.length + 1) / VISIBLE_LABELS_COUNT), data: offsetLabels});
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }, [labels, service]);

    const editLabel = useCallback((lb: Label) => {
        try {
            setLoading(true);
            const issue = service.update(lb)!;
            setLabels((prev) => prev.map((x) => x.id === lb.id ? issue : x));
            setVisibleLabels((prev) => ({data: prev.data.map((x) => x.id === lb.id ? issue : x), pages: prev.pages}));
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }, [service]);

    const deleteLabel = useCallback((id: string) => {
        try {
            setLoading(true);
            service.delete(id);
            const newIssues = labels.filter((x) => x.id !== id);
            setLabels(newIssues);

            if (visibleLabels.data.length === 1) {
                if (visibleLabels.pages === 1) {
                    setLabels([]);
                    setVisibleLabels({data: [], pages: 0});
                    return;
                }

                const offset = VISIBLE_LABELS_COUNT * (currentPage - 2);
                const offsetLabels = newIssues.slice(offset, offset + VISIBLE_LABELS_COUNT);

                setCurrentPage((prev) => prev - 1);
                setVisibleLabels({data: offsetLabels, pages: Math.ceil(newIssues.length / VISIBLE_LABELS_COUNT)});
                return;
            }

            const offset = VISIBLE_LABELS_COUNT * (currentPage - 1);
            const offsetLabels = newIssues.slice(offset, offset + VISIBLE_LABELS_COUNT);

            setVisibleLabels({data: offsetLabels, pages: Math.ceil(newIssues.length / VISIBLE_LABELS_COUNT)});
        } finally {
            setLoading(false);
        }
    }, [currentPage, labels, service, visibleLabels.data.length, visibleLabels.pages]);

    const changePage = useCallback((direction: "right" | "left", page?: number) => {
        try {
            setLoading(true);
            let offsetLabels;
            let offset;

            if (page === undefined) {
                if (direction === "left") {
                    setCurrentPage((prev) => prev + 1);
                    offset = (currentPage) * VISIBLE_LABELS_COUNT;
                } else {
                    setCurrentPage((prev) => prev - 1);
                    offset = (currentPage - 2) * VISIBLE_LABELS_COUNT;
                }


                offsetLabels = labels.slice(offset, offset + VISIBLE_LABELS_COUNT);
            } else {
                setCurrentPage(page);
                const offset = (page - 1) * VISIBLE_LABELS_COUNT;
                offsetLabels = labels.slice(offset, offset + VISIBLE_LABELS_COUNT);
            }

            setVisibleLabels({pages: Math.ceil(labels.length / VISIBLE_LABELS_COUNT), data: offsetLabels});
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }, [currentPage, labels]);


    const sort = useCallback((type: "ASC" | "DESC" | undefined) => {
        try {
            setLoading(true);
            setSortBy(type);
            let sortedData: Label[];

            if (type === "ASC") {
                sortedData = labels.sort((a, b) => a.name < b.name ? -1 : 1);
            } else if (type === "DESC") {
                sortedData = labels.sort((a, b) => b.name < a.name ? -1 : 1);
            } else {
                sortedData = labels.sort((a, b) => b.created  - a.created);
            }

            setLabels(sortedData!);
            setVisibleLabels({pages: Math.ceil(sortedData!.length / VISIBLE_LABELS_COUNT), data: sortedData!.slice(0, VISIBLE_LABELS_COUNT)})
            setCurrentPage(1);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    }, [labels]);

    const search = useCallback((input: string) => {
        try {
            setNotFound(false);
            setLoading(true);
            const searchedInput = input.toLowerCase().split(' ').join('');
            const allLabels = [...service.getAll(sortBy)];
            const searchedLabels = allLabels.filter((x) => {
                const titleText = x.name.toLowerCase().split(" ").join('');

                return titleText.includes(searchedInput);
            });

            if (searchedLabels.length === 0) {
                setNotFound(true);
                return;
            }

            const searchedOffsetIssues = searchedLabels.slice(0, VISIBLE_LABELS_COUNT);

            setLabels(searchedLabels);
            setVisibleLabels({
                data: searchedOffsetIssues,
                pages: Math.ceil(searchedLabels.length / VISIBLE_LABELS_COUNT),
            });
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [service, sortBy]);


    return {
        visibleLabels,
        currentPage,
        loading,
        notFound,
        addLabel,
        editLabel,
        deleteLabel,
        changePage,
        sort,
        search,
    }
};

export default useLabelService;