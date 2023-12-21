'use client'
import Common from '@/templates/Common'
import Profile from '@/templates/Profile'
import React, { useCallback, useEffect, useState } from 'react'
import Tabs from "@/layout/payments/Tabs";
import { IBankAccount, IOrder, IPayoutRequest } from '@/types';
import { get_seller_payouts_available, seller_payout_request } from '@/services/payout-request.services';
import { useAppDispatch } from '@/redux/hooks';
import { toggleFullScreenLoadingAction } from '@/redux/slices/app';
import InvoiceIDComponent from '@/ui/InvoiceIDComponent';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from '@/ui/form/Button';
import Pagination from '@/ui/components/Pagination';
import { toast } from 'react-toastify';
import { handleApiError } from '@/utils/hanldeApiError';
import { PAYOUT_TYPE_ENUM } from '@/utils/enums';
import NotFoundScreen from '@/ui/NotFoundScreen.tsx';
import { get_user_verified_accounts } from '@/services/bank.services';
import { Dialog, DialogTitle } from '@mui/material';
import BankCard, { UserBanks } from '@/layout/payments/get-paid/BankCard';
import { IconComponent } from '@/ui/Icon';
interface IData extends IOrder {
    payoutInfo: IPayoutRequest[]
}

const PayoutOrders = () => {
    const [page, setpage] = useState(1)
    const [limit, setlimit] = useState(5)
    const dispatch = useAppDispatch()
    const [data, setdata] = useState<IData[]>([])
    const [totalDocs, settotalDocs] = useState(0)
    const GetPayoutRequests = useCallback(async () => {
        try {
            dispatch(toggleFullScreenLoadingAction(true))
            const { data } = await get_seller_payouts_available({ page: page, limit })
            setdata(data.payouts)
            settotalDocs(data.totalDocuments)
        } catch (error) {

        } finally {
            dispatch(toggleFullScreenLoadingAction(false))
        }
    }, [dispatch, limit, page])
    useEffect(() => {
        GetPayoutRequests()
    }, [GetPayoutRequests])
    const RemoveOrderByOrderId = useCallback((order_id: string) => {
        const filteredOrder = data.filter((val) => val._id !== order_id)
        setdata(filteredOrder)
    }, [data])
    return (
        <Common>
            <Profile>
                <Tabs />
                <div className="!w-full mb-8 !overflow-hidden mt-10">
                    <div className="w-full overflow-x-auto">
                        <table
                            className="w-full"
                            style={{
                                borderStyle: "hidden",
                            }}
                        >
                            <thead>
                                <tr className="uppercase text-sm font-semibold text-left text-white bg-brand_yellow-500 whitespace-nowrap">
                                    <th className="px-4 py-3 rounded-l-10px">order id</th>
                                    <th className="px-4 py-3 text-center">order status</th>
                                    <th className="px-4 py-3 text-center">payout amount</th>
                                    <th className="px-4 py-3 text-center rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    data.map((payout, index) => (
                                        <TableRow remove_order={RemoveOrderByOrderId} data={payout} key={index} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    data.length === 0 ?
                        <NotFoundScreen
                            text={`No payout requests available.`}
                            className='h-[400px]' />
                        :
                        null
                }
                {
                    data.length > 0 ?
                        <Pagination currentPage={page} totalPages={Math.ceil(totalDocs / limit)} onPageChange={(newpage: number) => {
                            setpage(newpage)
                        }} />
                        :
                        null
                }
            </Profile>
        </Common>
    )
}

export default PayoutOrders


const TableRow = ({ data, remove_order }: { data: IData, remove_order: (order_id: string) => void }) => {
    const [showDialog, setshowDialog] = useState(false)
    const [verifiedBanks, setverifiedBanks] = useState<UserBanks['account'][]>([])
    const dispatch = useAppDispatch()
    const calculateSellerPayoutAmmount = () => {
        return data.total_price - (data.refunded_amount ? data.refunded_amount : 0)
    }
    const handlePayoutRequest = async (account_id: string) => {
        try {
            dispatch(toggleFullScreenLoadingAction(true))
            //             payout_type
            // order_id
            // payout_amount
            // user_account
            await seller_payout_request({
                order_id: data._id,
                payout_amount: calculateSellerPayoutAmmount(),
                payout_type: PAYOUT_TYPE_ENUM.ORDER_AMOUNT,
                user_account: account_id
            })
            remove_order(data._id)
            toast.success("Payout requested successfully.")
        } catch (error) {
            const err = handleApiError(error)
            toast.error(err)
        } finally {
            dispatch(toggleFullScreenLoadingAction(false))
        }
    }
    const get_user_bank_accounts = async () => {
        try {
            dispatch(toggleFullScreenLoadingAction(true))
            const { data } = await get_user_verified_accounts()
            setverifiedBanks(data.accounts)
        } catch (error) {
            const err = handleApiError(error)
            toast.error(err)
        } finally {
            dispatch(toggleFullScreenLoadingAction(false))
            setshowDialog(true)
        }
    }
    const handleClose = () => {
        setverifiedBanks([])
        setshowDialog(false)
    }

    return (
        <>
            <Dialog
                onClose={handleClose}
                open={showDialog}
                fullWidth
                maxWidth='md'
            >
                <DialogTitle className='flex items-center justify-between'>
                    <h1>Select your payout account.</h1>
                    <IconComponent className='cursor-pointer' onClick={handleClose} name='CrossIcon' />
                </DialogTitle>
                <div className='p-5 space-y-3'>
                    {
                        verifiedBanks.length === 0 ?
                            <NotFoundScreen className='h-[400px]' />
                            :
                            null
                    }
                    {
                        verifiedBanks?.map((account, index) => (
                            <BankCard
                                actionButtons={
                                    <Button onClick={() => {
                                        setshowDialog(false)
                                        handlePayoutRequest("")
                                    }} className="w-28 h-10 flex items-center justify-center bg-brand_yellow-500 border-none">
                                        Select
                                    </Button>
                                }
                                account={account} key={index} />
                        ))
                    }
                </div>
            </Dialog>
            <tr className='h-6' />
            <tr className='bg-white cursor-pointer'>
                <td className='px-4 py-3 rounded-l-lg whitespace-nowrap font-Roboto font-medium text-sm'>
                    <InvoiceIDComponent text={data._id} />
                </td>
                <td className='px-4 py-3 rounded-l-lg whitespace-nowrap font-Roboto font-medium text-sm text-center'>{data.order_status.replaceAll("_", " ")}</td>
                <td className='px-4 py-3 rounded-l-lg whitespace-nowrap font-Roboto font-medium text-sm text-center'>{formatCurrency(calculateSellerPayoutAmmount())}</td>
                <td className='px-4 py-3 rounded-r-lg whitespace-nowrap font-Roboto font-medium text-sm text-center'>
                    <Button onClick={get_user_bank_accounts}>
                        Request Payout
                    </Button>
                </td>
            </tr>
        </>
    )
}