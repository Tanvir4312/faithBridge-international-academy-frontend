"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllNotice } from "@/services/admin-srever-action/notices-managements"
import { IGetSingleNoticeData } from "@/types/Dashboard/Common-types/getNotice.types"
import { useQuery } from "@tanstack/react-query"
import { myClassNoticesColumns } from "./myClassNoticesColumns"
import { useState } from "react"
import ViewClassNoticeModal from "./ViewClassNoticeModal"

const MyClassNotices = ({ studentClass }: { studentClass: string }) => {
 const [viewModalOpen, setViewModalOpen] = useState(false)
 const [selectedNotice, setSelectedNotice] = useState<IGetSingleNoticeData | null>(null)
 const { data: noticesResponse, isLoading } = useQuery({
  queryKey: ["notices"],
  queryFn: () => getAllNotice(),
  refetchOnWindowFocus: true
 })
 const noticesArr = noticesResponse?.data || []
 const myClassNotices = noticesArr.filter((notice) => notice.type === "CLASS_SPECIFIC" && notice.noticeClasses.some((noticeClass) => noticeClass.class.name === studentClass))
 console.log(myClassNotices)
 const handleView = (notice: IGetSingleNoticeData) => {
  setSelectedNotice(notice)
  setViewModalOpen(true)
 }
 return (
  <div>
   <h1 className="text-center text-3xl font-bold py-2 mb-8">My Class Notices</h1>

   <DataTable
    data={myClassNotices}
    columns={myClassNoticesColumns}
    actions={
     {
      onView: handleView
     }
    }
   />
   
   <ViewClassNoticeModal
     open={viewModalOpen}
     onOpenChange={setViewModalOpen}
     notice={selectedNotice}
     studentClass={studentClass}
   />
  </div>
 )
}

export default MyClassNotices