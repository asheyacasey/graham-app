'use client'
import { IconComponent } from '@/ui/Icon'
import Button from '@/ui/form/Button'
import { URLS } from '@/utils/URLS'
import { useRouter } from 'next/navigation'
import React from 'react'

const StripePlanCancel = () => {
    const router = useRouter()
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-white p-6  md:mx-auto">
                <IconComponent name='CrossContainedIcon' width={250} height={250} className='mx-auto text-red-500' />
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-red-900 font-semibold text-center">
                        Payment Cancelled!
                    </h3>
                    <p className="text-gray-600 my-2 lg:w-1/2 text-center mx-auto">
                        Thank you for initiating your online payment. Unfortunately, the payment process was not successfully completed.
                        {`If you have any questions or concerns, please don't hesitate to reach out to our support team. We're here to assist you.`}
                    </p>
                    <p> Have a great day! </p>
                    <div className="py-10 text-center">
                        <Button onClick={() => { router.push(URLS.HOME) }} className='lg:w-1/2 mx-auto'>GO HOME</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StripePlanCancel