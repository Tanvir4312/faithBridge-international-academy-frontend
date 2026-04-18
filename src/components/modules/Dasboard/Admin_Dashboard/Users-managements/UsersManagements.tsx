"use client"
import DataTable from '@/components/shared/table/DataTable'
import { getAllUser } from '@/services/admin-srever-action/users-managements.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import { usersColumns } from './usersColumns'
import { IUsersManagements } from '@/types/Dashboard/admin-dashboard-types/users-managements.types'
import PaginationControls from '@/components/shared/pagination_controll/PaginationControll'
import { SortingState } from '@tanstack/react-table'
import { usePathname, useSearchParams } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import EditUserOptionsModal from './EditUserOptionsModal'
import ChangeUserStatusModal from './ChangeUserStatusModal'
import ChangeUserRoleModal from './ChangeUserRoleModal'
import { toast } from 'sonner'

const UsersManagements = ({ queryParamsString, queryParamsObj, currentUser }: { queryParamsString: string; queryParamsObj: { [key: string]: string | string[] | undefined }; currentUser: any }) => {

 const pathname = usePathname();
 const searchParams = useSearchParams();

 const [currentQueryString, setCurrentQueryString] = useState(queryParamsString);

 // Modal states
 const [selectedUser, setSelectedUser] = useState<IUsersManagements | null>(null);
 const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
 const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
 const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

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

 const searchTerm = currentQueryParams.get('searchTerm') ?? '';

 const { data: usersResponse, isLoading, isFetching } = useQuery<any>({
  queryKey: ["users", currentQueryString],
  queryFn: () => getAllUser(currentQueryString),
  refetchOnWindowFocus: true,
  placeholderData: keepPreviousData,
 })

 const apiMeta = usersResponse?.data?.meta;
 const pagination = {
  current_page: Number(apiMeta?.current_Page) || Number(currentQueryParams.get('page')) || 1,
  limit: Number(apiMeta?.limit) || Number(currentQueryParams.get('limit')) || 10,
  total_page: Number(apiMeta?.total_page) || 1,
  total: Number(apiMeta?.total) || 0,
 };

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

  if (typeof window !== 'undefined') {
   window.history.replaceState(null, '', destination);
  }
 };

 const handlePageChange = (page: number) => {
  const params = new URLSearchParams(currentQueryString);
  params.set('page', page.toString());
  params.set('limit', pagination.limit.toString());

  const queryString = params.toString();
  const destination = queryString ? `${pathname}?${queryString}` : pathname;

  setCurrentQueryString(queryString);

  if (typeof window !== 'undefined') {
   window.history.pushState(null, '', destination);
  }
 };

 const handleLimitChange = (limit: number) => {
  const params = new URLSearchParams(currentQueryString);
  params.set('limit', limit.toString());
  params.set('page', '1');

  const queryString = params.toString();
  const destination = queryString ? `${pathname}?${queryString}` : pathname;

  setCurrentQueryString(queryString);

  if (typeof window !== 'undefined') {
   window.history.pushState(null, '', destination);
  }
 };

 const handleSearchChange = (newSearchTerm: string) => {
  const params = new URLSearchParams(currentQueryString);

  if (newSearchTerm) {
   params.set('searchTerm', newSearchTerm);
  } else {
   params.delete('searchTerm');
  }

  params.set('page', '1');
  params.set('limit', pagination.limit.toString());

  const queryString = params.toString();
  const destination = queryString ? `${pathname}?${queryString}` : pathname;

  setCurrentQueryString(queryString);

  if (typeof window !== 'undefined') {
   window.history.pushState(null, '', destination);
  }
 };


 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 const isTableLoading = mounted && (isLoading || isFetching);

 const closeAllModals = () => {
  setIsOptionsModalOpen(false);
  setIsStatusModalOpen(false);
  setIsRoleModalOpen(false);
  setSelectedUser(null);
 };

 const handleEdit = async (user: IUsersManagements) => {
  // 1. You cannot edit yourself
  if (currentUser?.id === user.id) {
   toast.error("Security Restriction: You cannot modify your own master record from this panel.");
   return;
  }

  // 2. Admin cannot edit Super Admin
  if (currentUser?.role === 'ADMIN' && user.role === 'SUPER_ADMIN') {
   toast.error("Access Denied: You do not have permission to modify a Super Admin.");
   return;
  }

  // 3. Admin cannot edit other Admins
  if (currentUser?.role === 'ADMIN' && user.role === 'ADMIN') {
   toast.error("Access Denied: Standard Admins cannot modify other Admin accounts.");
   return;
  }

  setSelectedUser(user);
  setIsOptionsModalOpen(true);
 }

 const handleOpenStatusModal = (user: IUsersManagements) => {
  setSelectedUser(user);
  setIsStatusModalOpen(true);
 }

 const handleOpenRoleModal = (user: IUsersManagements) => {
  setSelectedUser(user);
  setIsRoleModalOpen(true);
 }

 const users = usersResponse?.data?.data || []

 return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
   <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
    <CardHeader className="pb-2">
     <div className="flex items-center gap-4">
      <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
       <Users className="w-6 h-6" />
      </div>
      <div>
       <CardTitle className="text-2xl font-black tracking-tight">System User Directory</CardTitle>
       <CardDescription className="font-medium text-gray-500">Manage and monitor all application stakeholders from a centralized dashboard.</CardDescription>
      </div>
     </div>
    </CardHeader>
    <CardContent className="pt-6">
     <DataTable
      data={users}
      columns={usersColumns}
      isLoading={isTableLoading}
      sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
      searching={{ searchTerm, onSearchChange: handleSearchChange }}
      emptyMessage="No users found matching your search criteria."
      actions={
       {
        onEdit: handleEdit
       }
      }

     />
     <div className="mt-6">
      <PaginationControls
       meta={pagination}
       onPageChange={handlePageChange}
       onLimitChange={handleLimitChange}
      />
     </div>
    </CardContent>
   </Card>

   {/* Modals */}
   <EditUserOptionsModal
    user={selectedUser}
    isOpen={isOptionsModalOpen}
    onOpenChange={setIsOptionsModalOpen}
    onChangeStatus={handleOpenStatusModal}
    onChangeRole={handleOpenRoleModal}
   />

   <ChangeUserStatusModal
    user={selectedUser}
    isOpen={isStatusModalOpen}
    onOpenChange={(open) => {
     if (!open) closeAllModals();
     else setIsStatusModalOpen(true);
    }}
   />

   <ChangeUserRoleModal
    user={selectedUser}
    isOpen={isRoleModalOpen}
    onOpenChange={(open) => {
     if (!open) closeAllModals();
     else setIsRoleModalOpen(true);
    }}
   />
  </div>
 )
}

export default UsersManagements