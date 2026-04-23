"use client"
import DataTable from '@/components/shared/table/DataTable';
import { getAllFromFillup } from '@/services/admin-srever-action/fromFillup-managements.service';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fromFillupColumns } from './fromFillupColumns';
import { IFromFillupData } from '@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types';
import ViewFromFillupModal from './ViewFromFillupModal';
import UpdateFromFillupStatusModal from './UpdateFromFillupStatusModal';
import DeleteFromFillupModal from './DeleteFromFillupModal';

const FromFillupsManagements = () => {
 const [selectedData, setSelectedData] = useState<IFromFillupData | null>(null);
 const [isViewModalOpen, setIsViewModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

 const { data: fromFillupResponse, isLoading, refetch } = useQuery({
  queryKey: ["from-fillup"],
  queryFn: getAllFromFillup,
  refetchOnWindowFocus: true,
 })

 const { data: fromFillupData = [] } = fromFillupResponse || {}

 const handleView = (data: IFromFillupData) => {
  setSelectedData(data);
  setIsViewModalOpen(true);
 }
 const handleEdit = (data: IFromFillupData) => {
  setSelectedData(data);
  setIsEditModalOpen(true);
 }
 const handleDelete = (data: IFromFillupData) => {
  setSelectedData(data);
  setIsDeleteModalOpen(true);
 }
 return (
  <div className="space-y-4 p-4 text-left">
   <div className="flex justify-between items-center text-left">
    <h2 className="text-2xl font-bold text-primary text-left">Form Fillups Management</h2>
   </div>
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

   <ViewFromFillupModal
    open={isViewModalOpen}
    onOpenChange={setIsViewModalOpen}
    data={selectedData}
   />

   <UpdateFromFillupStatusModal
    open={isEditModalOpen}
    onOpenChange={setIsEditModalOpen}
    data={selectedData}
    onSuccess={() => refetch()}
   />

   <DeleteFromFillupModal
    open={isDeleteModalOpen}
    onOpenChange={setIsDeleteModalOpen}
    data={selectedData}
    onSuccess={() => refetch()}
   />
  </div>
 );
};

export default FromFillupsManagements;