"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Text, Title } from "@yegna-systems/ui/typography";
import Image from "next/image";
import MessageIcon from "@/components/icons/message";

const MessageOptions = [
  {
    id: 1,
    name: "Sent",
    icon: <MessageIcon />,
    component: <div>Send Messages</div>,
  },

  {
    id: 2,
    name: "Drafts",
    icon: <MessageIcon />,
    component: <div>Draft Messages</div>,
  },

  {
    id: 3,
    name: "Trash",
    icon: <MessageIcon />,
    component: <div>Trashed Messages</div>,
  },

  {
    id: 4,
    name: "Templates",
    icon: <MessageIcon />,
    component: <div>Message Template</div>,
  },

  {
    id: 5,
    name: "Recipient Group",
    icon: <MessageIcon />,
    component: <div>Recipient Group</div>,
  },
];

const MessageSideNav = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex min-h-3/6 gap-4 mt-3">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 rounded-3xl">
        <div className="w-full rounded-2xl bg-[#F7F7F7] py-5 flex items-center justify-center">
          <Title as="h5" className="font-medium text-primary">
            Message Broadcast
          </Title>
        </div>

        <div className="space-y-2 text-sm text-gray-700 gap-6 mt-4">
          {MessageOptions.map((tab, index) => (
            <div
              key={index}
              className="flex items-center gap-2 hover:text-blue-600 p-2.5 px-3 rounded-lg bg-[#FBFBFB] hover:bg-gray-100 cursor-pointer"
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.icon}{" "}
              <Text className="font-medium text-[16px] text-gray-500">
                {tab.name}
              </Text>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-10 relative bg-gray-50 rounded-2xl">
        {/* Illustration */}

        <div>
          <div className="w-56 h-56 relative mb-4">
            <Image
              src="/images/no-message.gif" // Save the image from your screenshot as 'public/images/mailbox.png'
              alt="Mailbox"
              fill
              className="object-contain"
            />
          </div>

          {/* Empty State Message */}
          <p className="text-center text-lg font-semibold text-primary">
            Opps! There’s No Message Yet
          </p>

          <button className="absolute bottom-6 right-6 bg-[#00464F] hover:bg-[#00656E] text-white p-4 rounded-full shadow-lg transition-all">
            <Plus className="text-yellow-300" />
          </button>
        </div>

        <div>{MessageOptions[activeTabIndex]?.component}</div>
      </main>
    </div>
  );
};

export default MessageSideNav;
