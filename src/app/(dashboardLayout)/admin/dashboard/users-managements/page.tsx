import UsersManagements from '@/components/modules/Dasboard/Admin_Dashboard/Users-managements/UsersManagements'
import { getAllUser } from '@/services/admin-srever-action/users-managements.service'
import { getUserInfo } from '@/services/authService'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

const UsersManagementsPage = async ({
 searchParams,
}: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

 const queryParamsObj = await searchParams;
 const currentUser = await getUserInfo();

 const queryParamsString = Object.keys(queryParamsObj)?.map(key => {
  const value = queryParamsObj[key];
  if (Array.isArray(value)) {
   return value?.map((val) => `${key}=${val}`).join('&');
  }
  return `${key}=${value}`;
 }).join('&');

 const queryClient = new QueryClient()
 await queryClient.prefetchQuery({
  queryKey: ["users", queryParamsString],
  queryFn: () => getAllUser(queryParamsString),
  staleTime: 60 * 1000 * 60, // 1 hour
  gcTime: 60 * 1000 * 50 // 50 minutes
 })
 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <UsersManagements
     queryParamsString={queryParamsString}
     queryParamsObj={queryParamsObj}
     currentUser={currentUser}
    />
   </HydrationBoundary>
  </div>
 )
}

export default UsersManagementsPage