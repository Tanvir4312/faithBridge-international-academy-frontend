"use client"
import DataTable from '@/components/shared/table/DataTable';
import { getAllExam } from '@/services/admin-srever-action/exams-managements.service';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { examColumns } from './examsColumn';
import { IExamsData } from '@/types/Dashboard/admin-dashboard-types/exams-managements';
import CreateExamsModal from './CreateExamsModal';
import ViewExamsModal from './ViewExamsModal';
import UpdateExamsModal from './UpdateExamsModal';
import DeleteExamModal from './DeleteExamModal';


const ExamsManagements = () => {
 const [selectedExam, setSelectedExam] = useState<IExamsData | null>(null);
 const [isViewModalOpen, setIsViewModalOpen] = useState(false);
 const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

 const { data: examsResponse, refetch } = useQuery({
  queryKey: ["exams"],
  queryFn: getAllExam,
  refetchOnWindowFocus: true,

 })

 const { data: exams = [] } = examsResponse || {}

 const handleView = (exam: IExamsData) => {
  setSelectedExam(exam);
  setIsViewModalOpen(true);
 }
 const handleEdit = (exam: IExamsData) => {
    setSelectedExam(exam);
    setIsUpdateModalOpen(true);
 }
 const handleDelete = (exam: IExamsData) => {
    setSelectedExam(exam);
    setIsDeleteModalOpen(true);
 }


 return (
  <div className="space-y-4 p-4">
   <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-primary">Exams Management</h2>
    <CreateExamsModal onSuccess={() => refetch()} />
   </div>
   <DataTable
    data={exams}
    columns={examColumns}
    actions={
     {
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete,
     }
    }
   />

   <ViewExamsModal
    open={isViewModalOpen}
    onOpenChange={setIsViewModalOpen}
    exam={selectedExam}
   />

   <UpdateExamsModal 
    isOpen={isUpdateModalOpen}
    onOpenChange={setIsUpdateModalOpen}
    exam={selectedExam}
   />

   <DeleteExamModal 
    isOpen={isDeleteModalOpen}
    onOpenChange={setIsDeleteModalOpen}
    exam={selectedExam}
   />
  </div>
 );
};

export default ExamsManagements;