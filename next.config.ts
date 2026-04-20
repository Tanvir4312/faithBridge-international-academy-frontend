// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//     ],
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // সার্ভার অ্যাকশনের লিমিট বাড়ানোর জন্য এই অংশটুকু যোগ করুন
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // ১ এমবির বদলে ৫ এমবি বা আপনার প্রয়োজনমতো দিন
    },
  },
};

export default nextConfig;
