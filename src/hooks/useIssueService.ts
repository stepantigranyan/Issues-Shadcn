import {useCallback, useState, useLayoutEffect} from "react";
import type {IssueService} from "../services/issue/issue.service.ts";
import type {Issue, IssueAttributes} from "../models/issue/issue.type.ts";
import type {Label} from "../models/label/label.type.ts";
import {VISIBLE_ISSUES_COUNT} from "../consts";
import type {FindAndCountIssues} from "@/repositories/issue/issue.repository.ts";

const useIssueService = (service: IssueService) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [visibleIssues, setVisibleIssues] = useState<FindAndCountIssues>({data: [], count: 0});

    const loadIssues = useCallback(() => {
        const allIssues = service.getAll();
        setIssues(allIssues);
        const offsetIssues = allIssues.slice(0, VISIBLE_ISSUES_COUNT);

        setVisibleIssues({count: Math.ceil(allIssues.length / VISIBLE_ISSUES_COUNT), data: offsetIssues});
    }, [service]);

    useLayoutEffect(() => {
        loadIssues();
    }, [loadIssues]);

    const addIssue = (data: IssueAttributes, labels: Label[]) => {
        setCurrentPage(1);
        const issue = service.create(data, labels);
        setIssues((prev) => [issue, ...prev]);

        const offset = Math.ceil((issues.length + 1) / VISIBLE_ISSUES_COUNT) * (currentPage - 1);
        const offsetIssues = ([issue, ...issues]).slice(offset, offset + VISIBLE_ISSUES_COUNT);

        setVisibleIssues({count: Math.ceil((issues.length + 1) / VISIBLE_ISSUES_COUNT), data: offsetIssues})
    };

    const editIssue = (id: string, data: IssueAttributes, labels: Label[]) => {
        const issue = service.update(id, data, labels)!;
        setIssues((prev) => prev.map((x) => x.id === id ? issue : x));
        setVisibleIssues((prev) => ({data: prev.data.map((x) => x.id === id ? issue : x), count: prev.count}));
    };

    const deleteIssue = (id: string) => {
        service.delete(id);
        const newIssues = issues.filter((x) => x.id !== id);
        setIssues(newIssues);

        if (visibleIssues.data.length === 1) {
            if (visibleIssues.count === 1) {
                setIssues([]);
                setVisibleIssues({data: [], count: 0});
                return;
            }

            const offset = Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT) * (currentPage - 2);
            const offsetIssues = newIssues.slice(offset, offset + VISIBLE_ISSUES_COUNT);

            setCurrentPage((prev) => prev - 1);
            setVisibleIssues({data: offsetIssues, count: Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT)});
            return;
        }

        const offset = Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT) * (currentPage - 1);
        const offsetIssues = newIssues.slice(offset, offset + VISIBLE_ISSUES_COUNT);

        setVisibleIssues({data: offsetIssues, count: Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT)});
    };

    const changePage = (direction: "right" | "left", page?: number) => {
        let offsetIssues;
        let offset;

        if (page === undefined) {
            if (direction === "left") {
                setCurrentPage((prev) => prev + 1);
                offset = Math.ceil(issues.length / VISIBLE_ISSUES_COUNT) === issues.length / VISIBLE_ISSUES_COUNT ? Math.ceil(issues.length / VISIBLE_ISSUES_COUNT) * (currentPage) + 1 : Math.ceil(issues.length / VISIBLE_ISSUES_COUNT) * (currentPage);
            } else {
                setCurrentPage((prev) => prev - 1);
                offset = Math.ceil(issues.length / VISIBLE_ISSUES_COUNT) * (currentPage - 2);
            }


            offsetIssues = issues.slice(offset, offset + VISIBLE_ISSUES_COUNT);
        } else {
            setCurrentPage(page);
            const offset = Math.ceil(issues.length / VISIBLE_ISSUES_COUNT) * (page - 1);
            offsetIssues = issues.slice(offset, offset + VISIBLE_ISSUES_COUNT);
        }

        setVisibleIssues({count: Math.ceil(issues.length / VISIBLE_ISSUES_COUNT), data: offsetIssues});
    }


    const sort = (type: "ASC" | "DESC") => {
        let sortedIssues;

        if (type === "ASC") {
            sortedIssues = issues.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
        } else {
            sortedIssues = issues.sort((a, b) => b.title.toLowerCase() < a.title.toLowerCase() ? -1 : 1)
        }

        const offset = Math.ceil(sortedIssues.length / VISIBLE_ISSUES_COUNT) * (currentPage - 1);
        const offsetIssues = sortedIssues.slice(offset, offset + VISIBLE_ISSUES_COUNT);

        setIssues(sortedIssues);
        setVisibleIssues({count: Math.ceil(sortedIssues.length / VISIBLE_ISSUES_COUNT), data: offsetIssues});
        setCurrentPage(1);
    };

    const search = (input: string) => {
        const searchedIssues = issues.filter((x) => (
                x.title.toLowerCase().startsWith(input.toLowerCase()) || x.description.toLowerCase().startsWith(input.toLowerCase()
            )
        ));

        const offset = Math.ceil(searchedIssues.length / VISIBLE_ISSUES_COUNT) * (currentPage - 1);
        const searchedOffsetIssues = searchedIssues.slice(offset, offset + VISIBLE_ISSUES_COUNT);

        setIssues(searchedIssues);
        setVisibleIssues({
            data: searchedOffsetIssues,
            count: Math.ceil(searchedIssues.length / VISIBLE_ISSUES_COUNT),
        });
    }

    const reset = () => {
        loadIssues();
    }

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