import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'
import Link from 'next/link'


const AcademicLevelSlide = ({ course }: { course: IAcademicLevel }) => {
  const { name, description, image, id } = course
  return (
    <Link href={`/singleAcademicLevel/${id}`}>
      <div className='group hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 h-[320px] lg:w-[400px] md:w-[350px] w-[300px] overflow-hidden rounded-xl shadow-lg'>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className='relative h-full bg-blend-overlay bg-black/40 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:bg-black/60'>

          {/* Text Content */}
          <div className='px-6 text-white space-y-3'>
            <h1 className='text-2xl md:text-3xl font-black tracking-tight uppercase italic drop-shadow-md'>
              {name}
            </h1>
            <p className='text-sm font-medium leading-relaxed opacity-90 line-clamp-2 max-w-[250px] mx-auto'>
              {description?.slice(0, 100)}...
            </p>
          </div>

          {/* Enhanced Button */}
          <button className='mt-8 px-8 py-2.5 border-2 border-white text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 
        group-hover:bg-[#007B5E] group-hover:border-[#007B5E] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(0,123,94,0.4)]'>
            View Details
          </button>

        </div>
      </div>
    </Link>
  )
}

export default AcademicLevelSlide