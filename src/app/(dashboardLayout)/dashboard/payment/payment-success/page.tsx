

import PaymentDashboard from '@/components/modules/Dasboard/Payment_Dashboard/payment-dashboard/payment-dashboard'
import { getUserInfo } from '@/services/authService'




const PaymentSuccessPage = async () => {
 const userInfo = await getUserInfo()


 return (
  <div>
   <PaymentDashboard userInfo={userInfo} />
  </div>
 )
}

export default PaymentSuccessPage