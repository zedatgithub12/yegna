import React from "react";
import cn from "../../lib/class-names";
import { useDropdown } from "./dropdown-context";
import { ourPlacementObject } from "./dropdown.lib";
import { makeClassName } from "../../lib/make-class-name";
import { dropdownStyles } from "../../lib/dropdown-list-style";
import { MenuItems, Transition, type MenuItemsProps } from "@headlessui/react";

type DropdownMenuProps = {
  className?: string;
  anchorWidth?: boolean;
} & MenuItemsProps;

export function DropdownMenu({
  className,
  children,
  anchorWidth,
  ...props
}: React.PropsWithChildren<DropdownMenuProps>) {
  const { rounded, shadow, placement, gap, inPortal, modal } = useDropdown();

  return (
    <Transition
      as="div"
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems
        modal={modal}
        portal={inPortal}
        {...(inPortal && {
          anchor: {
            to: ourPlacementObject[
              placement as keyof typeof ourPlacementObject
            ],
            gap: gap,
          },
        })}
        className={cn(
          makeClassName(`dropdown-menu`),
          "w-48",
          dropdownStyles.base,
          anchorWidth && "w-[--button-width]",
          shadow && dropdownStyles.shadow[shadow],
          rounded && dropdownStyles.rounded[rounded],
          !inPortal && "absolute start-0 z-10 mt-1.5",
          className
        )}
        {...props}
      >
        {children}
      </MenuItems>
    </Transition>
  );
}

DropdownMenu.displayName = "DropdownMenu";
