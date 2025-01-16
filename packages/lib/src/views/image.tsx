import React from "react";
import { getImagePath } from "../utils/get-image-path";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}
const Image = ({ src, alt, ...props }: Props) => {
  //we are using normal html image tag instead of next/image because next/image we are getting issue while optimizing the image and is not shown on local premise server
  return <img src={getImagePath(src)} alt={alt} loading="lazy" {...props} />;
};

export default Image;
