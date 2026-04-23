# FaithBridge International Academy - Enterprise School Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.1-f9f1e1?style=for-the-badge&logo=bun)](https://bun.sh/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A premium, comprehensive, and highly scalable School Management System (SMS) designed for modern educational excellence. FaithBridge provides a unified digital ecosystem where administration, faculty, and students converge for a seamless academic experience.

**🌐 [Live Demo](https://school-management-frontend-phi-lake.vercel.app)**

## 🌟 Key Pillars of the Platform

### 🔐 Multi-Role Ecosystem
Tailored experiences for four distinct user personas:
- **Administrators**: Complete institutional control and configuration.
- **Teachers**: Academic management, subject assignments, and student monitoring.
- **Students**: Result tracking, payment management, and academic updates.
- **Applicants**: Seamless digital admission and payment workflow.

### 🏛️ Advanced Academic Architecture
- **Dynamic Curriculum**: Manage Academic Levels, Classes, and Subjects with relational mapping.
- **Faculty Orchestration**: Intelligent assignment of subjects to teachers and class teacher designations.
- **Exam Lifecycle**: End-to-end management from form fill-ups to result publication.
- **Admission Configurator**: Precision control over admission timelines and status tracking.

### 💳 Financial & Operational Integrity
- **Integrated Payments**: Secure Stripe-powered transactions for fees and applications.
- **Media Vault**: A centralized asset management system for institutional documentation and imagery.
- **Notice Board**: Enterprise-wide announcement system with real-time visibility.

### 🎨 State-of-the-Art UX/UI
- **Motion-Driven**: Fluid micro-animations powered by `motion` (Framer Motion).
- **Responsive Mastery**: Perfectly optimized for desktop, tablet, and mobile views.
- **Modern Componentry**: Built on a customized `shadcn/ui` foundation for a premium aesthetic.

## 🛠️ Technical Architecture

### Core Stack
| Technology | Role |
| :--- | :--- |
| **Next.js 16 (App Router)** | Full-stack React framework for optimal performance and SEO. |
| **Bun** | High-performance JS runtime and package manager. |
| **TanStack Query v5** | Efficient server-state management and caching. |
| **Better Auth** | Modern, secure authentication with multi-session support. |
| **Zod & React Hook Form** | Type-safe schema validation and performant form handling. |
| **Tailwind CSS 4** | Next-generation utility-first styling. |

### Project Structure Highlights
- `/src/app`: Highly organized App Router with route groups for different layouts.
- `/src/components/modules`: Feature-scoped components (e.g., Dashboard, Auth).
- `/src/services`: Decoupled server action layer for API interactions.
- `/src/zod`: Centralized validation schemas for cross-environment consistency.

## 🛡️ Secure Lifecycle & Notifications

### 📧 Automated Communications
The platform ensures all stakeholders are kept in the loop with automated email notifications triggered by critical lifecycle events:
- **Application Submission**: Confirmation sent to applicants upon successful form submission.
- **Entity Creation**: Automated onboarding emails sent to newly created **Students**, **Teachers**, and **Admins** with their credentials and next steps.

### 🔐 Advanced Authentication Flow
- **OTP Verification**: If a user's email is unverified, the system enforces a mandatory OTP (One-Time Password) verification flow to ensure 100% account authenticity.
- **Password Management**: Comprehensive security features including "Change Password" for logged-in users and "Reset Password" via email for forgotten credentials.

## ⚙️ Intelligent Middleware (Proxy)

The platform leverages a robust `proxy.ts` middleware to handle complex authentication and routing logic:
- **Proactive Token Refresh**: Automatically detects expiring access tokens and refreshes them using the refresh token, ensuring zero session interruptions.
- **Mandatory Flow Enforcement**: Intelligently redirects users to `/verify-email` or `/change-password` if their account status requires action before proceeding to the dashboard.
- **Granular RBAC**: Validates user roles (Admin, Teacher, Student, Applicant) against route owners to prevent unauthorized access.
- **Auth State Awareness**: Prevents logged-in users from accessing auth pages (like `/login`) while allowing them to reach critical state-management routes.

## 🚀 Getting Started

### 📦 Prerequisites
- **Bun** (v1.1 or higher)
- A running instance of the **FaithBridge Backend API**

### 🔧 Installation & Setup

1. **Clone & Enter**
   ```bash
   git clone https://github.com/Tanvir4312/faithBridge-international-academy-frontend.git
   cd faithBridge-international-academy-frontend
   ```

2. **Dependency Installation**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following keys:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_BACKEND_API=http://localhost:5000
   JWT_ACCESS_SECRET=your_jwt_access_secret
   # Additional keys for Better Auth, Stripe, etc.
   ```

4. **Development Mode**
   ```bash
   bun dev
   ```
   🚀 Access the portal at `http://localhost:3000`.

## 🏗️ Production Deployment
Build the optimized production bundle:
```bash
bun run build
bun run start
```

---
© 2026 FaithBridge International Academy. Empowering the future of education.
