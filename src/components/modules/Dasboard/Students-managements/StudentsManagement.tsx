"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllStudent } from "@/services/admin-srever-action/students-managements.service"
import { IStudent } from "@/types/Dashboard/admin-dashboard-types/students-managements.types"
import { useQuery } from "@tanstack/react-query"
import { studentColumns } from "./studentColumns"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { SortingState } from "@tanstack/react-table"
import PaginationControls from "@/components/shared/pagination_controll/PaginationControll"
import { keepPreviousData } from '@tanstack/react-query'

import StudentDetailsModal from "../../../shared/studentModals/StudentDetailsModal"
import UpdateStudentModal from "../../../shared/studentModals/UpdateStudentModal"
import DeleteStudentModal from "./DeleteStudentModal"

function StudentsManagement({ queryParamsString, queryParamsObj }: { queryParamsString: string; queryParamsObj: { [key: string]: string | string[] | undefined } }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [currentQueryString, setCurrentQueryString] = useState(queryParamsString);

    useEffect(() => {
        setCurrentQueryString(searchParams?.toString() ?? queryParamsString);
    }, [searchParams, queryParamsString]);

    const currentQueryParams = useMemo(() => {
        return new URLSearchParams(currentQueryString);
    }, [currentQueryString]);

    const sortBy = currentQueryParams.get('sortBy') ?? '';
    const sortOrder = currentQueryParams.get('sortOrder') ?? 'asc';

    const sortingState = useMemo(() => {
        return sortBy ? [{ id: sortBy, desc: sortOrder === 'desc' }] : [];
    }, [sortBy, sortOrder]);

    const handleSortingChange = (nextSortingState: SortingState) => {
        const [sort] = nextSortingState;
        const params = new URLSearchParams(currentQueryString);

        if (!sort?.id) {
            params.delete('sortBy');
            params.delete('sortOrder');
        } else {
            params.set('sortBy', typeof sort.id === 'string' ? sort.id : String(sort.id));
            params.set('sortOrder', sort.desc ? 'desc' : 'asc');
        }

        const queryString = params.toString();
        const destination = queryString ? `${pathname}?${queryString}` : pathname;

        setCurrentQueryString(queryString);

        // Immediately update URL in the browser address bar for instant feedback
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', destination);
        }
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(currentQueryString);
        params.set('page', page.toString());

        // Ensure limit remains in the URL for accurate hydration on refresh
        params.set('limit', pagination.limit.toString());

        const queryString = params.toString();
        const destination = queryString ? `${pathname}?${queryString}` : pathname;

        setCurrentQueryString(queryString);

        if (typeof window !== 'undefined') {
            // Use pushState so history back-button respects the page change!
            window.history.pushState(null, '', destination);
        }
    };

    const handleLimitChange = (limit: number) => {
        const params = new URLSearchParams(currentQueryString);
        params.set('limit', limit.toString());
        params.set('page', '1'); // Always reset to page 1 when changing limit!

        const queryString = params.toString();
        const destination = queryString ? `${pathname}?${queryString}` : pathname;

        setCurrentQueryString(queryString);

        if (typeof window !== 'undefined') {
            window.history.pushState(null, '', destination);
        }
    };

    const searchTerm = currentQueryParams.get('searchTerm') ?? '';

    const handleSearchChange = (newSearchTerm: string) => {
        const params = new URLSearchParams(currentQueryString);

        if (newSearchTerm) {
            params.set('searchTerm', newSearchTerm);
        } else {
            params.delete('searchTerm');
        }

        // Always reset to page 1 when searching
        params.set('page', '1');
        if (pagination.limit) {
            params.set('limit', pagination.limit.toString());
        }

        const queryString = params.toString();
        const destination = queryString ? `${pathname}?${queryString}` : pathname;

        setCurrentQueryString(queryString);

        if (typeof window !== 'undefined') {
            window.history.pushState(null, '', destination);
        }
    };



    const { data: studentsResponse, isLoading, isFetching } = useQuery<any>({
        queryKey: ["students", currentQueryString],
        queryFn: () => getAllStudent(currentQueryString),
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    })
    const rawData = studentsResponse?.data

    const students = Array.isArray(rawData) ? rawData : (Array.isArray(rawData?.data) ? rawData.data : [])

    const apiMeta = rawData?.meta;
    const pagination = {
        current_page: Number(apiMeta?.page) || Number(apiMeta?.current_Page) || Number(apiMeta?.current_Page) || Number(currentQueryParams.get('page')) || 1,
        limit: Number(apiMeta?.limit) || Number(currentQueryParams.get('limit')) || 10,
        total_page: Number(apiMeta?.total_page) || Number(apiMeta?.total_page) || 1,
        total: Number(apiMeta?.total) || 0,
    };

    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<IStudent | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedStudentForDelete, setSelectedStudentForDelete] = useState<IStudent | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleView = (student: IStudent) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    }
    const handleEdit = (student: IStudent) => {
        setSelectedStudentForEdit(student);
        setIsEditModalOpen(true);
    }
    const handleDelete = (student: IStudent) => {
        setSelectedStudentForDelete(student);
        setIsDeleteModalOpen(true);
    }
    const isSortingLoading = isLoading || isFetching;
    return (
        <div>
            <DataTable
                data={students}
                columns={studentColumns}
                emptyMessage="No students found"
                isLoading={isSortingLoading}
                sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
                searching={{ searchTerm, onSearchChange: handleSearchChange }}
                actions={
                    {
                        onView: handleView,
                        onEdit: handleEdit,
                        onDelete: handleDelete
                    }

                }
            />
            <PaginationControls
                meta={pagination}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />
            <StudentDetailsModal
                student={selectedStudent}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
            <UpdateStudentModal
                student={selectedStudentForEdit}
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
            />
            <DeleteStudentModal
                student={selectedStudentForDelete}
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            />
        </div>
    )
}

export default StudentsManagement