/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useCallback } from "react";

type InputFocusEvent = React.FocusEvent<any>;
type InputMouseEvent = React.MouseEvent<any, MouseEvent>;

type InteractiveEventTypes = {
  readOnly?: boolean;
  onFocus?: (e: InputFocusEvent) => void;
  onBlur?: (e: InputFocusEvent) => void;
  onMouseEnter?: (e: InputMouseEvent) => void;
  onMouseLeave?: (e: InputMouseEvent) => void;
};

export function useInteractiveEvent({
  readOnly,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: InteractiveEventTypes) {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleOnFocus = useCallback(
    (e: InputFocusEvent) => {
      if (readOnly === true) return false;
      setIsFocus((prevState) => !prevState);
      onFocus && onFocus(e);
    },
    [readOnly, onFocus],
  );

  const handleOnBlur = useCallback(
    (e: InputFocusEvent) => {
      if (readOnly === true) return false;
      setIsFocus(() => false);
      onBlur && onBlur(e);
    },
    [readOnly, onBlur],
  );

  const handleOnMouseEnter = useCallback(
    (e: InputMouseEvent) => {
      if (readOnly === true) return false;
      setIsHover(() => true);
      onMouseEnter && onMouseEnter(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [readOnly],
  );

  const handleOnMouseLeave = useCallback(
    (e: InputMouseEvent) => {
      if (readOnly === true) return false;
      setIsHover(() => false);
      onMouseLeave && onMouseLeave(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [readOnly],
  );

  return {
    isFocus,
    isHover,
    handleOnFocus,
    handleOnBlur,
    handleOnMouseEnter,
    handleOnMouseLeave,
  };
}
