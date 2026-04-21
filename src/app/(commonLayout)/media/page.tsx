import ActivitiesImage from '@/components/modules/Home_Page/Activities_Image/ActivitiesImage';
import CategoriesImage from '@/components/modules/Home_Page/Categories_Image/CategoriesImage';
import { getAllMedia } from '@/services/admin-srever-action/all-media.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const MediaPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.fetchQuery({
        queryKey: ["all-media"],
        queryFn: getAllMedia,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        gcTime: 1000 * 60 * 60 * 23, // 23 hours
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ActivitiesImage />
                <CategoriesImage />
            </HydrationBoundary>
        </div>
    );
};

export default MediaPage;