import React from "react";
import { Logs } from "lucide-react";
import { Text } from "@yegna-systems/ui/typography";

const ActivityLogs = ({ activities }: { activities: Logs[] }) => {
  return (
    <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl py-3">
      <h2 className="text-xl font-bold mb-2 px-4 py-1">Activity Log</h2>
      <hr />
      <div className="divide-y divide-gray-200 mt-2">
        {activities.length === 0 ? (
          <div className="flex items-center justify-center text-md py-4">
            <Text>No Logs yet</Text>
          </div>
        ) : (
          <div className="bg-white p-2 mx-2 rounded-2xl divide-y">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center py-4">
                <div className="bg-gray-50 rounded-full p-2 mr-4 border">
                  <Logs className="w-4 h-4 text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-normal text-gray-600">
                      {activity.action}
                    </span>{" "}
                    <span className="text-gray-600">to</span>{" "}
                    <span className="font-bold">{activity.target}</span>
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <span className="text-black">{activity.date}</span>
                  <span className="text-xs pl-0.5"> | {activity.time}</span>
                </div>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
