import Logo from "@/components/logo";
import { Text, Title } from "@yegna-systems/ui/typography";
import Image from "next/image";
import React from "react";

type PartyInfo = {
  name: string;
  paymentRef: string;
  channel: string;
  email: string;
  phone: string;
};

type BillToInfo = {
  name: string;
  email: string;
  fax: string;
  phone: string;
};

type InvoiceProps = {
  paidBy: PartyInfo;
  billTo: BillToInfo;
  invoiceNumber: string;
  paidAt: string;
  receiveAt: string;
  subtotal: number;
  dataFee: number;
  serviceCharge: number;
  total: number;
  isPaid: boolean;
  qrCodeUrl: string;
};

const InvoiceReceipt: React.FC<InvoiceProps> = ({
  paidBy,
  billTo,
  invoiceNumber,
  paidAt,
  receiveAt,
  subtotal,
  dataFee,
  serviceCharge,
  total,
  isPaid,
  qrCodeUrl,
}) => {
  return (
    <div className=" p-4 bg-white rounded-lg ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <div className="w-28 h-28 flex items-center justify-center rounded">
            <Logo className="w-24 h-24" />
          </div>
        </div>

        <div className="text-right">
          {isPaid && (
            <Text className="inline-block bg-green-100 text-green-600 text-sm px-4 py-1 rounded-full font-medium mb-2">
              Paid
            </Text>
          )}

          <Text className="text-sm text-gray-900 font-medium text-[15px]">
            {" "}
            INV - {invoiceNumber}
          </Text>

          <Text className="text-xs text-gray-500 font-normal mt-1">
            Invoice Number
          </Text>

          <Image
            src={qrCodeUrl}
            alt="QR Code"
            width={200}
            height={200}
            className="w-20 h-20 mt-2 mx-auto md:ml-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="gap-4">
          <h4 className="font-medium text-[16px] mb-2">Paid By</h4>
          <p className="text-sm text-gray-500 font-normal py-0.5">
            {paidBy.name}
          </p>
          <p className="text-sm text-gray-500 font-normal py-0.5">
            {paidBy.paymentRef}
          </p>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            {paidBy.channel}
          </Text>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            {paidBy.email}
          </Text>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            {paidBy.phone}
          </Text>
          <p className="font-medium text-[16px] mt-6">Paid at</p>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            {paidAt}
          </Text>
        </div>

        <div>
          <h4 className="font-medium text-[16px] mb-2">Bill To</h4>
          <Text className="text-sm text-gray-500 font-normal py-0.5 ">
            {billTo.name}
          </Text>
          <Text className="text-sm text-gray-500 font-normal py-0.5 ">
            {billTo.email}
          </Text>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            FAX - {billTo.fax}
          </Text>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            {billTo.phone}
          </Text>
          <p className="font-medium text-[16px] mt-10">Receive at</p>
          <Text className="text-sm text-gray-500 font-normal py-0.5">
            {receiveAt}
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between mt-10 border-t pt-2">
        <div className="col-span-1 md:col-span-1 lg:col-span-2 pt-4 ">
          <Title as="h4" className="font-medium text-[16px] mb-2">
            Note
          </Title>
          <p className="text-sm text-gray-500 font-normal">
            We appreciate your business. Should you need us to add VAT or extra
            notes let us know!
          </p>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 border-gray-200 pt-4 mb-4">
          <div className="flex justify-between text-sm mb-2">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-black font-semibold text-xs">
              ETB {subtotal.toLocaleString()}
            </Text>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <Text className="text-gray-500">Data</Text>
            <Text className="text-black font-semibold text-xs">
              ETB {dataFee.toLocaleString()}
            </Text>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <Text className="text-gray-500">Service charge</Text>
            <Text className="text-black font-semibold text-xs">
              ETB {serviceCharge.toLocaleString()}
            </Text>
          </div>
          <div className="flex justify-between font-medium text-[16px] text-base border-t border-gray-300 pt-2 mt-2">
            <Text className="text-gray-900">Total</Text>
            <Text className="text-black font-semibold">
              ETB {total.toLocaleString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceReceipt;
