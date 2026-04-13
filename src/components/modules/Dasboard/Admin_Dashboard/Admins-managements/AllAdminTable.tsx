"use client"
import { getAllAdmin } from '@/services/admin-srever-action/allAdmin.service';
import { IAdminsData } from '@/types/Dashboard/admin-dashboard-types/types';
import { ApiSuccessResponse } from '@/types/api.types';
import { useQuery } from '@tanstack/react-query';
import DataTable from '@/components/shared/table/DataTable';
import { adminColumns } from './allAdminColumns';

const AllAdminTable = () => {


    const { data: adminsResponse, isLoading } = useQuery<ApiSuccessResponse<{ data: IAdminsData[] }>>({
        queryKey: ["all-admins"],
        queryFn: getAllAdmin,
        refetchOnWindowFocus: "always" // Refetch data when the window regains focus
    })


    const { data: admins = [] } = adminsResponse?.data ?? {};



    const hadleVewAdmin = (admin: IAdminsData) => {
        console.log("View admin:", admin);
    }
    const handleEditAdmin = (admin: IAdminsData) => {
        console.log("Edit admin:", admin);
    }
    const handleDeleteAdmin = (admin: IAdminsData) => {
        console.log("Delete admin:", admin);
    }

    return (
        <DataTable
            data={admins}
            columns={adminColumns}
            emptyMessage="No admin data available."
            isLoading={isLoading}
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