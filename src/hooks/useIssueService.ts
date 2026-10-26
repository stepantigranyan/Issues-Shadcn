import {useState, useLayoutEffect, useCallback} from "react";
import type {IssueService} from "../services/issue/issue.service.ts";
import type {Issue, IssueAttributes} from "../models/issue/issue.type.ts";
import type {Label} from "../models/label/label.type.ts";
import {VISIBLE_ISSUES_COUNT} from "@/consts";
import type {FindAndCountIssues} from "@/repositories/issue/issue.repository.ts";

const useIssueService = (service: IssueService) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [visibleIssues, setVisibleIssues] = useState<FindAndCountIssues>({data: [], pages: 0});
    const [sortBy, setSortBy] = useState<'ASC' | 'DESC' | undefined>(undefined);

    const loadIssues = useCallback(() => {
        const allIssues = service.getAll(sortBy);
        setIssues(allIssues);
        const offsetIssues = allIssues.slice(0, VISIBLE_ISSUES_COUNT);
        setVisibleIssues({pages: Math.ceil(allIssues.length / VISIBLE_ISSUES_COUNT), data: offsetIssues});
    }, [service, sortBy]);

    useLayoutEffect(() => {
        loadIssues();
    }, []);

    const addIssue = useCallback((data: IssueAttributes, labels: Label[]) => {
        setCurrentPage(1);
        const issue = service.create(data, labels);
        setIssues((prev) => [issue, ...prev]);

        const offsetIssues = ([issue, ...issues]).slice(0, VISIBLE_ISSUES_COUNT);

        setVisibleIssues({pages: Math.ceil((issues.length + 1) / VISIBLE_ISSUES_COUNT), data: offsetIssues})
    }, [issues, service]);

    const editIssue = useCallback((iss: Issue) => {
        const issue = service.update(iss)!;
        setIssues((prev) => prev.map((x) => x.id === iss.id ? issue : x));
        setVisibleIssues((prev) => ({data: prev.data.map((x) => x.id === iss.id ? issue : x), pages: prev.pages}));
    }, [service]);

    const deleteIssue = useCallback((id: string) => {
        service.delete(id);
        const newIssues = issues.filter((x) => x.id !== id);
        setIssues(newIssues);

        if (visibleIssues.data.length === 1) {
            if (visibleIssues.pages === 1) {
                setIssues([]);
                setVisibleIssues({data: [], pages: 0});
                return;
            }

            const offset = VISIBLE_ISSUES_COUNT * (currentPage - 2);
            const offsetIssues = newIssues.slice(offset, offset + VISIBLE_ISSUES_COUNT);

            setCurrentPage((prev) => prev - 1);
            setVisibleIssues({data: offsetIssues, pages: Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT)});
            return;
        }

        const offset = VISIBLE_ISSUES_COUNT * (currentPage - 1);
        const offsetIssues = newIssues.slice(offset, offset + VISIBLE_ISSUES_COUNT);

        setVisibleIssues({data: offsetIssues, pages: Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT)});
    }, [currentPage, issues, service, visibleIssues.data.length, visibleIssues.pages]);

    const changePage = useCallback((direction: "right" | "left", page?: number) => {
        let offsetIssues;
        let offset;

        if (page === undefined) {
            if (direction === "left") {
                setCurrentPage((prev) => prev + 1);
                offset = (currentPage) * VISIBLE_ISSUES_COUNT;
            } else {
                setCurrentPage((prev) => prev - 1);
                offset = (currentPage - 2) * VISIBLE_ISSUES_COUNT;
            }


            offsetIssues = issues.slice(offset, offset + VISIBLE_ISSUES_COUNT);
        } else {
            setCurrentPage(page);
            const offset = (page - 1) * VISIBLE_ISSUES_COUNT;
            offsetIssues = issues.slice(offset, offset + VISIBLE_ISSUES_COUNT);
        }

        setVisibleIssues({pages: Math.ceil(issues.length / VISIBLE_ISSUES_COUNT), data: offsetIssues});
    }, [currentPage, issues]);


    const sort = useCallback((type: "ASC" | "DESC" | undefined) => {
        setSortBy(type);
        let sortedData: Issue[];
        
        if (type === "ASC") {
            sortedData = issues.sort((a, b) => a.title < b.title ? -1 : 1);
        } else if (type === "DESC") {
            sortedData = issues.sort((a, b) => b.title < a.title ? -1 : 1);
        } else {
            sortedData = issues.sort((a, b) => b.created  - a.created);
        }

        setIssues(sortedData!);
        setVisibleIssues({pages: Math.ceil(sortedData!.length / VISIBLE_ISSUES_COUNT), data: sortedData!.slice(0, VISIBLE_ISSUES_COUNT)})
        setCurrentPage(1);
    }, [issues]);

    const search = useCallback((input: string) => {
        const searchedInput = input.toLowerCase().split(' ').join('');
        const allIssues = [...service.getAll(sortBy)];
        const searchedIssues = allIssues.filter((x) => {
            const titleText = x.title.toLowerCase().split(" ").join('');
            const descriptionText = x.description.toLowerCase().split(" ").join('');

            return titleText.includes(searchedInput) || descriptionText.includes(searchedInput);
        });

        if (searchedIssues.length === 0) {
            return;
        }

        const searchedOffsetIssues = searchedIssues.slice(0, VISIBLE_ISSUES_COUNT);

        setIssues(searchedIssues);
        setVisibleIssues({
            data: searchedOffsetIssues,
            pages: Math.ceil(searchedIssues.length / VISIBLE_ISSUES_COUNT),
        });
    }, [service, sortBy]);

    const reset = useCallback(() => {
        setSortBy(undefined);
        loadIssues();
    }, [loadIssues]);

    return {
        visibleIssues,
        currentPage,
        loadIssues,
        addIssue,
        editIssue,
        deleteIssue,
        changePage,
        sort,
        search,
        reset
    }
};

export default useIssueService;