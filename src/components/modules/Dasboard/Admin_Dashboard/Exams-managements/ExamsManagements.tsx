"use client"
import DataTable from '@/components/shared/table/DataTable';
import { getAllExam } from '@/services/admin-srever-action/exams-managements.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { examColumns } from './examsColumn';
import { IExamsData } from '@/types/Dashboard/admin-dashboard-types/exams-managements';


const ExamsManagements = () => {
 const { data: examsResponse } = useQuery({
  queryKey: ["exams"],
  queryFn: getAllExam,
  refetchOnWindowFocus: true,

 })
 console.log("examsResponse", examsResponse)
 const { data: exams = [] } = examsResponse || {}
 console.log("exams", exams)

 const handleView = (id: IExamsData) => {
  console.log("View exam:", id);
 }


 return (
  <div>
   <DataTable
    data={exams}
    columns={examColumns}
    actions={
     {
      onView: handleView,

     }
    }
   />
  </div>
 );
};

export default ExamsManagements;