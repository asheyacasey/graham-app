'use client'
import Button from '@/ui/form/Button'
import { URLS } from '@/utils/URLS'
import { useRouter } from 'next/navigation'
import React from 'react'

const StripePlanSuccess = () => {
    const router = useRouter()
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-white p-6  md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 mx-auto my-6"
                    width={250}
                    height={250}
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment. Your add created successfully.
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

export default StripePlanSuccess