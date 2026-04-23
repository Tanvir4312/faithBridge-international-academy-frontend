"use client"
import { getAllMedia } from "@/services/admin-srever-action/all-media.service";
import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types";
import { useQuery } from "@tanstack/react-query";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './categoriesImageSwiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CategoriesImageSwiper from "./CategoriesImageSwiper/CategoriesImageSwiper";

const CategoriesImage = () => {
  const { data: MediaResponse, isLoading, isError } = useQuery({
    queryKey: ["all-media"],
    queryFn: getAllMedia,
    refetchOnWindowFocus: true
  })

  const allMedia = MediaResponse?.data || []
  const categoriesImages = allMedia?.filter((media: AllMediaResponse) => media.sectionName === "CATEGORIES")

  return (
    <div className='mt-20'>


      <Swiper

        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}


        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >

        {categoriesImages?.map(image => <SwiperSlide>
          <CategoriesImageSwiper
            key={image?.id}
            image={image}></CategoriesImageSwiper>
        </SwiperSlide>)
        }





      </Swiper>


    </div>
  );
};

export default CategoriesImage;