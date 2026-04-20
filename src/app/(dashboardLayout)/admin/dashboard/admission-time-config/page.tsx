import AdmissionTimeConfig from '@/components/modules/Dasboard/Admin_Dashboard/Admission_Time_Config/AdmissionTimeConfig'
import { getAdmissionTimeConfig } from '@/services/admin-srever-action/admission-time-config.service'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

const AdmissionTimeConfigPage = async () => {
 const queryClient = new QueryClient()
 await queryClient.prefetchQuery({
  queryKey: ["admission-config"],
  queryFn: getAdmissionTimeConfig,

 })
 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <AdmissionTimeConfig />
   </HydrationBoundary>
  </div>
 )
}

export default AdmissionTimeConfigPage