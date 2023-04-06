import React from "react";
import Masonry from "react-masonry-css";
import { unsplashImageData } from "../common/unsplashImageData";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

interface ImageContainerProps {
  images: Array<unsplashImageData>;
}
export const ImageGird = ({ images }: ImageContainerProps) => {
  console.log(images);
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid "
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image: unsplashImageData, index: number) => {
        return (
          <div key={index}>
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full object-cover rounded"
            />
          </div>
        );
      })}
    </Masonry>
  );
};
