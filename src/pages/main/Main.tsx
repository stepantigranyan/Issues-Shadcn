import usePopup from "@/hooks/usePopup.ts";
import useIssueService from "@/hooks/useIssueService.ts";
import {useState} from "react";
import {issueService} from "@/services/service.ts";

import MainHeader from "@/components/headers/MainHeader.tsx";
import IssuesTable from "@/components/tables/IssueTable.tsx";
import AddIssuePopup from "@/components/popups/issue/add/AddIssuePopup.tsx";
import AddLabelPopup from "@/components/popups/label/add/AddLabelPopup.tsx";
import DeleteIssuePopup from "@/components/popups/issue/delete/DeleteIssuePopup.tsx";
import type {Issue} from "@/models/issue/issue.type.ts";
import EditIssuePopup from "@/components/popups/issue/edit/EditIssuePopup.tsx";
import InfoIssuePopup from "@/components/popups/issue/info/InfoIssuePopup.tsx";

const MainPage = () => {
    const [showAddIssuePopup, toggleAddIssuePopup] = usePopup();
    const [showAddLabelPopup, toggleAddLabelPopup] = usePopup();
    const [showEditIssuePopup, toggleEditIssuePopup] = usePopup();
    const [showDeleteIssuePopup, toggleDeleteIssuePopup] = usePopup();
    const [showInfoPopup, toggleInfoPopup] = usePopup();
    const {visibleIssues, currentPage, addIssue, editIssue, deleteIssue, changePage, sort, search, reset} = useIssueService(issueService);

    const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);

    const handleEditIssue = (issue: Issue) => {
        toggleEditIssuePopup();
        setCurrentIssue(issue);
    };

    const handleDeleteIssue = (issue: Issue) => {
        toggleDeleteIssuePopup();
        setCurrentIssue(issue);
    };

    const handleInfoIssue = (issue: Issue) => {
        toggleInfoPopup();
        setCurrentIssue(issue);
    }

    return (
        <>
            {showAddIssuePopup && <AddIssuePopup onClose={toggleAddIssuePopup} onSubmit={addIssue} />}
            {showAddLabelPopup && <AddLabelPopup onClose={toggleAddLabelPopup}/>}
            {showEditIssuePopup && <EditIssuePopup onClose={toggleEditIssuePopup} onSubmit={editIssue} data={currentIssue!}/>}
            {showDeleteIssuePopup && <DeleteIssuePopup onClose={toggleDeleteIssuePopup} onSubmit={deleteIssue} data={currentIssue!} />}
            {showInfoPopup && <InfoIssuePopup data={currentIssue!} onClose={toggleInfoPopup}/>}

            <div className="relative flex flex-col items-center justify-center gap-y-5">
                <MainHeader
                    onAddIssue={toggleAddIssuePopup}
                    onAddLabel={toggleAddLabelPopup}/>
                <IssuesTable
                    issues={visibleIssues}
                    onSort={sort}
                    onEdit={handleEditIssue}
                    onInfo={handleInfoIssue}
                    onDelete={handleDeleteIssue}
                    onChangePage={changePage}
                    onSearch={search}
                    onReset={reset}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
};

export default MainPage;