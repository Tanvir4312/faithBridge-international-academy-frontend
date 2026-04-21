"use client"
import Link from 'next/link'
import logo from "@/assets/logo/school-logo-withoutBg.png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'


const Header = () => {
 return (
  <div>
   {/* Header */}
   <div className="bg-[#007B5E] py-6 md:px-10 shadow-md">
    <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

     {/* Logo */}
     <div className="flex justify-center md:justify-start">
      <Image
       src={logo}
       alt="Faithbridge logo"
       className="w-28 md:w-36 lg:w-44"
       priority
      />
     </div>

     {/* Title Section */}
     <div className="text-[#FAF3E0] text-center space-y-1">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
       FaithBridge International Academy
      </h1>
      <h1 className="text-xl md:text-2xl font-medium opacity-90">
       فايث بريدج إنترناشونال أكاديمي
      </h1>

      <div className="text-sm md:text-base mt-2 opacity-90">
       <p>Tongi, Gazipur-1712</p>
       <p>EIIN: 106045 | School Code: 13635</p>
      </div>
     </div>

     {/* Button */}
     <div className="flex justify-center md:justify-end">
      <Link href="/dashboard/create-application">
       <Button className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white font-semibold px-6 py-2 md:px-8 md:py-3 rounded-xl shadow-md hover:shadow-lg text-sm md:text-base cursor-pointer">
        Online Admission
       </Button>
      </Link>
     </div>

    </div>
   </div>



  </div>
 )
}

export default Header