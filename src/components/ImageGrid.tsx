// this is where the lazy loading of images is done using LazyLoad from 'react-lazy-load' library.
// also this is where the Masonry gird is defined for images.

import LazyLoad from "react-lazy-load";
import Masonry from "react-masonry-css";
import { unsplashImageData } from "../interfaces/unsplashImageData";
import LazyImage from "./LazyImage";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";
import { Profile } from "./Profile";

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
              height={500} // the size of the LazyLoad container, it is important for the threshold.
              offset={2000} // load image 1500 pixels before
              threshold={0.5}
              className="mt-14"
            >
              <>
                <LazyImage
                  image={image}
                  height={height}
                  width={width}
                  imageSrc={imageSrc}
                  lqipSrc={lqipSrc}
                  data={image}
                />
              </>
            </LazyLoad>
          );
        })}
      </Masonry>
    </>
  );
};
