'use client'
import Common from '@/templates/Common'
import Profile from '@/templates/Profile'
import React, { useCallback, useEffect, useState } from 'react'
import Tabs from "@/layout/payments/Tabs";
import { IPayoutRequest } from '@/types';
import { get_payout_history_api } from '@/services/payout-request.services';
import { useAppDispatch } from '@/redux/hooks';
import { toggleFullScreenLoadingAction } from '@/redux/slices/app';
import { toast } from 'react-toastify';
import { handleApiError } from '@/utils/hanldeApiError';
import NotFoundScreen from '@/ui/NotFoundScreen.tsx';
import PayoutHistoryTable from '@/layout/payments/PayoutHistoryTable';
import Pagination from '@/ui/components/Pagination';

const PayoutOrders = () => {
    const [page, setpage] = useState(1)
    const [limit, setlimit] = useState(5)
    const dispatch = useAppDispatch()
    const [data, setdata] = useState<IPayoutRequest[]>([])
    const [totalDocs, settotalDocs] = useState(0)
    const GetPayoutRequests = useCallback(async () => {
        try {
            dispatch(toggleFullScreenLoadingAction(true))
            const { data } = await get_payout_history_api(`?page=${page}&&limit=${limit}`)
            setdata(data.payout_history)
            settotalDocs(data.totalDocuments)
        } catch (error) {
            const err = handleApiError(error)
            toast.error(err)
        } finally {
            dispatch(toggleFullScreenLoadingAction(false))
        }
    }, [dispatch, limit, page])
    useEffect(() => {
        GetPayoutRequests()
    }, [GetPayoutRequests])
    return (
        <Common>
            <Profile>
                <Tabs />

                {
                    data.length === 0 ?
                        <NotFoundScreen
                            text={`No payout history available.`}
                            className='h-[400px]' />
                        :
                        null
                }
                {
                    data.length > 0 ?
                        <div className='mt-5'>
                            <PayoutHistoryTable data={data} />
                            <Pagination currentPage={page} totalPages={Math.ceil(totalDocs / limit)} onPageChange={(newpage: number) => {
                                setpage(newpage)
                            }} />
                        </div>
                        :
                        null
                }
            </Profile>
        </Common>
    )
}

export default PayoutOrders
