import { PaymentStatus } from "../shared_Enums/enums";




export interface IPayment {
    id: string;
    amount: number;
    createdAt: string;
    status: PaymentStatus;
    stripeEventId: string;
    transactionId: string;
    paymentFor: string;
    student?: {
        nameEn: string;
        registrationId: string;
        classRoll: string;
        class?: {
            name: string;
        };
    };
}