
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import { Chip } from '@mui/material';
import { IPayoutRequest } from '@/types';
import InvoiceIDComponent from '@/ui/InvoiceIDComponent';
import { PAYOUT_PAYMENT_STATUS_ENUM } from '@/utils/enums';

interface PayoutHistoryTableProps {
    data: IPayoutRequest[]
}
const PayoutHistoryTable = ({ data }: PayoutHistoryTableProps) => {
    return (
        <div className="!w-full mb-8 !overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className=" text-sm text-white bg-brand_yellow-500 whitespace-nowrap uppercase">
                            <th className="px-4 py-3 font-medium text-center rounded-l-xl">Payout ID</th>
                            <th className="px-4 py-3 font-medium text-center">User ID</th>
                            <th className="px-4 py-3 font-medium text-center">Oder ID</th>
                            <th className="px-4 py-3 font-medium text-center">Payout Amount</th>
                            <th className="px-4 py-3 font-medium text-center">Payout type</th>
                            <th className="px-4 py-3 font-medium text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-6">
                        {
                            data.map((payout, index) => (
                                <TableRow data={payout} key={index} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayoutHistoryTable;
const TableRow = ({ data }: { data: IPayoutRequest }) => {

    return (
        <>
            <tr className="h-6" />
            <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
                <td className="px-4 py-3 text-center rounded-l-lg">
                    <InvoiceIDComponent text={data._id} />
                </td>
                <td className="px-4 py-3 text-center">
                    <InvoiceIDComponent text={data.user} />
                </td>
                <td className="px-4 py-3 text-center">
                    <InvoiceIDComponent text={data.order_id} />
                </td>
                <td className="px-4 py-3 text-center ">{formatCurrency(data.payout_amount)}</td>
                <td className="px-4 py-3 text-center">
                    {data.payout_type.replaceAll("_", " ")}
                </td>
                <td className="px-4 py-3 text-center">
                    <Chip
                        label={data.payment_status.replaceAll("_", " ")}
                        variant='filled'
                        color={
                            data.payment_status === PAYOUT_PAYMENT_STATUS_ENUM.PAID ? 'success' : 'error'
                        }
                    />
                </td>
            </tr>
        </>
    );
};
