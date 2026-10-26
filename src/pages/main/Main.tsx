import useIssueService from "@/hooks/useIssueService.ts";
import {issueService} from "@/services/service.ts";

import MainHeader from "@/components/headers/MainHeader.tsx";
import IssuesTable from "@/components/tables/IssueTable.tsx";
import IssueTableSearch from "@/components/search/IssueTableSearch.tsx";

const MainPage = () => {
    const {visibleIssues, currentPage, addIssue, editIssue, deleteIssue, changePage, sort, search, reset} = useIssueService(issueService);

    return (
        <>

            <div className="relative flex flex-col items-center justify-center gap-y-5">
                <MainHeader
                    onAddIssue={addIssue}
                />
                <IssueTableSearch onSort={sort} onSearch={search} onReset={reset}></IssueTableSearch>
                <IssuesTable
                    issues={visibleIssues}
                    onEdit={editIssue}
                    onDelete={deleteIssue}
                    onChangePage={changePage}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
};

export default MainPage;