


import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAllExam } from '@/services/admin-srever-action/exams-managements.service'
import { getUserInfo } from '../../../../../services/authService'
import StudentFromFillup from '@/components/modules/Dasboard/Student_Dashboard/student-fromFillup/studentFromFillup'


const StudentFormFillupPage = async () => {

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['exams'],
    queryFn: getAllExam,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })

  const userInfo: any = await getUserInfo()
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StudentFromFillup
          userInfo={userInfo}
        />
      </HydrationBoundary>
    </div>
  )
}

export default StudentFormFillupPage
