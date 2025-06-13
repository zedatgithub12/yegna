import React from "react";
import { useDrawer } from "@yegna-systems/lib/hooks/use-drawer";
import { Button } from "@yegna-systems/ui/button";
import DrawerHeader from "@yegna-systems/lib/view/drawer-header";
import { Select } from "@/components/ui/select";
import useUserFilterStore from "@/store/user.store";

const InstitutionFilter = ({ categories }: { categories: Category[] }) => {
  const { closeDrawer } = useDrawer();
  const { role, setRole, gender, setGender, status, setStatus } =
    useUserFilterStore((state) => state);

  function clearFilters() {}

  return (
    <div className="p-3 h-full flex flex-col items-start space-y-5 w-full">
      <DrawerHeader title="Institution Filters" />
      <div className="flex flex-col items-start  w-full flex-grow ">
        <Select
          color="primary"
          label="Type"
          variant="flat"
          placeholder="By Type"
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          value={role}
          onChange={(v: { value: string }) => setRole(v.value)}
          clearable
          onClear={() => setRole("")}
        />

        <Select
          color="primary"
          label="Gender"
          variant="flat"
          placeholder="By Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          value={gender}
          onChange={(v: { value: string }) => setGender(v.value)}
          clearable
          onClear={() => setGender("")}
        />

        <Select
          color="primary"
          label="Status"
          variant="flat"
          placeholder="By Status"
          options={[
            { label: "Active", value: "active" },
            { label: "In-Active", value: "in-active" },
            { label: "Suspended", value: "suspended" },
          ]}
          value={status}
          onChange={(v: { value: string }) => setStatus(v.value)}
          clearable
          onClear={() => setStatus("")}
        />
      </div>
      <div className="w-full flex flex-col items-center  gap-2">
        <Button onClick={closeDrawer} className=" w-full">
          Apply Filter
        </Button>
        <Button onClick={clearFilters} variant="flat" className=" w-full">
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default InstitutionFilter;
