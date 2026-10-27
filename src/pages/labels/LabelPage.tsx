import useLabelService from "@/hooks/useLabelService.ts";
import {labelService} from "@/services/service.ts";

import LabelHeader from "@/components/headers/LabelHeader.tsx";
import LabelTable from "@/components/tables/LabelTable.tsx";
import TableSearch from "@/components/search/TableSearch.tsx";

const IssuesPage = () => {
    const {visibleLabels, currentPage, loading, notFound, addLabel, editLabel, deleteLabel, changePage, sort, search} = useLabelService(labelService);

    return (
        <>
            <div className="relative flex flex-col items-center justify-center gap-y-5">
                <LabelHeader onAddLabel={addLabel} />
                <TableSearch
                    onSort={sort}
                    onSearch={search}
                />
                <LabelTable
                    loading={loading}
                    labels={visibleLabels}
                    onEdit={editLabel}
                    notFound={notFound}
                    onDelete={deleteLabel}
                    onChangePage={changePage}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
};

export default IssuesPage;