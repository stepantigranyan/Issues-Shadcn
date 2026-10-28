import { useState, useLayoutEffect, useCallback } from 'react';
import type { IssueService } from '../services/issue/issue.service';
import type { Issue } from '../models/issue/issue.type';

import { VISIBLE_ISSUES_COUNT } from '@/consts';
import type { FindAndCountIssues } from '@/repositories/issue/issue.repository';

const useIssueService = (service: IssueService) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [visibleIssues, setVisibleIssues] = useState<FindAndCountIssues>({
        data: [],
        pages: 1,
    });
    const [sortBy, setSortBy] = useState<'ASC' | 'DESC' | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    const countOffset = (page: number) => {
        return (page - 1) * VISIBLE_ISSUES_COUNT;
    };

    const offsetIssues = (array: Issue[], from: number) => {
        return array.slice(from, from + VISIBLE_ISSUES_COUNT);
    };

    const loadIssues = useCallback(() => {
        try {
            setLoading(true);
            setCurrentPage(1);
            const allIssues = service.getAll(sortBy);
            setIssues(allIssues);
            setVisibleIssues({
                pages: Math.ceil(allIssues.length / VISIBLE_ISSUES_COUNT),
                data: offsetIssues(allIssues, 0),
            });
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [service, sortBy]);

    useLayoutEffect(() => {
        loadIssues();
    }, []);

    const addIssue = useCallback(
        (title: string, description: string, labels: string[]) => {
            try {
                setLoading(true);
                setCurrentPage(1);
                const issue = service.create(title, description, labels);

                const newIssues = [issue, ...issues];

                setIssues(newIssues);

                setVisibleIssues({
                    pages: Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT),
                    data: offsetIssues(newIssues, 0),
                });
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        },
        [issues, service],
    );

    const editIssue = useCallback(
        (iss: Issue) => {
            try {
                setLoading(true);
                const issue = service.update(iss)!;
                setIssues((prev) =>
                    prev.map((x) => (x.id === iss.id ? issue : x)),
                );
                setVisibleIssues((prev) => ({
                    data: prev.data.map((x) => (x.id === iss.id ? issue : x)),
                    pages: prev.pages,
                }));
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        },
        [service],
    );

    const deleteIssue = useCallback(
        (id: string) => {
            try {
                setLoading(true);
                service.delete(id);
                const newIssues = issues.filter((x) => x.id !== id);
                const prevPage = currentPage - 1;
                setIssues(newIssues);

                if (visibleIssues.data.length === 1) {
                    if (visibleIssues.pages === 1) {
                        setIssues([]);
                        setVisibleIssues({ data: [], pages: 1 });
                        return;
                    }

                    const offset = countOffset(prevPage);

                    setCurrentPage(prevPage);
                    setVisibleIssues({
                        data: offsetIssues(newIssues, offset),
                        pages: Math.ceil(
                            newIssues.length / VISIBLE_ISSUES_COUNT,
                        ),
                    });
                    return;
                }

                const offset = countOffset(currentPage);

                setVisibleIssues({
                    data: offsetIssues(newIssues, offset),
                    pages: Math.ceil(newIssues.length / VISIBLE_ISSUES_COUNT),
                });
            } finally {
                setLoading(false);
            }
        },
        [
            currentPage,
            issues,
            service,
            visibleIssues.data.length,
            visibleIssues.pages,
        ],
    );

    const changePage = useCallback(
        (page: number) => {
            try {
                setLoading(true);
                setCurrentPage(page);

                const offset = countOffset(page);

                setVisibleIssues({
                    pages: Math.ceil(issues.length / VISIBLE_ISSUES_COUNT),
                    data: offsetIssues(issues, offset),
                });
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        },
        [issues],
    );

    const sort = useCallback(
        (type: 'ASC' | 'DESC' | undefined) => {
            try {
                setLoading(true);
                setSortBy(type);
                let sortedData: Issue[];

                if (type === 'ASC') {
                    sortedData = issues.sort((a, b) =>
                        a.title < b.title ? -1 : 1,
                    );
                } else if (type === 'DESC') {
                    sortedData = issues.sort((a, b) =>
                        b.title < a.title ? -1 : 1,
                    );
                } else {
                    sortedData = issues.sort((a, b) => b.created - a.created);
                }

                setIssues(sortedData);
                setVisibleIssues({
                    pages: Math.ceil(sortedData!.length / VISIBLE_ISSUES_COUNT),
                    data: offsetIssues(sortedData, 0),
                });
                setCurrentPage(1);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        },
        [issues],
    );

    const search = useCallback(
        (input: string) => {
            try {
                setNotFound(false);
                setLoading(true);
                const searchedInput = input.toLowerCase().split(' ').join('');
                const allIssues = [...service.getAll(sortBy)];
                const searchedIssues = allIssues.filter((x) => {
                    const titleText = x.title.toLowerCase().split(' ').join('');
                    const descriptionText = x.description
                        .toLowerCase()
                        .split(' ')
                        .join('');

                    return (
                        titleText.includes(searchedInput) ||
                        descriptionText.includes(searchedInput)
                    );
                });

                if (searchedIssues.length === 0) {
                    setNotFound(true);
                    return;
                }

                const searchedOffsetIssues = searchedIssues.slice(
                    0,
                    VISIBLE_ISSUES_COUNT,
                );

                setIssues(searchedIssues);
                setVisibleIssues({
                    data: offsetIssues(searchedOffsetIssues, 0),
                    pages: Math.ceil(
                        searchedIssues.length / VISIBLE_ISSUES_COUNT,
                    ),
                });
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        },
        [service, sortBy],
    );

    return {
        visibleIssues,
        currentPage,
        loading,
        notFound,
        loadIssues,
        addIssue,
        editIssue,
        deleteIssue,
        changePage,
        sort,
        search,
    };
};

export default useIssueService;
