import { FC } from "react";
import { ReactSVG } from "react-svg";

interface SvgWrapperProps {
  src: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

const SvgWrapper: FC<SvgWrapperProps> = ({
  src,
  width = "16px",
  height = "16px",
  className,
  color,
}) => {
  return (
    <ReactSVG
      src={src}
      className={className}
      width={width}
      height={height}
      color={color}
      beforeInjection={(svg) => {
        svg.setAttribute("width", String(width));
        svg.setAttribute("height", String(height));
        if (color) {
          svg.querySelectorAll("path").forEach((path) => {
            path.setAttribute("stroke", color);
          });
        }
      }}
    />
  );
};

export default SvgWrapper;
