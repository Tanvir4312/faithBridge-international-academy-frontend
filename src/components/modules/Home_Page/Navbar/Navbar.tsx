"use client";

import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import navbar_dropdown from "@/assets/navbar-dropdown/navbar-logo.jpg"
const menuItems = [
  { name: "Home", path: "/" },

  {
    name: "About",
    children: [
      { name: "School at a Glance", path: "/about/school" },
      { name: "Principal's Message", path: "/about/principal" },
      { name: "Faculty Information", path: "/about/faculty" },
    ],
  },

  {
    name: "Academics",
    children: [
      { name: "Our Curriculum", path: "/academics/curriculum" },
      { name: "Results", path: "/academics/results" },
    ],
  },

  {
    name: "Admission",
    children: [
      { name: "Admission Notice", path: "/admission/notice" },
      { name: "Procedure", path: "/admission/procedure" },
      { name: "Fees", path: "/admission/fees" },
    ],
  },
];

export default function Navbar({ userRole }: { userRole: UserRole }) {
  const [open, setOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false)
  const [isMobile, setIsMobile] = useState(false);
  const defaulDashboard = getDefaultDashboardRoute(userRole);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 123) {
        setIsFixed(true)
      }
      else {
        setIsFixed(false)
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    }

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);
  return (
    <div className={`bg-[#1fbfa0] w-full z-50  ${isFixed ? 'transition-all duration-100 fixed top-0 opacity-90 font-bold' : 'relative'}`}>
      <div className="max-w-7xl mx-auto flex gap-10 items-center py-3">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold text-white cursor-pointer pl-4 md:pl-0">
            FaithBridge
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-lg font-semibold text-white">

          {menuItems.map((item, i) => (
            <div key={i} className="relative group">

              {/* Main Menu */}
              {item.path ? (
                <Link href={item.path}>
                  <div className="hover:text-[#FAF3E0] cursor-pointer">
                    {item.name}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#FAF3E0]">
                  {item.name}
                  <TiArrowSortedDown />
                </div>
              )}

              {/* Dropdown */}
              {item.children && (
                <div
                  style={{
                    backgroundImage: `url(${navbar_dropdown?.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`absolute top-10 left-0  rounded-xl shadow-lg p-3 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
                  {item.children.map((sub, idx) => (
                    <Link key={idx} href={sub.path}>
                      <p className="py-1 hover:text-amber-300 cursor-pointer">
                        {sub.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Login */}
          <Link href="/login" className="hover:text-[#FAF3E0]">
            Login
          </Link>

          {/* Dashboard */}
          {userRole && (
            <Link
              href={defaulDashboard}
              className="bg-amber-400 text-black px-4 py-1 rounded-lg font-semibold"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden ml-28">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#007B5E] overflow-y-auto shadow-lg transform transition-transform duration-300 z-50 ${open && isMobile ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white">
          <h2 className="text-white font-bold">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-white text-xl">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 text-white">

          {menuItems?.map((item, i) => (
            <div key={i}>

              {/* Main */}
              {item?.path && (
                <Link href={item.path} onClick={() => setOpen(false)}>
                  <p className="font-semibold hover:text-amber-300">
                    {item.name}
                  </p>
                </Link>
              )}

              {!item.path && (
                <p className="font-semibold">{item.name}</p>
              )}

              {/* Children */}
              {item.children && (
                <div className="ml-3 mt-2 space-y-1 text-sm opacity-90">
                  {item.children.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={sub.path}
                      onClick={() => setOpen(false)}
                    >
                      <p className="hover:text-amber-300 cursor-pointer">
                        {sub.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Login */}
          <Link href="/login" onClick={() => setOpen(false)}>
            <p className="pt-3 hover:text-amber-300">Login</p>
          </Link>

          {/* Dashboard */}
          {userRole && (
            <Link href={defaulDashboard} onClick={() => setOpen(false)}>
              <p className="bg-amber-400 text-black px-3 py-2 rounded mt-3">
                Dashboard
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {open && isMobile && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}
    </div>
  );
}