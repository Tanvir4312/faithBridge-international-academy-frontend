import React from 'react'
import footerBg from '@/assets/footer/footer-bg.jpeg'

const Footer = () => {
 return (
  <div className=''>
   <div style={{ backgroundImage: `url(${footerBg.src})` }} className=''>
    <div className='pt-40 pb-8 max-w-6xl mx-auto text-white text-center body'>
     <div>
      © {new Date().getFullYear()} FaithBridge International Academy. All rights reserved.
      <p className='pt-2'>Developed by TF Universal Pvt. Limited</p>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Footer