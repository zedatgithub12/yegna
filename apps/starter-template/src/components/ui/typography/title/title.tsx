import React from "react";
import { fontWeightStyles } from "../../../../../../../packages/ui/src/lib/font-weight";
import { makeClassName } from "../../../../../../../packages/ui/src/lib/make-class-name";
import cn from "@yegna-systems/ui/cn";


const fontWeight = {
  ...fontWeightStyles,
  extraBold: "font-extrabold",
} as const;

const titleStyles = {
  as: {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-base",
  },
  fontWeight,
};

export type TitleProps = {
  as?: keyof typeof titleStyles.as;
  fontWeight?: keyof typeof titleStyles.fontWeight;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Title({
  as = "h2",
  fontWeight = "bold",
  children,
  className,
  ...props
}: React.PropsWithChildren<TitleProps>) {
  const Component = as;

  return (
    <Component
      className={cn(
        makeClassName(`title-${as}`),
        titleStyles.as[as],
        titleStyles.fontWeight[fontWeight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

Title.displayName = "Title";
