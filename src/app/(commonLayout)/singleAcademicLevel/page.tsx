import ShowAcademicLevel from '@/components/modules/Home_Page/Academic_Level/ShowAcademicLevel';
import { getAllAcademicLevel } from '@/services/admin-srever-action/academicLevel.service';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';


const singleAcademicLevelPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["academic-levels"],
        queryFn: getAllAcademicLevel,

    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <ShowAcademicLevel />
            </div>
        </HydrationBoundary>
    );
};

export default singleAcademicLevelPage;