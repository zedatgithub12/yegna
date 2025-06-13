import React from "react";
import { Title } from "@yegna-systems/ui/typography";
import { Tab } from "rizzui/tabs";
import { Button } from "@yegna-systems/ui/button";

const MoreInfoPanel = ({ agreements, documents }) => {
  const tabTitles = ["Report", "Agreement", "Documents"];

  return (
    <div className="space-y-6 bg-gray-100 p-2 rounded-xl shadow-md">
      <Title className="text-lg font-semibold mb-2">More Information</Title>
      <hr className="border-gray-300" />
      <Tab>
        <Tab.List className="flex justify-center space-x-4 rounded-lg bg-gray-100 px-4 py-2">
          {tabTitles.map((tab, index) => (
            <Tab.ListItem key={index} className="flex-1 min-w-[120px] px-0">
              {({ selected }) => (
                <div
                  className={`w-full py-3 px-6 text-center rounded-lg transition-colors duration-200 ${
                    selected
                      ? "bg-primary shadow text-secondary font-medium"
                      : "bg-gray-100 text-gray-500 hover:bg-primary hover:text-secondary"
                  }`}
                >
                  {tab}
                </div>
              )}
            </Tab.ListItem>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* Report Panel */}
          <Tab.Panel className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Institution Report</h3>
            <p className="text-sm text-gray-600">
              Detailed report about the institution's activities and
              performance.
            </p>
            <div className="mt-4 space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Activity Summary</p>
                <p className="text-sm text-gray-600 mt-1">No recent activity</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Performance Metrics</p>
                <p className="text-sm text-gray-600 mt-1">
                  No metrics available
                </p>
              </div>
            </div>
          </Tab.Panel>

          {/* Agreement Panel */}
          <Tab.Panel className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-4">Agreements</h3>
            {agreements && agreements.length > 0 ? (
              <div className="space-y-3">
                {agreements.map((agreement, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{agreement.name}</p>
                    <Button
                      variant="solid"
                      color="primary"
                      className="mt-2 text-sm"
                      onClick={() => window.open(agreement.url, "_blank")}
                    >
                      View Agreement
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No agreements found</p>
            )}
          </Tab.Panel>

          {/* Documents Panel */}
          <Tab.Panel className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-4">Documents</h3>
            {documents && documents.length > 0 ? (
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{doc.name}</p>
                    <Button
                      variant="solid"
                      color="primary"
                      className="mt-2 text-sm"
                      onClick={() => window.open(doc.url, "_blank")}
                    >
                      View Document
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No documents found</p>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
};

export default MoreInfoPanel;
