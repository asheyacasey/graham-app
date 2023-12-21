'use client'
import { refresh_onboarding_account_api, verify_onboarding_account_api } from '@/services/bank.services'
import LoadingScreen from '@/ui/LoadingScreen'
import Button from '@/ui/form/Button'
import { URLS } from '@/utils/URLS'
import { handleApiError } from '@/utils/hanldeApiError'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

const RefreshConnectPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const account_id = searchParams.get("account_id")
    const VerifyAccountOnboarding = useCallback(async () => {
        if (!account_id) {
            return;
        }
        try {
            const { data } = await refresh_onboarding_account_api({
                account_id: account_id
            })
            window.location.href = data
        } catch (error) {
            const err = handleApiError(error)
            toast.error(err)
        }
    }, [account_id])
    return (
        <div className='min-h-screen flex items-center justify-center p-5 flex-col space-y-3'>
            <h1 className='text-xl font-bold text-center'>Session expired!</h1>
            <p className='text-xs text-center'>Complete your account setup by clicking `Complete Account Details`</p>
            <Button onClick={VerifyAccountOnboarding} className='md:w-56'>
                Complete Account Details
            </Button>
        </div>
    )
}

export default RefreshConnectPage