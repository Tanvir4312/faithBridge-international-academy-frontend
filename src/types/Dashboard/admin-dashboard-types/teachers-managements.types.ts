import { Gender, UserStatus } from "../shared_Enums/enums"

export interface ITeacher {
  id: string
  name: string
  email: string
  profilePhoto: string | null
  contactNumber: string
  address: string
  gender: Gender
  designation: string
  qualification: string
  isDeleted: boolean
  createdat: Date

  updatedAt: string
  userId: string
  user: {
    id: string
    email: string
    role: string
    status: UserStatus
    needPasswordChange: boolean
    emailVerified: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
  }
  teacherSubjects: {
    id: string
    teacherId: string
    subjectId: string
    isPrimary: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    subject: {
      id: string
      name: string
      isDeleted: boolean
      createdAt: string
      updatedAt: string
    }
  }[]
}

export interface IUpdateTeacherPayload {
  name?: string
  email?: string
  contactNumber?: string
  address?: string
  gender?: Gender
  designation?: string
  qualification?: string
  profilePhoto?: File | null
}
