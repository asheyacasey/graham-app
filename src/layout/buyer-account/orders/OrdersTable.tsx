import Button from '@/ui/form/Button';
import { cn } from '@/utils/styles';
import Image from 'next/image';
import React, { useState } from 'react'
import OrderSteps from './OrderSteps';
import InvoiceDetail from './InvoiceDetail';
import AccordianDetail from './AccordianDetail';
import { useAppSelector } from '@/redux/hooks';
import { IOrder } from '@/types';
import InvoiceIDComponent from '@/ui/InvoiceIDComponent';
import { formatCurrency } from '@/utils/formatCurrency';
import moment from 'moment';
import { ORDER_STATUS_ENUM } from '@/utils/enums';

const OrdersTable = () => {
    const sellerState = useAppSelector((s) => s.seller_account_flow)
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
                            <th className="px-4 py-3 rounded-l-10px">Order ID</th>
                            <th className="px-4 py-3 text-center">
                                Product
                            </th>
                            <th className="px-4 py-3 text-center">Rent</th>
                            <th className="px-4 py-3 text-center">Lease Period</th>
                            <th className="px-4 py-3 text-center">Total Rent</th>
                            <th className="px-4 py-3 text-center">Quantity</th>
                            <th className="px-4 py-3 text-center">Order By</th>
                            <th className="px-4 py-3 rounded-r-10px text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-6">
                        {
                            sellerState.orders.orders.map((order, index) => (
                                <TableRow order={order} key={index} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default OrdersTable
type TableRowProps = {
    order: IOrder
}
const TableRow = ({ order }: TableRowProps) => {
    const [showAccordian, setshowAccordian] = useState(false)
    const toggleAccordian = () => {
        setshowAccordian(!showAccordian)
    }

    return (
        <>
            <tr className='h-6' />
            <tr className='bg-white cursor-pointer'>
                <td onClick={toggleAccordian} className='px-4 py-3 rounded-l-lg whitespace-nowrap font-Roboto font-medium'>
                    <InvoiceIDComponent text={order._id} />
                </td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm '>
                    <ProductSection order={order} />
                </td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium whitespace-nowrap'>{formatCurrency(
                    typeof order.product === 'object'
                        ?
                        order.product.prices.rent_price
                        :
                        0
                )}</td>
                <td onClick={toggleAccordian} className='px-4 py-3'>
                    <PeriodSection order={order} />
                </td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium text-center whitespace-nowrap'>{
                    formatCurrency(
                        order.total_price
                    )
                }</td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Roboto font-medium  text-center'>{order.quantity}</td>
                <td onClick={toggleAccordian} className='px-4 py-3 text-sm font-Montserrat font-semibold  text-center whitespace-nowrap'>{
                    typeof order.buyer === 'object' ?
                        order.buyer.username
                        :
                        ''
                }</td>
                <td className='px-4 py-3 rounded-r-lg'>
                    <Button className={cn('border-none font-semibold', {
                        'bg-brand_green-50 text-brand_green-300': order.order_status === ORDER_STATUS_ENUM.COMPLETED,
                        'bg-brand_red-600 text-brand_red-500': order.order_status === ORDER_STATUS_ENUM.CANCELLED,
                        'bg-brand_purple-50 text-brand_purple-500': order.order_status === ORDER_STATUS_ENUM.PENDING,
                        'bg-brand_yellow-50 text-brand_yellow-500': order.order_status === ORDER_STATUS_ENUM.REJECTED,
                    })}>
                        {ORDER_STATUS_ENUM[order.order_status]}
                    </Button>
                </td>
            </tr>
            {
                showAccordian &&
                <Accordian order={order} />
            }
        </>
    )
}
const ProductSection = ({ order }: TableRowProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-[75px] h-[75px] relative">
                <Image
                    src={
                        typeof order.product === 'object'
                            ?
                            order.product.images[0]
                            :
                            ''
                    }
                    alt=""
                    fill
                    className="object-contain shrink-0"
                />
            </div>
            <div className="space-y-1">
                <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
                    {
                        typeof order.product === 'object'
                            ?
                            order.product.add_title
                            :
                            ''
                    }
                </h1>
                <h1 className="text-xs font-Roboto ">
                    <span className='text-brand_gray-200'>Category</span> {
                        typeof order.product === 'object'
                            ?
                            order.product.category
                            :
                            ''
                    } <span className='text-brand_gray-200'>and</span> {typeof order.product === 'object'
                        ?
                        order.product.sub_category
                        :
                        ''}
                </h1>
                <h1 className="text-xs font-Roboto ">
                    <span className='text-brand_gray-200'>City</span> {
                        typeof order.product === 'object'
                            ?
                            order.product.location.city
                            :
                            ''
                    }
                </h1>
            </div>
        </div>
    );
};
const PeriodSection = ({ order }: TableRowProps) => {
    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="text-center font-Montserrat font-semibold text-sm">
                {`${order.time_difference} ${typeof order.product === 'object'
                    ?
                    order.product.prices.rented_as.toUpperCase()
                    :
                    ''
                    }`}
            </h1>
            <h1 className="text-center text-brand_gray-200 font-Montserrat font-semibold text-sm">
                {moment(order.start_date).format("Do MMM")} to {moment(order.end_date).format("Do MMM")}
            </h1>
        </div>
    );
};

const Accordian = ({ order }: { order: IOrder }) => {
    const [showInvoice, setshowInvoice] = useState(false)
    const toggleShowInvoice = () => {
        setshowInvoice(!showInvoice)
    }
    return (
        <tr>
            <td colSpan={8} className='border-t-2 border-t-brand_gray-900 bg-white '>
                <div className='p-6'>
                    <AccordianDetail order={order} />
                    <OrderSteps order={order} />
                    <div className='mt-8 flex items-center  w-[30%] mx-auto gap-5'>
                        <Button onClick={toggleShowInvoice} className='bg-brand_yellow-500 text-white border-none font-semibold whitespace-nowrap'>
                            Invoice Detailed
                        </Button>
                    </div>
                </div>
                {
                    showInvoice &&
                    <div className='border-t-2 border-t-brand_gray-900 py-10 mt-10 flex items-center justify-center'>
                        <div className='w-[60%] mx-auto'>
                            <InvoiceDetail order={order} />
                        </div>
                    </div>
                }
            </td>
        </tr>
    )
}


