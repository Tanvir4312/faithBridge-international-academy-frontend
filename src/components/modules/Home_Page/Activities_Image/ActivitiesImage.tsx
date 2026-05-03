"use client"

import { getAllMedia } from "@/services/admin-srever-action/all-media.service";
import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types";
import { useQuery } from "@tanstack/react-query";

const ActivitiesImage = () => {

 const { data: MediaResponse, isLoading, isError } = useQuery({
  queryKey: ["all-media"],
  queryFn: getAllMedia,
  refetchOnWindowFocus: true
 })
 const allMedia = MediaResponse?.data || []
 const activities = allMedia?.filter((media: AllMediaResponse) => media.sectionName === "ACTIVITIES")


 return (
  <div>
   <h1 className='text-5xl heading font-bold text-center text-[#007B5E] dark:text-orange-400 transition-colors duration-300 mb-5'>Others Activities</h1>

   <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3 text-center mx-2 lg:mx-0 lg:px-0'>
    {
     activities?.map(activity =>
      <div
       key={activity?.id}
       className='border-2 border-slate-100 dark:border-slate-800 dark:bg-slate-800/50 rounded-xl p-5 hover:cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-2.5 h-[200px] z-10 shadow-sm'>
       <div style={{
        backgroundImage: `url(${activity?.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
       }} className='w-full rounded h-full bg-blend-overlay bg-black/30'>
        <h1 className='text-2xl text-white font-medium text-center p-10'>{activity?.description}</h1>
       </div>
      </div>
     )
    }




   </div>
  </div>
 );
};

export default ActivitiesImage;