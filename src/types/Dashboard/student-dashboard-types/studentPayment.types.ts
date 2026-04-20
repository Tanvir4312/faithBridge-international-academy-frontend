export interface IStudentPaymentInfo {
 paymentFor: string;
 amount: number;
 status: string;
 transactionId: string;
 createdAt: string;
 student: {
  calss: {
   name: string;
  }
  classRoll: string
  nameEn: string
  registrationId: string
 }

}