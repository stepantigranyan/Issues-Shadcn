import useLabelService from '@/hooks/useLabelService';
import { labelService } from '@/services/service';

import LabelHeader from '@/components/headers/LabelHeader';
import LabelTable from '@/components/tables/LabelTable';
import TableSearch from '@/components/search/TableSearch';

const IssuesPage = () => {
    const {
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
    } = useLabelService(labelService);

    return (
        <>
            <div className="relative flex flex-col items-center justify-center gap-y-5">
                <LabelHeader onAddLabel={addLabel} />
                <TableSearch onSort={sort} onSearch={search} />
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
    );
};

export default IssuesPage;
