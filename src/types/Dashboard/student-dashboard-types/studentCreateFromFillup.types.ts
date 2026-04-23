export interface ICreateFromFillupPayload {
 studentId: string;
 classId: string;
 examId: string;
 registrationNo: string;
 classRoll: string;

}
export interface ICreateFromFillupResponse {
 studentId: string;
 classId: string;
 examId: string;
 registrationNo: string;
 classRoll: string;
 paymentUrl?: string;
}