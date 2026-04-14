"use client"
import DataTable from '@/components/shared/table/DataTable'
import { getAllApplication } from '@/services/admin-srever-action/applications-managements.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { applicationColumns } from './ApplicationManagementsColumns'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { SortingState } from '@tanstack/react-table'
import { keepPreviousData } from '@tanstack/react-query'
import { IApplicationsData } from '@/types/Dashboard/admin-dashboard-types/applications-management.types'
import PaginationControls from '@/components/shared/pagination_controll/PaginationControll'

const ApplicationsManagement = ({ queryParamsString, queryParamsObj }: { queryParamsString: string; queryParamsObj: { [key: string]: string | string[] | undefined } }) => {

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

 const handlePageChange = (page: number) => {
  const params = new URLSearchParams(searchParams?.toString() ?? '');
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
  const params = new URLSearchParams(searchParams?.toString() ?? '');
  params.set('limit', limit.toString());
  params.set('page', '1'); // Always reset to page 1 when changing limit!

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



 const hadleVewAdmin = (admin: IApplicationsData) => {
  console.log("View admin:", admin);
 }
 const handleEditAdmin = (admin: IApplicationsData) => {
  console.log("Edit admin:", admin);
 }
 const handleDeleteAdmin = (admin: IApplicationsData) => {
  console.log("Delete admin:", admin);
 }

 const isSortingLoading = isLoading || isFetching;



 return (
  <div>
   <DataTable
    data={applications}
    columns={applicationColumns}
    isLoading={isSortingLoading}
    emptyMessage="No application data available."
    sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
    actions={
     {
      onView: hadleVewAdmin,
      onEdit: handleEditAdmin,
      onDelete: handleDeleteAdmin,
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