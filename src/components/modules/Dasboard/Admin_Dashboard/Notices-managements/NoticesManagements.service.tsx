"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllNotice } from "@/services/admin-srever-action/notices-managements"
import { useQuery } from "@tanstack/react-query"
import { noticesColumns } from "./noticesColumns"
import { INoticeData } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types"

const NoticesManagements = () => {
 const { data: noticeResponse, isLoading } = useQuery({
  queryKey: ["notices"],
  queryFn: getAllNotice
 })

 const { data: notices = [] } = noticeResponse || {}
 const handleView = (id: INoticeData) => {
  console.log("id", id)
 }
 const handleDelete = (id: INoticeData) => {
  console.log("id", id)
 }
 return (
  <div>
   <DataTable
    data={notices}
    columns={noticesColumns}
    isLoading={isLoading}
    actions={
     {
      onView: handleView,
      onDelete: handleDelete
     }
    }
   />
  </div>
 )

}

export default NoticesManagements 