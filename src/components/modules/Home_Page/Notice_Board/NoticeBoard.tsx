"use client"
import { getAllNotice } from '@/services/admin-srever-action/notices-managements'
import { INoticeData } from '@/types/Dashboard/admin-dashboard-types/noteces-managment.types'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from "motion/react"

const NoticeBoard = () => {
 const containerRef = useRef<HTMLDivElement>(null);
 const [scrollHeight, setScrollHeight] = useState(0)
 const { data: noticesResponse, isLoading, isError } = useQuery({
  queryKey: ["notices"],
  queryFn: getAllNotice,
  refetchOnWindowFocus: true,
 })
 const notices = noticesResponse?.data as INoticeData[]


 useEffect(() => {
  if (containerRef.current) {

   const height = (containerRef?.current?.children[0] as HTMLElement)?.offsetHeight || 0;

   const totalNotices = notices?.length + 2;
   const visibleCount = 4;

   const distance = (totalNotices * height) - (visibleCount * height);
   setScrollHeight(distance)
  }
 }, [notices?.length])
 return (
  <div className='pt-5 md:pt-0'>
   <p className='text-3xl font-bold text-[#007B5E] pl-4'>Notice Board</p>
   <div className="h-[340px] relative overflow-hidden my-5" ref={containerRef}>

    {notices?.map((notice) => (
     notice.type === "GENERAL" && (
      <motion.div
       className='m-5'
       key={notice?.id}
       animate={{ y: [0, -scrollHeight, 0] }}
       transition={{
        duration: 20, repeat: Infinity,
        times: [0, 0.9, 1],
        ease: ["linear", "easeIn"]
       }}
      >
       <div className=' h-12 border-b md:px-0 px-2 flex items-center'>
        <p className='mr-3 bg-[#007B5E] px-2 py-2 rounded text-white mb-3'>{new Date(notice?.createdAt).toLocaleDateString()}</p>
        <p>
         <span className='block'>{notice.title}</span>
         <Link href={`/notices/notice/${notice?.id}`}> <span className='pb-2 font-medium text-[#007B5E] cursor-pointer'>View Notice</span></Link>
        </p>
       </div>


      </motion.div>
     )
    ))}
   </div>
  </div>
 )
}

export default NoticeBoard