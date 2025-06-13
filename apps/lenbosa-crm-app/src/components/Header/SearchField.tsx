"use client";

import { Input } from "rizzui";
import SvgWrapper from "../SvgWrapper";

const SearchField = () => {
  return (
    <Input
      variant="text"
      prefix={
        <SvgWrapper
          src="/icons/search-01.svg"
          width="18px"
          height="18px"
          color="#7C7C7C"
        />
      }
      placeholder="Search"
      className="w-96 p-0 bg-[#F7F7F7] rounded-lg"
      inputClassName="py-4"
    />
  );
};
export default SearchField;
