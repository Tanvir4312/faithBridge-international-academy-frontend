"use client"
import DataTable from '@/components/shared/table/DataTable'
import { getAllApplication, rejectApplication, updateApplicationAndCreateStudent } from '@/services/admin-srever-action/applications-managements.service'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { applicationColumns } from './ApplicationManagementsColumns'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { SortingState } from '@tanstack/react-table'
import { IApplicationsData, ApplicationStatus } from '@/types/Dashboard/admin-dashboard-types/applications-management.types'
import PaginationControls from '@/components/shared/pagination_controll/PaginationControll'
import ApplicationDetailModal from '../../../../shared/applicationModal/ApplicationDetailModal'
import { toast } from 'sonner'


const ApplicationsManagement = ({ queryParamsString, queryParamsObj }: { queryParamsString: string; queryParamsObj: { [key: string]: string | string[] | undefined } }) => {

 const pathname = usePathname();
 const searchParams = useSearchParams();

 const [selectedApplication, setSelectedApplication] = useState<IApplicationsData | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const queryClient = useQueryClient();

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


 const { data: applicationsResponse, isLoading, isFetching } = useQuery({
  queryKey: ["applications", currentQueryString],
  queryFn: () => getAllApplication(currentQueryString),
  refetchOnWindowFocus: true,
  placeholderData: keepPreviousData,
 })

 // Safely parse deeply nested API response formats to prevent crash if data structure diverges
 const rawData = applicationsResponse?.data;

 const applications = Array.isArray(rawData) ? rawData : (Array.isArray(rawData?.data) ? rawData?.data : [])

 const apiMeta = rawData?.meta;
 const pagination = {
  current_page: Number(apiMeta?.page) || Number(apiMeta?.current_Page) || Number(apiMeta?.current_Page) || Number(currentQueryParams.get('page')) || 1,
  limit: Number(apiMeta?.limit) || Number(currentQueryParams.get('limit')) || 10,
  total_page: Number(apiMeta?.total_page) || Number(apiMeta?.total_page) || 1,
  total: Number(apiMeta?.total) || 0,
 };



 const hadleVewAdmin = (applicationData: IApplicationsData) => {
  setSelectedApplication(applicationData);
  setIsModalOpen(true);

 }
 const handleEditAdmin = (applicationData: IApplicationsData) => {
  setSelectedApplication(applicationData);
  setIsModalOpen(true);
 }


 const handleApprove = async (applicationData: IApplicationsData) => {
  const promise = updateApplicationAndCreateStudent(applicationData.id);

  toast.promise(promise, {
   loading: "Processing approval...",
   success: () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    return `${applicationData.nameEn}'s application has been approved!`;
   },
   error: (err: any) => err?.message || "Failed to approve. Please try again.",
  });
  setIsModalOpen(false);
 }
 const handleReject = async (applicationData: IApplicationsData) => {
  const promise = rejectApplication(applicationData.id);

  toast.promise(promise, {
   loading: "Processing rejection...",
   success: () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    return `${applicationData.nameEn}'s application has been rejected.`;
   },
   error: (err: any) => err?.message || "Failed to reject. Please try again.",
  });
  setIsModalOpen(false);
 }

 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 const isTableLoading = mounted && (isLoading || isFetching);



 return (
  <div>
   <ApplicationDetailModal
    application={selectedApplication}
    open={isModalOpen}
    onOpenChange={setIsModalOpen}
    onApprove={handleApprove}
    onReject={handleReject}
   />
   <DataTable
    data={applications}
    columns={applicationColumns}
    isLoading={isTableLoading}
    emptyMessage="No application data available."
    sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
    searching={{ searchTerm, onSearchChange: handleSearchChange }}
    actions={
     {
      onView: hadleVewAdmin,
      onEdit: handleEditAdmin,
      showView: (data) => data.status !== ApplicationStatus.PENDING,
      showEdit: (data) => data.status === ApplicationStatus.PENDING
     }
    }
   />
   <PaginationControls
    meta={pagination}
    onPageChange={handlePageChange}
    onLimitChange={handleLimitChange}
   />
  </div>
 )
}

export default ApplicationsManagement 