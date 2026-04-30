"use client"
import infoBg from "@/assets/informationBg/information-bg.jpeg"
import { HiOutlineMailOpen } from "react-icons/hi";
import { PiAddressBookLight } from 'react-icons/pi';
import { BsTelephone } from 'react-icons/bs';

const Information = () => {
  return (
    <div className='relative mt-10 top-16 z-10 mx-5 lg:mx-0'>
      {/* Background Image with Dark Mode Overlay/Brightness */}
      <div
        style={{ backgroundImage: `url(${infoBg.src})` }}
        className='absolute inset-0 z-0 rounded transition-all duration-500 dark:brightness-[0.2] dark:bg-black/60'
      ></div>

      <div className='relative z-10 max-w-6xl mx-auto px-5 py-12 md:grid grid-cols-12 gap-10'>

        {/* ---------------------Contact Info Section------------------------ */}
        <div className='md:col-span-6 lg:col-span-5'>
          <h1 className='heading text-3xl font-bold text-[#005842] dark:text-[#22c55e] pb-2 transition-colors duration-300'>Contact Info</h1>
          <hr className="border-[#005842]/20 dark:border-[#22c55e]/20" />

          {/* EMAIL */}
          <div className='flex gap-4 mt-6 group transition-all'>
            <div className=''>
              <HiOutlineMailOpen className='text-[#005842] dark:text-[#22c55e] text-3xl transition-colors duration-300' />
            </div>
            <div className=''>
              <p className='font-bold text-gray-900 dark:text-white tracking-wide text-sm'>E-MAIL</p>
              <p className='font-medium text-gray-700 dark:text-gray-100 transition-colors duration-300'>FaithBridgeAcademy24@gmail.com</p>
            </div>
          </div>

          {/* Address */}
          <div className='flex gap-4 mt-6 group transition-all'>
            <div className=''>
              <PiAddressBookLight className='text-[#005842] dark:text-[#22c55e] text-3xl transition-colors duration-300' />
            </div>
            <div>
              <p className='font-bold text-gray-900 dark:text-white tracking-wide text-sm'>Address</p>
              <p className='font-medium text-gray-700 dark:text-gray-100 transition-colors duration-300'>
                Gazipura, Earshad Nagar, Tongi<br />
                Gazipur-1712, Bangladesh
              </p>
            </div>
          </div>

          {/* Contact (Office) */}
          <h1 id='contact' className='heading text-3xl font-bold text-[#005842] dark:text-[#22c55e] pb-2 mt-10 transition-colors duration-300'>Contact (Office)</h1>
          <div className="border-b-2 border-[#005842] dark:border-[#22c55e] transition-colors duration-300 mb-6"></div>

          <div className='flex flex-wrap gap-8'>
            <div className='flex items-center gap-3'>
              <BsTelephone className='text-[#005842] dark:text-[#22c55e] text-2xl transition-colors duration-300' />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">01710564312</span>
            </div>
            <div className='flex items-center gap-3'>
              <BsTelephone className='text-[#005842] dark:text-[#22c55e] text-2xl transition-colors duration-300' />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">01710564312</span>
            </div>
            <div className='flex items-center gap-3'>
              <BsTelephone className='text-[#005842] dark:text-[#22c55e] text-2xl transition-colors duration-300' />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">01710564312</span>
            </div>
          </div>
        </div>

        {/* ---------------------Important Links Section------------------------ */}
        <div className='md:col-span-6 lg:col-span-3'>
          <h1 className='heading text-3xl font-bold text-[#005842] dark:text-[#22c55e] pb-2 transition-colors duration-300'>Important Links</h1>
          <hr className='mb-8 border-[#005842]/20 dark:border-[#22c55e]/20' />

          <div className="space-y-5">
            {[
              { name: "Dhaka Education Board", url: "https://dhakaeducationboard.gov.bd/site" },
              { name: "শিক্ষক বাতায়ন", url: "https://teachers.gov.bd" },
              { name: "Ministry of Education", url: "https://moedu.portal.gov.bd" },
              { name: "প্রাথমিক শিক্ষা অধিদপ্তর", url: "https://www.dpe.gov.bd" }
            ].map((link, idx) => (
              <a
                key={idx}
                className='bg-gray-100 dark:bg-[#4b5563] w-full block text-center py-3 border border-gray-700 dark:border-gray-500 rounded-lg font-bold text-gray-800 dark:text-white hover:text-white hover:bg-[#005842] dark:hover:bg-[#374151] transition-all duration-300 shadow-sm'
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* ---------------------Social Media Section------------------------ */}
        <div className='md:col-span-12 lg:col-span-4 mt-7 lg:mt-0'>
          <h1 className='heading text-3xl font-bold text-[#005842] dark:text-[#22c55e] pb-2 transition-colors duration-300'>Our Social Media</h1>
          <hr className="border-[#005842]/20 dark:border-[#22c55e]/20" />

          <div className='mt-8 flex items-center gap-6'>
            <a href="https://www.facebook.com" target='blank' className="transition-transform hover:scale-110">
              <img className='w-14' src="https://img.icons8.com/?size=160&id=118568&format=png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target='blank' className="transition-transform hover:scale-110">
              <img className='w-14' src="https://img.icons8.com/?size=160&id=oaaSr6h7kwm6&format=png" alt="Twitter" />
            </a>
            <a href="https://youtube.com" target='blank' className="transition-transform hover:scale-110">
              <img className='w-14' src="https://img.icons8.com/?size=96&id=19318&format=png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;