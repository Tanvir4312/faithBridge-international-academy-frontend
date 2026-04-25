import { NavSection } from "@/types/navItems.types"
import { getDefaultDashboardRoute, UserRole } from "./authUtils"


export const commonNavItems = (role: UserRole): NavSection[] => {
    const defaulDashboard = getDefaultDashboardRoute(role)
    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "HomeIcon"
                },
                {
                    title: "Dashboard",
                    href: defaulDashboard,
                    icon: "LayoutDashboardIcon"
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "UserIcon"
                }
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "change password",
                    href: "/change-password",
                    icon: "LockIcon"
                }
            ]

        }
    ]
}

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-managements",
                icon: "UserIcon"
            },
            {
                title: "Teachers",
                href: "/admin/dashboard/teachers-managements",
                icon: "UserIcon"
            },
            {
                title: "Students",
                href: "/admin/dashboard/students-managements",
                icon: "UserIcon"
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-managements",
                icon: "UserIcon"
            }
        ]
    },
    {
        title: "Academic Management",
        items: [
            {
                title: "Applications",
                href: "/admin/dashboard/applications-managements",
                icon: "FileTextIcon"
            },
            {
                title: "Subject Assign",
                href: "/admin/dashboard/assignSubjectsToTeachers",
                icon: "UserCheckIcon"
            },
            {
                title: "Academic Level",
                href: "/admin/dashboard/academicLevel-managements",
                icon: "BookOpenIcon"
            },
            {
                title: "Exams",
                href: "/admin/dashboard/exams-managements",
                icon: "ClipboardList"
            },
            {
                title: "From Fillups",
                href: "/admin/dashboard/fromFillups-managements",
                icon: "FileTextIcon"
            },
            {
                title: "Notice",
                href: "/admin/dashboard/notices-managements",
                icon: "BellIcon"
            },
            {
                title: "Subjects",
                href: "/admin/dashboard/subjects-managements",
                icon: "BookIcon"
            },
            {
                title: "Class",
                href: "/admin/dashboard/class-managements",
                icon: "BookOpen"
            },
            {
                title: "Assign Class Teacher",
                href: "/admin/dashboard/assign-class-teacher",
                icon: "UserCheckIcon"
            },
            {
                title: "All Media",
                href: "/admin/dashboard/all-media",
                icon: "ImageIcon"
            },
            {
                title: "Admission Time Config",
                href: "/admin/dashboard/admission-time-config",
                icon: "ClockIcon"
            }
        ]
    },
    {
        title: "System Settings",
        items: [
            {
                title: "Payment Managements",
                href: "/admin/dashboard/payments-managements",
                icon: "CreditCardIcon"
            }
        ]

    }
]

export const teacherNavItems: NavSection[] = [
    {
        title: "Subjects",
        items: [
            {
                title: "My Subjects",
                href: "/teacher/dashboard/my-subjects",
                icon: "BookIcon"
            },

        ]
    }
]

export const studentNavItems: NavSection[] = [
    {
        title: "Academics",
        items: [

            {
                title: "My Exams & Results",
                href: "/student/dashboard/my-exam-results",
                icon: "FileTextIcon"
            },
            {
                title: "My From Fillup",
                href: "/student/dashboard/my-fromFillup",
                icon: "FileTextIcon"
            },
            {
                title: "My Class Notice",
                href: "/student/dashboard/my-class-notice",
                icon: "BellIcon"
            },

        ]
    },
    {
        title: "Payments",
        items: [
            {
                title: "My Payments",
                href: "/student/my-payments/success",
                icon: "CreditCardIcon"
            }
        ]
    }
]

export const applicantNavItems: NavSection[] = [
    {
        title: "Admissions",
        items: [
            {
                title: "Application",
                href: "/dashboard/create-application",
                icon: "FileTextIcon"
            },
            {
                title: "My Application",
                href: "/dashboard/my-application",
                icon: "FileTextIcon"
            },

        ]
    },
    {
        title: "Payments",
        items: [
            {
                title: "My Payment",
                href: "/applicant-payment/success",
                icon: "CreditCardIcon"
            }
        ]
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonItems = commonNavItems(role)

    switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
            return [...commonItems, ...adminNavItems]

        case "TEACHER":
            return [...commonItems, ...teacherNavItems]

        case "STUDENT":
            return [...commonItems, ...studentNavItems]

        case "APPLICANT":
            return [...commonItems, ...applicantNavItems]


        default:
            return commonItems || [];
    }
}
