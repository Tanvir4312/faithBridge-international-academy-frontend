
import { getUserInfo } from "@/services/authService";

import Header from "@/components/modules/Home_Page/Header/Header";
import Navbar from "@/components/modules/Home_Page/Navbar/Navbar";
import { UserRole } from "@/lib/authUtils";
import NoticeScroll from "@/components/modules/Home_Page/NoticeScroll/NoticeScroll";
import background_image from "@/assets/background-image/background-design.jpeg"
import ImageSwiper from "@/components/modules/Home_Page/ImageSwiper/ImageSwiper";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllMedia } from "@/services/admin-srever-action/all-media.service";
import NoticeBoard from "@/components/modules/Home_Page/Notice_Board/NoticeBoard";
import WelcomeMessage from "@/components/modules/Home_Page/Welcome_Message/WelcomeMessage";
import Prospectus from "@/components/modules/Home_Page/Prospectus/Prospectus";
import ShowAcademicLevel from "@/components/modules/Home_Page/Academic_Level/ShowAcademicLevel";
import ActivitiesImage from "@/components/modules/Home_Page/Activities_Image/ActivitiesImage";
import CategoriesImage from "@/components/modules/Home_Page/Categories_Image/CategoriesImage";
import Information from "@/components/modules/Home_Page/Information/Information";
import Footer from "@/components/modules/Home_Page/Footer/Footer";


const CommonHomePage = async () => {
  const userInfo = await getUserInfo();
  let userRole = userInfo?.role
  const unifySuperAdminAndAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole
  userRole = unifySuperAdminAndAdminRole as UserRole

  // fetch Image
  const queryClient = new QueryClient()

  await queryClient.fetchQuery({
    queryKey: ["all-media"],
    queryFn: getAllMedia,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 23, // 23 hours
  })


  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Navbar userRole={userRole} />
      </div>
      <div>
        <NoticeScroll />
      </div>
      <div className="relative">
        <div
          style={{
            backgroundImage: `url(${background_image.src})`,
            opacity: 0.3,
          }}
          className="absolute inset-0 z-0"
        >
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Content */}
          <div className='relative z-10  pt-14'>
            {/* Image and nitice */}
            <div className="md:flex gap-4 pb-14">
              <div className="md:w-2/4 w-full">
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <ImageSwiper />
                </HydrationBoundary>
              </div>
              <div className="md:w-2/4 w-full">
                <NoticeBoard />
              </div>
            </div>
          </div>

          {/* Welcome message and prospector */}
          <div className='lg:flex gap-6 pt-5 pb-5'>
            {/* Welcome message */}
            <div className='lg:w-4/6 px-5 lg:px-0'>
              <WelcomeMessage />
            </div>
            {/* prospector */}
            <div className='lg:w-2/6 px-5 py-5 lg:px-0 lg:py-0'>
              <Prospectus />
            </div>
          </div>

          {/* Courses */}
          <ShowAcademicLevel />

          {/* Activities Image */}

          <ActivitiesImage />

          <CategoriesImage />

          <Information />

        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonHomePage;
