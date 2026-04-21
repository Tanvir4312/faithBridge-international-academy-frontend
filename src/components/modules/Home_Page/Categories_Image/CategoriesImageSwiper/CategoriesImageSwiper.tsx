import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types";

const CategoriesImageSwiper = ({ image }: { image: AllMediaResponse }) => {
 return (
  <div className='w-[410px] h-[300px] overflow-hidden'>
   <img className='h-full w-full transition-all duration-300 ease-in-out hover:scale-125' src={image?.url} alt="" />
  </div>
 );
};

export default CategoriesImageSwiper;