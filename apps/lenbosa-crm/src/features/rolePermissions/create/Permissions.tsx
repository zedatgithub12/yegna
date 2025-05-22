"use client";

import Loader from "@/components/Loader";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import FallbackComponent from "@/utils/fallback/NotFound";
import { Text, Title } from "@yegna-systems/ui/typography";
import { ErrorMessage, useFormikContext } from "formik";
import { Check } from "lucide-react";

interface permissionProps {
  permissions: string[];
}
const Permissions = () => {
  const { values, setFieldValue, touched } =
    useFormikContext<permissionProps>();

  const responsePayload = useFetchData(
    [queryKeys.get_permissions],
    `${queryKeys.get_permissions}`
  );

  const permissionsData: { uuid: string; name: string }[] =
    responsePayload?.data?.data;

  const handleSelectingPermission = (uuid: string) => {
    {
      const currentPermissions = values.permissions;
      if (currentPermissions.includes(uuid)) {
        setFieldValue(
          "permissions",
          currentPermissions.filter((id) => id !== uuid)
        );
      } else {
        setFieldValue("permissions", [...currentPermissions, uuid]);
      }
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-2 py-6 justify-between w-full border-b border-t">
      <div className="col-span-4 ">
        <Title as="h6" className="font-medium capitalize">
          Permissions
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add the permissions for the role here.
        </Text>
      </div>

      {responsePayload.isFetching ? (
        <div className="w-full h-52 flex flex-col items-center justify-center">
          <Loader key="loader" />
        </div>
      ) : responsePayload.isError ? (
        <FallbackComponent
          status_code="500"
          title="There is error getting permission"
          message="Try again"
        />
      ) : permissionsData.length === 0 ? (
        <FallbackComponent
          status_code="400"
          title="No permission found"
          message="Unable to load the permission, please contact the system admin"
        />
      ) : (
        <div className="col-span-8 space-y-3 flex flex-wrap items-center gap-2">
          {permissionsData.map((permission, index) => {
            return (
              <label
                key={index}
                className={`flex items-center w-fit  gap-2 px-2 py-1.5 rounded-full border cursor-pointer transition-all 
                 ${values.permissions.includes(permission.uuid) ? "bg-primary" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={values.permissions.includes(permission.uuid)}
                  onChange={() => handleSelectingPermission(permission.uuid)}
                  className="hidden"
                />
                {values.permissions.includes(permission.uuid) ? (
                  <div className="w-[14px] h-[14px]  rounded-[4px] bg-secondary flex items-center justify-center">
                    <Check size={10} className="text-primary" />
                  </div>
                ) : (
                  <div className="w-[14px] h-[14px] rounded-[4px] border border-gray-400"></div>
                )}
                <span
                  className={`text-xs font-medium capitalize
                ${values.permissions.includes(permission.uuid) ? "text-secondary" : ""}`}
                >
                  {permission.name.split("_").join(" ")}
                </span>
              </label>
            );
          })}
          {touched.permissions && (
            <ErrorMessage
              name="permissions"
              component="div"
              className={"text-xs text-red-500 pt-1 font-medium"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Permissions;
