import Button from '@/ui/form/Button'
import React, { useState } from 'react'
import InvoiceDetail from '../orders/InvoiceDetail'
import { IOrder } from '@/types'
import moment from 'moment'
import { formatCurrency } from '@/utils/formatCurrency'
import { PAYMENT_STATUS_ENUM } from '@/utils/enums'

const InvoiceTable = ({ orders }: { orders: IOrder[] }) => {
    return (
        <div className="!w-full mb-8 !overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table
                    className="w-full"
                    style={{
                        borderStyle: "hidden",
                    }}
                >
                    <thead>
                        <tr className=" text-sm font-semibold text-left text-white bg-brand_yellow-500 whitespace-nowrap">
                            <th className="px-4 py-3 rounded-l-10px">Title</th>
                            <th className="px-4 py-3 text-center">
                                Date
                            </th>
                            <th className="px-4 py-3 text-center">Invoice Type</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-center">Price</th>
                            <th className="px-4 py-3 rounded-r-10px text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            orders.map((order, index) => (
                                <TableRow order={order} key={index} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InvoiceTable

const TableRow = ({ order }: { order: IOrder }) => {
    const [showAccordian, setshowAccordian] = useState(false)
    const [showInvoiceDetail, setshowInvoiceDetail] = useState(false)
    const toggleAccordian = () => {
        setshowAccordian(!showAccordian)
    }
    const viewInvoiceDetail = () => {
        setshowInvoiceDetail(!showInvoiceDetail)
    }
    if (typeof order.product === 'string') {
        return <div>Populate order.product</div>
    }
    return (
        <>
            <tr className='h-6' />
            <tr className='bg-white cursor-pointer whitespace-nowrap'>
                <td onClick={toggleAccordian} className='px-4 py-3 rounded-l-lg whitespace-nowrap font-Roboto font-medium text-sm'>Invoice : {order._id}</td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium'>
                    {/* February 5, 2023 */}
                    {moment(order.createdAt).format("MMMM D, YYYY")}
                </td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium '>{order.product?.plan.name.replaceAll("_", " ")}</td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium'>
                    {
                        order.payment_status !== PAYMENT_STATUS_ENUM.PAID ?
                            "Amount Not Paid"
                            :
                            "Amount Paid"
                    }
                </td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium text-center'>{formatCurrency(order.total_price)}</td>
                <td className='px-4 py-3 text-sm font-Roboto font-medium  text-center'>
                    <Button onClick={viewInvoiceDetail} className='bg-brand_yellow-500 text-white border-none whitespace-nowrap'>
                        {showInvoiceDetail ? 'Hide Details' : 'View Details'}
                    </Button>
                </td>
            </tr>
            {
                showInvoiceDetail &&
                <tr className='w-full'>
                    <td colSpan={6} className='overflow-hidden bg-white'>
                        <div className='border-t-2 border-t-brand_gray-900 py-10 flex items-center justify-center'>
                            <div className='w-[60%] mx-auto'>
                                <InvoiceDetail order={order} />
                            </div>
                        </div>
                    </td>
                </tr>
            }
        </>
    )
}