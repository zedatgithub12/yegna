"use client";

import React, { useState } from "react";
import { Text, Title } from "@yegna-systems/ui/typography";
import TrashIcon from "@/components/icons/trash";
import UserGroupIcon from "@/components/icons/user-group";
import MessageSent from "@/components/icons/message-sent";
import MessageDraft from "@/components/icons/message-draft";
import MessageTemplate from "@/components/icons/message-template";
import Inbox from "./Inbox";
import { Plus } from "lucide-react";

const MessageTabOptions = [
  {
    id: 1,
    name: "Sent",
    icon: <MessageSent className="w-5 h-5" />,
    component: <Inbox />,
  },
  {
    id: 2,
    name: "Drafts",
    icon: <MessageDraft className="w-5 h-5" />,
    component: <div>Draft Messages</div>,
  },
  {
    id: 3,
    name: "Trash",
    icon: <TrashIcon className="w-5 h-5" />,
    component: <div>Trashed Messages</div>,
  },
  {
    id: 4,
    name: "Templates",
    icon: <MessageTemplate className="w-5 h-5" />,
    component: <div>Message Template</div>,
  },
  {
    id: 5,
    name: "Recipient Group",
    icon: <UserGroupIcon className="w-5 h-5" />,
    component: <div>Recipient Group</div>,
  },
];

const MessageSideNav = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex min-h-3/6 gap-4 mt-3">
      {/* Sidebar */}
      <aside className="w-64 min-h-dvh bg-white p-4 rounded-3xl">
        <div className="w-full rounded-2xl gap-2 hover:scale-105 transition-all ease-out duration-200 cursor-pointer bg-[#F7F7F7] py-5 flex items-center justify-center">
          <Plus size={18} color="#00464F" />
          <Title as="h6" className="font-normal text-primary">
            Compose Message
          </Title>
        </div>

        <div className="space-y-3 text-sm text-gray-700 gap-6 mt-4">
          {MessageTabOptions.map((tab, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-3.5 px-3 rounded-xl cursor-pointer ${activeTabIndex === index ? "bg-primary text-secondary" : "bg-[#FBFBFB] hover:bg-gray-100"}`}
              onClick={() => setActiveTabIndex(index)}
            >
              {React.cloneElement(tab.icon, {
                color: activeTabIndex === index ? "#D7F400" : "#656565",
                className: `${tab.icon.props.className} ${activeTabIndex === index ? "text-secondary" : "text-gray-600"}`,
              })}
              <Text
                className={`font-medium text-[14px] ${activeTabIndex === index ? "text-secondary" : "text-gray-600"}`}
              >
                {tab.name}
              </Text>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col  justify-start  relative rounded-2xl">
        <div>{MessageTabOptions[activeTabIndex]?.component}</div>
      </main>
    </div>
  );
};

export default MessageSideNav;
