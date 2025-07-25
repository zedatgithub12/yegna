import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild as HeadLessTransitionChild,
} from "@headlessui/react";
import cn from "../../lib/class-names";
import { makeClassName } from "../../lib/make-class-name";

const modalStyles = {
  overlay:
    "fixed inset-0 cursor-pointer bg-black bg-opacity-60 dark:bg-opacity-80",
  size: {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-[60%]",
    full: "max-w-full min-h-screen",
  },
  // -> modal require extra rounded corner
  rounded: {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  },
};

const CHECK_VALID_CUSTOM_SIZE = /(\d*px)|(\d*%)?/g;

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalProps = {
  /** Whether the Modal is open or not */
  isOpen: boolean;
  /** Called when modal is closed (Escape key and click outside, depending on options) */
  onClose(): void;
  /** Preset size of modal is sm, DEFAULT, lg, xl, full */
  size?: ModalSize;
  /** The rounded variants are: */
  rounded?: keyof typeof modalStyles.rounded;
  /** Size prop will not work when you are using customSize prop. Here is the example of using this prop -> customSize="500px" or customSize="90%" */
  customSize?: string;
  /** This prop will remove extra padding spacing from screen */
  noGutter?: boolean;
  /** Override default CSS style of Modal's overlay */
  overlayClassName?: string;
  /** Set custom style classes for the Modal container, where you can set custom Modal size and padding and background color */
  containerClassName?: string;
  /** Set custom style classes for the Modal root element */
  className?: string;
  /** position of the modal component */
  position?: "right" | "center";
};

/**
 * A fully-managed render less Modal component. When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information.
 */
export function Modal({
  isOpen,
  onClose,
  size = "md",
  rounded = "md",
  noGutter,
  customSize,
  overlayClassName,
  containerClassName,
  className,
  children,
  position = "right",
}: React.PropsWithChildren<ModalProps>) {
  const TransitionComponent: React.ElementType = Transition;
  const TransitionChild: React.ElementType = HeadLessTransitionChild;
  // checking customSize value
  if (customSize?.match(CHECK_VALID_CUSTOM_SIZE)) {
    const checkedCustomSizeValue =
      customSize?.match(CHECK_VALID_CUSTOM_SIZE) ?? [];
    if (checkedCustomSizeValue[0] === "") {
      console.warn(
        'customSize prop value is not valid. Please set customSize prop like -> customSize="500px" or customSize="50%"'
      );
    }
  }
  return (
    <TransitionComponent appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onClose}
        className={cn(
          makeClassName(`modal-root`),
          "fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden",
          className
        )}
      >
        {/* -> required min-h-screen div to have the overflow y scrollbar when modal content is extra large */}
        <div
          className={cn(
            "flex min-h-screen flex-col items-center justify-center",
            size !== "full" && [!noGutter && "p-4 sm:p-5"]
          )}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom={cn("opacity-0")}
            enterTo={cn("opacity-100")}
            leave="ease-in-out duration-300"
            leaveFrom={cn("opacity-100")}
            leaveTo={cn("opacity-0")}
          >
            <div
              className={cn(
                makeClassName(`modal-overlay`),
                modalStyles.overlay,
                overlayClassName
              )}
            />
          </TransitionChild>

          <button type="button" className="sr-only">
            Sr Only
          </button>
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom={cn(
              "opacity-0 scale-95",
              position === "right" && "translate-x-full"
            )}
            enterTo={cn(
              "opacity-100 scale-100",
              position === "right" && "translate-x-0"
            )}
            leave="ease-in-out duration-300"
            leaveFrom={cn(
              "opacity-100 scale-100",
              position === "right" && "translate-x-0"
            )}
            leaveTo={cn(
              "opacity-0 scale-95",
              position === "right" && "translate-x-full"
            )}
          >
            <DialogPanel className="pointer-events-none relative w-full transform overflow-hidden transition-all">
              <div
                className={cn(
                  makeClassName(`modal-container`),
                  "pointer-events-auto  w-full break-words bg-background shadow-xl",
                  position === "right" && "ml-auto",
                  position === "center" && "m-auto",
                  size !== "full" && modalStyles.rounded[rounded],
                  !customSize && modalStyles.size[size],
                  containerClassName
                )}
                {...(customSize && {
                  style: {
                    maxWidth: customSize || "inherit",
                  },
                })}
              >
                {children}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionComponent>
  );
}

Modal.displayName = "Modal";
