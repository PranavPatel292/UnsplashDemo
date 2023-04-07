import { useState } from "react";
import LazyLoad from "react-lazy-load";
import Masonry from "react-masonry-css";
import { unsplashImageData } from "../interfaces/unsplashImageData";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

interface ImageContainerProps {
  images: Array<unsplashImageData>;
}
export const ImageGrid = ({ images }: ImageContainerProps) => {
  const [loadedImages, setLoadedImages] = useState<Array<string>>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    const imgRatio = naturalWidth / naturalHeight;
    const newLoadedImages = [...loadedImages, img.src];
    const imgHeight = 390 + Math.floor(Math.random() * (101 - 29 + 1)) + 49;
    setLoadedImages(newLoadedImages);
    setImageLoaded(true);
    let width = imgRatio * 500;
    if (width < 300) {
      width = 300;
    }
    img.setAttribute(
      "style",
      `width: ${imgRatio * imgHeight}px; height: ${imgHeight}px; opacity: 1;`
    );
  };

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
          return (
            <LazyLoad
              key={image.id + index}
              height={500}
              offset={1000}
              threshold={0.5}
            >
              <div className="relative ">
                <div
                  className={`${
                    imageLoaded ? "hidden" : "block"
                  } absolute top-0 left-0 bg-gray-300 w-full h-0`}
                  style={{ paddingTop: `${(height / width) * 100}%` }}
                ></div>
                <img
                  src={image.urls.regular}
                  alt={image.alt_description}
                  onLoad={handleImageLoad}
                  style={{
                    display: loadedImages.includes(image.urls.small)
                      ? "block"
                      : "none",
                    opacity: loadedImages.includes(image.urls.small) ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  className="w-full object-cover  rounded shadow-lg shadow-[#6B7280]/50 hover:shadow-green-600/40"
                />
                <div className="absolute inset-0 hover:bg-gradient-to-b hover:rounded hover:from-transparent hover:to-black">
                  <div className="absolute inset-0 flex items-end mb-10 space-y-5 justify-left ml-1 hover:opacity-100 opacity-0">
                    <div className="flex justify-left items-left text-left text-sm text-white">
                      <p className="max-w-[40%] truncate">
                        {image.alt_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </LazyLoad>
          );
        })}
      </Masonry>
    </>
  );
};
