
export interface IFromFillupData {
 id: string;
 registrationNo: string;
 classRoll: string;
 status: string;
 paymentStatus: string;
 createdAt: string;
 updatedAt: string;
 exam: {
  name: string
  year: string
 }
 class: {
  name: string
 }
 student: {
  nameEn: string
  profileImage?: string
 }
}