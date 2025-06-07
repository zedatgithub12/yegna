import React from "react";
import cn from "@/utils/lib/class-names";
import { makeClassName } from "@/utils/lib/make-class-name";
import Image from "next/image";

const classes = {
  base: "inline-flex items-center justify-center flex-shrink-0",
  size: {
    sm: "32",
    md: "40",
    lg: "48",
    xl: "56",
  },
  fontSize: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  },
  rounded: {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  },
  color: {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-green text-white",
    warning: "bg-orange text-white",
    danger: "bg-red text-white",
    info: "bg-blue text-white",
  },
};

export type AvatarProps = {
  src?: string;
  name: string;
  initials?: string;
  size?: keyof typeof classes.size;
  customSize?: string | number;
  rounded?: keyof typeof classes.rounded;
  color?: keyof typeof classes.color;
  onClick?: () => void;
  className?: string;
};

const letterWithColors = [
  { string: ["a", "n"], color: "#FF9F47" },
  { string: ["b", "o"], color: "#A347FF" },
  { string: ["c", "p"], color: "#726D76" },
  { string: ["d", "q"], color: "#FF6847" },
  { string: ["e", "r"], color: "#47A7FF" },
  { string: ["f", "s"], color: "#22BCA0" },
  { string: ["g", "t"], color: "#FF4794" },
  { string: ["h", "u"], color: "#4770FF" },
  { string: ["i", "v"], color: "#40DFEF" },
  { string: ["j", "w"], color: "#AB46D2" },
  { string: ["k", "x"], color: "#83BD75" },
  { string: ["l", "y"], color: "#FF008E" },
  { string: ["m", "z"], color: "#ef4444" },
];

function backgroundColor(signature: string) {
  const currObj = letterWithColors.filter((obj) =>
    obj.string.includes(signature?.charAt(0).toLowerCase()),
  );
  return currObj[0]?.color ?? "#FF6847";
}

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word[0]);
  return initials.slice(0, 2).join("").toUpperCase();
}

export function Avatar({
  src,
  name,
  size = "md",
  initials,
  customSize,
  rounded = "full",
  color,
  onClick,
  className,
}: AvatarProps) {
  const [isError, setError] = React.useState(false);

  const signature = initials || getInitials(name);
  const avatarSize = customSize ?? classes.size[size];

  if (src && !isError) {
    return (
      <Image
        src={src}
        alt={name}
        title={name}
        draggable={false}
        loading="lazy"
        width={100}
        height={100}
        onError={() => setError(() => true)}
        className={cn(
          makeClassName(`avatar-img`),
          classes.base,
          classes.rounded[rounded],
          color && classes.color[color],
          onClick && "cursor-pointer",
          "object-cover",
          className,
        )}
        style={{
          width: avatarSize + "px",
          height: avatarSize + "px",
          ...(!color && { backgroundColor: backgroundColor(signature) }),
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <span
      title={name}
      className={cn(
        makeClassName(`avatar-initials`),
        classes.base,
        classes.fontSize[size],
        classes.rounded[rounded],
        color && classes.color[color],
        "font-semibold",
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        width: avatarSize + "px",
        height: avatarSize + "px",
        ...(!color && { backgroundColor: backgroundColor(signature) }),
      }}
      onClick={onClick}
    >
      {signature}
    </span>
  );
}

Avatar.displayName = "Avatar";
