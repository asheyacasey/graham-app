import { IOrder } from "@/types"
import { IconComponent } from "@/ui/Icon"
import { formatCurrency } from "@/utils/formatCurrency"

const AccordianDetail = ({ order }: { order: IOrder }) => {
    if (typeof order.buyer === 'string' || typeof order.seller == 'string') {
        return <div>Populate fields please.</div>
    }
    return (
        <div className='grid grid-cols-3 gap-10'>
            <div className=''>
                <h1 className='text-brand_yellow-500 text-base font-semibold'>Order From</h1>
                <h1 className='text-base font-semibold mt-4'>{order.seller?.username}</h1>
                <div className='flex gap-2 mt-4 '>
                    <IconComponent name='LocationIcon' className='stroke-black shrink-0' height={'22'} width={'22'} />
                    <h1 className='text-brand_gray-200 text-sm -mt-1 font-medium'>{order.seller?.city}, {order.seller?.zip_code}, {order.seller?.country}</h1>
                </div>
                <div className='flex gap-2 mt-4 '>
                    <IconComponent name='PhoneIcon' className='shrink-0' height={'22'} width={'22'} />
                    <h1 className='text-brand_gray-200 text-sm font-medium'>{order.seller?.phoneNumber ?? 'NAN'}</h1>
                </div>
                <div className='flex gap-2 mt-4 '>
                    <IconComponent name='MailIcon' className=' shrink-0 ' height={'22'} width={'22'} />
                    <h1 className='text-brand_gray-200 text-sm font-medium'>{order.seller?.email}</h1>
                </div>
            </div>
            <div className=''>
                <h1 className='text-brand_yellow-500 text-base font-semibold'>Order By</h1>
                <h1 className='text-sm font-semibold mt-4'>{order.buyer?.username}</h1>
                <div className='flex gap-2 mt-4 '>
                    <IconComponent name='LocationIcon' className='stroke-black shrink-0' height={'22'} width={'22'} />
                    <h1 className='text-brand_gray-200 text-sm -mt-1 font-medium'>{order.billing_details?.city}, {order.billing_details?.zip_code}, {order.billing_details?.country}</h1>
                </div>
                <div className='flex gap-2 mt-4 '>
                    <IconComponent name='PhoneIcon' className='shrink-0' height={'22'} width={'22'} />
                    <h1 className='text-brand_gray-200 text-sm font-medium'>{order.billing_details.mobile_number}</h1>
                </div>
                <div className='flex gap-2 mt-4 '>
                    <IconComponent name='MailIcon' className=' shrink-0 ' height={'22'} width={'22'} />
                    <h1 className='text-brand_gray-200 text-sm font-medium'>{order.billing_details.email}</h1>
                </div>
            </div>
            <div className=''>
                <h1 className='text-brand_yellow-500 text-base font-semibold'>Payment Details</h1>
                <div className='flex gap-2 mt-4 '>
                    <h1 className=' text-sm font-semibold'>Invoice No. :</h1>
                    <h1 className='text-brand_gray-200 text-sm font-medium'>{order._id}</h1>
                </div>
                <div className='flex gap-2 mt-4 '>
                    <h1 className=' text-sm font-semibold'>Pay Amount :</h1>
                    <h1 className='text-brand_gray-200 text-sm font-medium'>{formatCurrency(order.total_price)}</h1>
                </div>
            </div>
        </div>
    )
}

export default AccordianDetail

