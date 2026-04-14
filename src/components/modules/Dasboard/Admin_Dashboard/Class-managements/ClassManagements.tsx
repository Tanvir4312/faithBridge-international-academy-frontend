"use client"

import DataTable from "@/components/shared/table/DataTable";
import { getAllClass } from "@/services/admin-srever-action/class-managements.service";
import { useQuery } from "@tanstack/react-query";
import { classessColumns } from "./classessColumns";
import { IClass } from "@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types";

const ClassManagements = () => {
 const { data: classDataResponse, isLoading } = useQuery({
  queryKey: ["classes"],
  queryFn: getAllClass
 })
 const { data: classes = [] } = classDataResponse || {}
 const handleView = (id: IClass) => {
  console.log(id)
 }



 return (
  <div>
   <DataTable data={classes}
    columns={classessColumns}
    emptyMessage="No classes found"
    isLoading={isLoading}
    actions={
     {
      onView: handleView
     }
    }
   />
  </div>
 );
};

export default ClassManagements;