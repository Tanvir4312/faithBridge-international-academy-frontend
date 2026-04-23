"use client"

import { useRef } from "react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './imageSwiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import { getAllMedia } from '@/services/admin-srever-action/all-media.service';
import Image from "next/image";

const ImageSwiper = () => {

  const { data: imagesResponse } = useQuery({
    queryKey: ["all-media"],
    queryFn: getAllMedia,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5,

  })
  const images = imagesResponse?.data || []
  const homeBannerImages = images?.filter((image) => image.sectionName === "HOME_BANNER")

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);



  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (!progressCircle.current || !progressContent.current) return;
    progressCircle.current.style.setProperty('--progress', String(1 - progress));
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };


  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper rounded h-[250px] md:h-[300px] lg:h-[400px]"
      >
        {homeBannerImages?.length > 0 ? (
          homeBannerImages.map((image) => (
            <SwiperSlide key={image?.id} className="h-full w-full">
              <Image
                priority={true}
                width={1200}
                height={600}
                className="rounded-lg h-full w-full object-cover"
                src={image?.url}
                alt="banner"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="h-full w-full">
            <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">No Image Available</p>
            </div>
          </SwiperSlide>
        )}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSwiper;