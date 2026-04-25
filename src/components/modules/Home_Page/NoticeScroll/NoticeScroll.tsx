"use client"

import { getAllNotice } from "@/services/admin-srever-action/notices-managements"
import { INoticeData } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import Marquee from "react-fast-marquee";

const NoticeScroll = () => {
 const { data: noticesResponse } = useQuery({
  queryKey: ["notices"],
  queryFn: getAllNotice,
  refetchOnWindowFocus: true,
 })
 const notices = noticesResponse?.data as INoticeData[]

 return (
  <div className='max-w-7xl mx-auto'>
   <Marquee pauseOnHover={true} className='py-5 heading font-semibold cursor-pointer'>
    {
     notices?.map(notice =>
      notice.type === "GENERAL" && (
       <Link key={notice.id} href={`/notices/notice/${notice.id}`} className='mr-6 hover:text-[#4cfcd3]'>{notice?.title}</Link>
      )

     )
    }
   </Marquee>
  </div>
 )
}

export default NoticeScroll