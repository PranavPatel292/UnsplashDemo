import LazyLoad from "react-lazy-load";
import Masonry from "react-masonry-css";
import { unsplashImageData } from "../common/unsplashImageData";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

interface ImageContainerProps {
  images: Array<unsplashImageData>;
  page?: number;
}
export const ImageGird = ({ images, page }: ImageContainerProps) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid "
      columnClassName="my-masonry-grid_column"
      key={page?.toString() + "test_page"}
    >
      {images.map((image: unsplashImageData, index: number) => {
        return (
          <LazyLoad
            key={image.urls.regular + image.id + index}
            offset={100}
            threshold={0.8}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full object-cover rounded"
            />
          </LazyLoad>
        );
      })}
    </Masonry>
  );
};
