"use client"

import prospectusBg from '@/assets/prospectus/second-bg.jpg'
import prospectus from '@/assets/prospectus/prospectus.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Prospectus = () => {
 return (
  <div className='relative z-10 rounded shadow-2xl pb-8 md:mt-7 lg:mt-0 flex flex-col items-center justify-center overflow-hidden' style={{ backgroundImage: `url(${prospectusBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
   <h2 className='text-center text-3xl font-bold heading py-7'>Prospectus</h2>
   <div className='lg:max-w-72 md:max-w-96 max-w-48 mx-auto'>
    <Image
     width={700}
     height={700}
     priority
     className='w-full object-cover transition-transform duration-500 hover:scale-105'
     src={prospectus.src}
     alt="Prospectus" />
   </div>

   <Link href="/prospectus" className='mt-7 z-20'>
    <Button
     variant="outline"
     className='border-[#007B5E] text-[#007B5E] hover:bg-[#007B5E] hover:text-white transition-all duration-300 cursor-pointer text-xl font-medium px-10 h-12 rounded-lg'
    >
     DETAILS
    </Button>
   </Link>
  </div>
 )
}

export default Prospectus
