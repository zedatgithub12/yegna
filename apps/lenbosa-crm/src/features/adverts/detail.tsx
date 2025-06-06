import { formatDate } from "@/utils/lib/format-date-time";
import { StatusColor } from "@/utils/lib/status-color";
import { Text, Title } from "@yegna-systems/ui/typography";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const AdDetail = ({
  image,
  title,
  description,
  start_date,
  end_date,
  status,
  onClose,
}: {
  image: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: boolean;
  onClose: () => void;
}) => {
  return (
    <div className="p-3 rounded-xl relative">
      <div
        className="absolute top-1 right-1 bg-white hover:bg-gray-50 shadow-sm  rounded-full p-1 cursor-pointer"
        onClick={onClose}
      >
        <X size={18} />
      </div>
      <Image
        src={image}
        alt="poster"
        width={500}
        height={500}
        className="w-full h-auto max-h-52 object-contain rounded-lg bg-slate-100 p-1"
      />

      <div className="flex items-center justify-between gap-2 mt-2">
        <Title as="h4" className="line-clamp-2">{title}</Title>

        <Text
          className="font-normal text-center px-2 py-1 rounded-full capitalize"
          style={{
            color: StatusColor(status ? "active" : "inactive")?.color,
            backgroundColor: StatusColor(status ? "active" : "inactive")
              ?.background,
          }}
        >
          {status ? "active" : "inactive"}
        </Text>
      </div>
      <div
        className="text-sm text-gray-400 my-1"
        dangerouslySetInnerHTML={{ __html: description ?? "" }}
      />

      <div className="flex items-center gap-2">
        <Text className="font-normal text-gray-500 text-sm">
          {start_date ? formatDate(new Date(start_date)) : "-"}
        </Text>

        <Text className="font-normal text-gray-500 text-sm">
          {end_date ? formatDate(new Date(end_date)) : "-"}
        </Text>
      </div>
    </div>
  );
};

export default AdDetail;
