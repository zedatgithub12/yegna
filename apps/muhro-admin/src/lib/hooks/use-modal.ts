import { atom, useAtomValue, useSetAtom } from "jotai";

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  containerClassName?: string;
  onClose?: () => void;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: "600px",
  onClose: () => {},
  containerClassName: "",
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    onClose,
    containerClassName,
  }: {
    view: React.ReactNode;
    customSize?: string;
    onClose?: () => void;
    containerClassName?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      onClose,
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
