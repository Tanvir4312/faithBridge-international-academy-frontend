"use client";

import { getDefaultDashboardRoute, UserRole } from "../../../../lib/authUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import navbar_dropdown from "@/assets/navbar-dropdown/navbar-logo.jpg"
import { LogOut, Search } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/authService";
import { toast } from "sonner";
import SearchModal from "./SearchModal";

const menuItems = [
  { name: "Home", path: "/" },

  {
    name: "About",
    children: [
      { name: "School at a Glance", path: "/about/schoolAtaGlance" },
      { name: "Teacher Information", path: "/about/teacherInformation" },
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
      { name: "Admission Procedure & Fees", path: "/admission/procedure&fees" },
    ],
  },
];

const roleLinks: Record<string, { name: string; path: string }[]> = {
  ADMIN: [
    { name: "User Management", path: "/admin/dashboard/users-managements" },
    { name: "Academic Management", path: "/admin/dashboard/academicLevel-managements" },
  ],
  SUPER_ADMIN: [
    { name: "User Management", path: "/admin/dashboard/users-managements" },
    { name: "Academic Management", path: "/admin/dashboard/academicLevel-managements" },
  ],
  TEACHER: [
    { name: "My Profile", path: "/my-profile" },
    { name: "My Subject", path: "/teacher/dashboard/my-subjects" },
  ],
  STUDENT: [
    { name: "My Payments", path: "/student/my-payments/success" },
    { name: "My Class Notice", path: "/student/dashboard/my-class-notice" },
  ],
  APPLICANT: [
    { name: "Application Form", path: "/dashboard/create-application" },
    { name: "My Application", path: "/dashboard/my-application" },
  ],
};

export default function Navbar({ userRole }: { userRole: UserRole }) {
  const [open, setOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false)
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const defaulDashboard = getDefaultDashboardRoute(userRole);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();

      if (result.success) {
        queryClient.clear();
        toast.success("Logged out successfully");
        // router.push("/login");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to logout");
      }
    } catch {
      toast.error("An error occurred during logout");
    }
  };

  const toggleAccordion = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

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
      <div className="max-w-7xl mx-auto py-3 px-4">
        <div className="flex gap-2 lg:gap-6 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white cursor-pointer whitespace-nowrap">
              FaithBridge
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center text-base font-medium text-white">
            <div className="flex items-center gap-x-3 xl:gap-x-5">
              {menuItems?.map((item, i) => (
                <div key={i} className="relative group whitespace-nowrap">
                  {/* Main Menu */}
                  {item.path ? (
                    <Link href={item.path}>
                      <div className="hover:text-orange-300 cursor-pointer transition-all duration-300 px-2 py-2 rounded-md hover:bg-white/10">
                        {item.name}
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-1 cursor-pointer hover:text-orange-300 transition-all duration-300 px-2 py-2 rounded-md hover:bg-white/10">
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
                            <p className="px-4 py-2 hover:bg-orange-500/20 hover:text-orange-300 rounded-lg cursor-pointer text-white transition-colors duration-200 font-bold">
                              {sub.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Role-Based Links */}
              {userRole && roleLinks[userRole]?.map((link, index) => (
                <Link key={index} href={link.path}>
                  <div className="hover:text-orange-300 cursor-pointer transition-all duration-300 px-2 py-2 rounded-md hover:bg-white/10 whitespace-nowrap">
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Links ... */}

          {/* Right Section: Action Group */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Login / Dashboard */}
            <div className="hidden sm:flex items-center gap-x-4">
              {userRole && (
                <Link
                  href={defaulDashboard}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md font-semibold transition-colors shadow-sm"
                >
                  Dashboard
                </Link>
              )}

              {
                userRole ? (

                  <p
                    onClick={handleLogout}
                    className="hover:text-red-500 font-medium transition-all duration-300 px-3 py-1.5 rounded-md hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </p>


                ) : (
                  <Link href="/login" onClick={() => setOpen(false)} className="block">
                    <p className="hover:text-orange-300 font-medium transition-all duration-300 px-3 py-1.5 rounded-md hover:bg-white/10">Login</p>
                  </Link>
                )
              }
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 bg-white/10 hover:bg-white/20 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg transition-all active:scale-95 flex items-center justify-center border border-white/20 dark:border-slate-700"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>

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

        {/* Inline Search Removed - Now in Modal */}
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
                <div
                  onClick={() => toggleAccordion(item.name)}
                  className="flex justify-between items-center cursor-pointer py-1 group"
                >
                  <p className="font-semibold group-hover:text-amber-300">{item.name}</p>
                  <TiArrowSortedDown className={`transition-transform duration-300 text-lg ${expandedItems.includes(item.name) ? 'rotate-180 text-amber-300' : ''}`} />
                </div>
              )}
              {item?.children && (
                <div className={`ml-3 overflow-hidden transition-all duration-300 ease-in-out border-l border-white/10 pl-3 ${expandedItems.includes(item.name) ? 'max-h-60 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-1 text-sm opacity-90 py-1">
                    {item.children?.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.path}
                        onClick={() => setOpen(false)}
                      >
                        <p className="hover:text-amber-300 cursor-pointer py-1.5 transition-colors">
                          {sub.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Mobile Role-Based Links */}
          {userRole && roleLinks[userRole]?.map((link, index) => (
            <Link key={index} href={link.path} onClick={() => setOpen(false)}>
              <p className="font-semibold hover:text-amber-300 py-3.5">
                {link.name}
              </p>
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 space-y-4">
            {userRole && (
              <Link href={defaulDashboard} onClick={() => setOpen(false)}>
                <p className="bg-orange-500 text-white text-center px-3 py-2 rounded mt-3 font-bold shadow-md">
                  Dashboard
                </p>
              </Link>
            )}
            {
              userRole ? (

                <p
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-center px-3 py-2 rounded mt-3 font-bold shadow-md cursor-pointer flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </p>


              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="block">
                  <p className="hover:text-amber-300">Login</p>
                </Link>
              )
            }

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

      {/* Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}