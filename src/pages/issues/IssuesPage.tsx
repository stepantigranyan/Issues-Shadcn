import useIssueService from "@/hooks/useIssueService";

import IssueHeader from "@/components/headers/IssueHeader";
import IssuesTable from "@/components/tables/IssueTable";
import TableSearch from "@/components/search/TableSearch";

import { issueService } from "@/services/service";

const IssuesPage = () => {
    const { visibleIssues, currentPage, loading, notFound, addIssue, editIssue, deleteIssue, changePage, sort, search } = useIssueService(issueService);

    return (
        <>
            <div className="relative flex flex-col items-center justify-center gap-y-5">
                <IssueHeader onAddIssue={addIssue} />
                <TableSearch
                    onSort={sort}
                    onSearch={search}
                />
                <IssuesTable
                    loading={loading}
                    issues={visibleIssues}
                    notFound={notFound}
                    onEdit={editIssue}
                    onDelete={deleteIssue}
                    onChangePage={changePage}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
};

export default IssuesPage;