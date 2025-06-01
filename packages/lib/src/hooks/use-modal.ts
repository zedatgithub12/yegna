import { atom, useAtomValue, useSetAtom } from "jotai";

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  containerClassName?: string;
  onClose?: () => void;
  position?: "right" | "center";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | undefined;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: "600px",
  onClose: () => {},
  containerClassName: "",
  position: "center",
  rounded: "md",
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    onClose,
    containerClassName,
    position,
    rounded,
  }: {
    view: React.ReactNode;
    customSize?: string;
    onClose?: () => void;
    containerClassName?: string;
    position?: "right" | "center";
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | undefined;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      onClose,
      position,
      rounded,
      containerClassName,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
