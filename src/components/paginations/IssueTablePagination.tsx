import {
    Pagination, PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type {FC} from "react";

export interface IssuesTablePaginationProps {
    count: number;
    currentPage: number;
    onChangePage: (direction: "right" | "left", page?: number) => void;
}

export const IssueTablePagination: FC<IssuesTablePaginationProps> = ({count, onChangePage, currentPage}) => {
    return (
        <Pagination>
            <PaginationContent className="grid grid-cols-[100px_300px_100px]">
                {currentPage !== 1 ? <PaginationPrevious className="justify-self-start-safe cursor-pointer" onClick={() => onChangePage("right")}/> : <div></div>}

                <div className="flex justify-self-center-safe justify-center items-center gap-x-1">
                    {
                        (currentPage - 1 > 2 || currentPage === 3) &&
                        <PaginationItem>
                            <PaginationLink onClick={() => {onChangePage("right", 1)}} href="#">{1}</PaginationLink>
                        </PaginationItem>
                    }

                    {
                        currentPage - 1 > 2 &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    {
                        currentPage - 1 >= 1 &&
                        <PaginationItem>
                            <PaginationLink onClick={() => {onChangePage("right", currentPage - 1)}} href="#">{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                    }



                    <PaginationItem>
                        <PaginationLink isActive={true} href="#">{currentPage}</PaginationLink>
                    </PaginationItem>

                    {
                        currentPage + 1 <= count &&
                        <PaginationItem>
                            <PaginationLink onClick={() => {onChangePage("left", currentPage + 1)}} href="#">{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                    }

                    {
                        currentPage + 2 < count &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    {
                        (currentPage + 2 < count || currentPage === count - 2) &&
                        <PaginationItem>
                            <PaginationLink onClick={() => {onChangePage("left", count)}} href="#">{count}</PaginationLink>
                        </PaginationItem>
                    }

                </div>

                {currentPage !== count ? <PaginationNext className="justify-self-end-safe cursor-pointer" onClick={() => onChangePage("left")}/> : <div></div>}
            </PaginationContent>
        </Pagination>
    );
};