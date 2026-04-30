"use client";

import { getDefaultDashboardRoute, UserRole } from "../../../../lib/authUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import navbar_dropdown from "@/assets/navbar-dropdown/navbar-logo.jpg"
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

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
  const [searchQuery, setSearchQuery] = useState("");
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
      setIsMobile(window.innerWidth < 1024); // Changed to 1024 to match lg breakpoint
    }

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <div className={`w-full z-50 transition-all duration-300 ${isFixed ? 'fixed top-0 shadow-lg' : 'relative'} bg-[#1fbfa0] dark:bg-slate-900 text-white`}>
      <div className="max-w-7xl mx-auto flex gap-4 lg:gap-10 items-center py-3 px-4">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-xl font-bold text-white cursor-pointer">
            FaithBridge
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-x-8 text-base font-medium text-white flex-1">
          <div className="flex items-center gap-x-6">
            {menuItems?.map((item, i) => (
              <div key={i} className="relative group">
                {/* Main Menu */}
                {item.path ? (
                  <Link href={item.path}>
                    <div className="hover:text-orange-300 cursor-pointer transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/10">
                      {item.name}
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 cursor-pointer hover:text-orange-300 transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/10">
                    {item.name}
                    <TiArrowSortedDown className="transition-transform group-hover:rotate-180" />
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
                    className="absolute top-full left-0 mt-1 rounded-xl shadow-2xl p-3 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-white/20 backdrop-blur-md"
                  >
                    <div className="relative z-10 space-y-1">
                      {item.children?.map((sub, idx) => (
                        <Link key={idx} href={sub.path}>
                          <p className="px-4 py-2 hover:bg-orange-500/20 hover:text-orange-300 rounded-lg cursor-pointer text-white transition-colors duration-200 font-medium">
                            {sub.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feature 1: Search Bar Integration */}
          <div className="relative flex-1 max-w-[280px] group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-white/80 dark:text-slate-400 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search notices, results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border border-white/40 bg-white/10 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/70 focus:bg-white/20 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50 transition-all duration-300 dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:border-orange-500"
            />
          </div>
        </div>

        {/* Right Section: Action Group */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Login / Dashboard */}
          <div className="hidden sm:flex items-center gap-x-4">
            <Link href="/login" className="hover:text-orange-300 font-medium transition-all duration-300 px-3 py-1.5 rounded-md hover:bg-white/10">
              Login
            </Link>
            {userRole && (
              <Link
                href={defaulDashboard}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md font-semibold transition-colors shadow-sm"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Feature 2: Dark Mode Implementation */}
          <ThemeToggle />

          {/* Mobile Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="text-white text-2xl p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Existing Structure Maintained) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#007B5E] dark:bg-slate-900 overflow-y-auto shadow-lg transform transition-transform duration-300 z-[60] ${open && isMobile ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="text-white font-bold">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-white text-xl p-2">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 text-white">
          {menuItems?.map((item, i) => (
            <div key={i}>
              {item?.path && (
                <Link href={item.path} onClick={() => setOpen(false)}>
                  <p className="font-semibold hover:text-amber-300 py-1">
                    {item.name}
                  </p>
                </Link>
              )}
              {!item.path && (
                <p className="font-semibold py-1">{item.name}</p>
              )}
              {item?.children && (
                <div className="ml-3 mt-2 space-y-1 text-sm opacity-90 border-l border-white/10 pl-3">
                  {item.children?.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={sub.path}
                      onClick={() => setOpen(false)}
                    >
                      <p className="hover:text-amber-300 cursor-pointer py-1">
                        {sub.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-white/10 space-y-4">
            <Link href="/login" onClick={() => setOpen(false)} className="block">
              <p className="hover:text-amber-300">Login</p>
            </Link>
            {userRole && (
              <Link href={defaulDashboard} onClick={() => setOpen(false)}>
                <p className="bg-orange-500 text-white text-center px-3 py-2 rounded mt-3 font-bold shadow-md">
                  Dashboard
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && isMobile && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        ></div>
      )}
    </div>
  );
}