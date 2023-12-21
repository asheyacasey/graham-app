'use client'
import { verify_onboarding_account_api } from '@/services/bank.services'
import LoadingScreen from '@/ui/LoadingScreen'
import { URLS } from '@/utils/URLS'
import { handleApiError } from '@/utils/hanldeApiError'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

const StripeConnectSuccess = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const account_id = searchParams.get("account_id")
    const VerifyAccountOnboarding = useCallback(async () => {
        if (!account_id) {
            return;
        }
        try {
            await verify_onboarding_account_api({
                account_id: account_id
            })
            toast.success("Your payment account created successfully")
        } catch (error) {
            const err = handleApiError(error)
            toast.error(err)
        } finally {
            router.replace(URLS.PAYMENTS)
        }
    }, [account_id, router])
    useEffect(() => {
        VerifyAccountOnboarding()
    }, [VerifyAccountOnboarding])
    return (
        <LoadingScreen className='h-screen' />
    )
}

export default StripeConnectSuccess