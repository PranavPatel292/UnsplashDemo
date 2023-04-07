import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import Masonry from "react-masonry-css";
import { unsplashImageData } from "../interfaces/unsplashImageData";
import LazyImage from "./LazyImage";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

interface ImageContainerProps {
  images: Array<unsplashImageData>;
}

export const ImageGrid = ({ images }: ImageContainerProps) => {
  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid "
        columnClassName="my-masonry-grid_column"
        key={"masonryGridDiv"}
      >
        {images.map((image: unsplashImageData, index: number) => {
          const { width, height } = image;
          const imageSrc = image.urls.regular;
          const lqipSrc = image.urls.thumb;

          return (
            <LazyLoad
              key={image.id + index}
              height={500}
              offset={2000} // load image 1500 pixels before
              threshold={0.5}
            >
              <LazyImage
                image={image}
                height={height}
                width={width}
                imageSrc={imageSrc}
                lqipSrc={lqipSrc}
              />
            </LazyLoad>
          );
        })}
      </Masonry>
    </>
  );
};
