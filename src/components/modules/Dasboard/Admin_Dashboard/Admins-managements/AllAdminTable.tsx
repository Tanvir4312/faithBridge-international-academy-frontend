"use client"
import { getAllAdmin } from '@/services/admin-srever-action/allAdmin.service';
import { IAdminsData } from '@/types/Dashboard/admin-dashboard-types/types';
import { ApiSuccessResponse } from '@/types/api.types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import DataTable from '@/components/shared/table/DataTable';
import { adminColumns } from './allAdminColumns';

const AllAdminTable = ({ queryParamsString, queryParamsObj }: { queryParamsString: string; queryParamsObj: { [key: string]: string | string[] | undefined } }) => {
    // const router = useRouter();
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
        const params = new URLSearchParams(searchParams?.toString() ?? '');

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

    const { data: adminsResponse, isLoading, isFetching } = useQuery<any>({
        queryKey: ["all-admins", currentQueryString],
        queryFn: () => getAllAdmin(currentQueryString),
        refetchOnWindowFocus: true, // Refetch data when the window regains focus
        placeholderData: keepPreviousData,
    })

    // Safely parse deeply nested API response formats to prevent crash if data structure diverges
    const rawData = adminsResponse?.data;
    const admins = Array.isArray(rawData) ? rawData : (Array.isArray(rawData?.data) ? rawData.data : []);

    const hadleVewAdmin = (admin: IAdminsData) => {
        console.log("View admin:", admin);
    }
    const handleEditAdmin = (admin: IAdminsData) => {
        console.log("Edit admin:", admin);
    }
    const handleDeleteAdmin = (admin: IAdminsData) => {
        console.log("Delete admin:", admin);
    }

    const isSortingLoading = isLoading || isFetching;

    return (
        <DataTable
            data={admins}
            columns={adminColumns}
            emptyMessage="No admin data available."
            isLoading={isSortingLoading}
            sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
            actions={
                {
                    onView: hadleVewAdmin,
                    onEdit: handleEditAdmin,
                    onDelete: handleDeleteAdmin
                }
            }
        ></DataTable>
    );
};

export default AllAdminTable;