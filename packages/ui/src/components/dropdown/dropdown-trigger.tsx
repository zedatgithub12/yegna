import React from "react";
import cn from "../../lib/class-names";
import { makeClassName } from "../../lib/make-class-name";
import { MenuButton, type MenuButtonProps } from "@headlessui/react";

export const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  MenuButtonProps
>(({ as, className, children, ...props }, ref) => {
  const Component = as;
  return (
    <MenuButton
      as={as}
      ref={ref}
      {...(Component === "button" && { type: "button" })}
      className={cn(makeClassName(`dropdown-button`), className)}
      {...props}
    >
      {children}
    </MenuButton>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";
