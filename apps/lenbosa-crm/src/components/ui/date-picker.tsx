import React from "react";
import DatePicker, { type DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, InputProps } from "./input";
import { CalendarIcon } from "lucide-react";
import cn from "@yegna-systems/ui/cn";
import { ChevronDownIcon } from "@/utils/icons/chevron-down";

const calendarContainerClasses = {
  base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md ",
  monthContainer: {
    padding: "[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3",
  },
};

const prevNextButtonClasses = {
  base: "[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7",
  border:
    "[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md",
  size: "[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px] hover:[&.react-datepicker>button]:border-gray-900 [&.react-datepicker>button:hover>span::before]:border-gray-900",
  children: {
    position: "[&.react-datepicker>button>span]:top-0",
    border:
      "[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400",
    size: "[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]",
  },
};

const timeOnlyClasses = {
  base: "[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28",
};

const popperClasses = {
  base: "[&>svg]:!fill-white dark:[&>svg]:!fill-gray-100 [&>svg]:!stroke-gray-300 dark:[&>svg]:!stroke-muted dark:[&>svg]:!text-muted",
};

export type ReactDatePickerProps = DatePickerProps & {
  inputProps?: InputProps;
  showPrefix?: boolean;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
};

export const ReactDatePicker = ({
  inputProps,
  customInput,
  onCalendarOpen,
  onCalendarClose,
  popperClassName,
  calendarClassName,
  showPrefix = true,
  prefix,
  suffix,
  ...props
}: ReactDatePickerProps) => {
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const handleCalenderOpen = () => setIsCalenderOpen(true);
  const handleCalenderClose = () => setIsCalenderOpen(false);
  return (
    <div className={cn("[&_.react-datepicker-wrapper]:w-full w-full")}>
      <DatePicker
        showPopperArrow={false}
        customInput={
          customInput || (
            <Input
              prefix={
                showPrefix && prefix ? (
                  prefix
                ) : showPrefix ? (
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                ) : null
              }
              suffix={
                suffix ? (
                  suffix
                ) : (
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 text-gray-500 transition",
                      isCalenderOpen && "rotate-180"
                    )}
                  />
                )
              }
              {...inputProps}
            />
          )
        }
        onCalendarOpen={onCalendarOpen || handleCalenderOpen}
        onCalendarClose={onCalendarClose || handleCalenderClose}
        calendarClassName={cn(
          calendarContainerClasses.base,
          calendarContainerClasses.monthContainer.padding,
          prevNextButtonClasses.base,
          prevNextButtonClasses.border,
          prevNextButtonClasses.size,
          prevNextButtonClasses.children.position,
          prevNextButtonClasses.children.border,
          prevNextButtonClasses.children.size,
          timeOnlyClasses.base,
          calendarClassName
        )}
        popperClassName={cn(popperClasses.base, popperClassName)}
        {...props}
      />
    </div>
  );
};

ReactDatePicker.displayName = "ReactDatePicker";
export default ReactDatePicker;
