import { useState } from "react";
import LazyLoad from "react-lazy-load";
import Masonry from "react-masonry-css";
import { unsplashImageData } from "../common/unsplashImageData";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

interface ImageContainerProps {
  images: Array<unsplashImageData>;
}
export const ImageGrid = ({ images }: ImageContainerProps) => {
  const [loadedImages, setLoadedImages] = useState<Array<string>>([]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    const imgRatio = naturalWidth / naturalHeight;
    const newLoadedImages = [...loadedImages, img.src];
    setLoadedImages(newLoadedImages);
    img.setAttribute(
      "style",
      `width: ${imgRatio * 500}px; height: 500px; opacity: 1;`
    );
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid "
      columnClassName="my-masonry-grid_column"
      key={"masonryGridDiv"}
    >
      {images.map((image: unsplashImageData, index: number) => {
        return (
          <LazyLoad
            key={image.id + index}
            height={500}
            offset={1000}
            threshold={0.5}
          >
            <div className="flex justify-center">
              <img
                src={image.urls.small}
                alt={image.alt_description}
                onLoad={handleImageLoad}
                style={{
                  display: loadedImages.includes(image.urls.small)
                    ? "block"
                    : "none",
                  opacity: loadedImages.includes(image.urls.small) ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
                className="w-full object-cover rounded"
              />
            </div>
          </LazyLoad>
        );
      })}
    </Masonry>
  );
};
