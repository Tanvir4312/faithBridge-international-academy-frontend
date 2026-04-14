"use client"
import DataTable from '@/components/shared/table/DataTable';
import { getAllFromFillup } from '@/services/admin-srever-action/fromFillup-managements.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fromFillupColumns } from './fromFillupColumns';
import { IFromFillupData } from '@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types';

const FromFillupsManagements = () => {
 const { data: fromFillupResponse, isLoading } = useQuery({
  queryKey: ["from-fillup"],
  queryFn: getAllFromFillup,
  refetchOnWindowFocus: false,
 })
 console.log("fromFillupResponse", fromFillupResponse)
 const { data: fromFillupData = [] } = fromFillupResponse || {}
 const handleView = (id: IFromFillupData) => {
  console.log("view", id)
 }
 const handleEdit = (id: IFromFillupData) => {
  console.log("edit", id)
 }
 const handleDelete = (id: IFromFillupData) => {
  console.log("delete", id)
 }
 return (
  <div>
   <DataTable
    data={fromFillupData}
    columns={fromFillupColumns}
    emptyMessage='No from fillup data found'
    isLoading={isLoading}
    actions={
     {
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete,
     }
    }
   />
  </div>
 );
};

export default FromFillupsManagements;