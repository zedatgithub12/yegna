"use client";

import PageWrapper from "@/components/PagesWrapper";
import React, { useRef } from "react";
import { Button } from "@yegna-systems/ui/button";
import { useParams } from "next/navigation";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { Printer } from "lucide-react";
import InvoiceReceipt from "./components/InvoiceReceipt";

const Invoice = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const id = params?.id;

  const userDataResponse = useFetchData(
    [queryKeys.get_users, id],
    `${queryKeys.get_users}/${id}`
  );

  const userData: UserDataProps = userDataResponse?.data?.data;

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <PageWrapper
      title="Transaction Detail"
      back={true}
      search={false}
      isLoading={userDataResponse.isFetching}
      isError={userDataResponse.isError}
      notfound={!userData}
      fallback={{
        status_code: "404",
        title: "Customer data not found",
        message: "",
      }}
      breadcrumb={true}
      hasActionButton
      actionButtons={
        <Button
          variant="solid"
          color="primary"
          className="hover:bg-primary-dark text-white font-medium cursor-pointer gap-1 rounded-lg "
          onClick={handlePrint}
        >
          <Printer className="w-5 h-5 text-white pr-1" color="#fff" />
          Print Receipt
        </Button>
      }
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <div ref={printRef}>
        <InvoiceReceipt
          paidBy={{
            name: "Filimon Mehari",
            paymentRef: "Payment Reference ID – SCH-FAM0011",
            channel: "Payment Channel – Telebirr",
            email: "Filimon@gmail.com",
            phone: "(091) 101–0101",
          }}
          billTo={{
            name: "SOS Herman Gmeiner School – Mekelle",
            email: "SOSHGS–Mekelle@gmail.com",
            fax: "01101101",
            phone: "(091) 010–110012",
          }}
          invoiceNumber="00110101"
          paidAt="December 21, 2024"
          receiveAt="December 21, 2024"
          subtotal={12800}
          dataFee={1200}
          serviceCharge={8}
          total={14008}
          isPaid={true}
          qrCodeUrl=""
        />
      </div>
    </PageWrapper>
  );
};

export default Invoice;
