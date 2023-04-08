import React, { useEffect, useState } from "react";
import { unsplashImageData } from "../interfaces/unsplashImageData";

// Lazy Image props passed from it parent.
interface LazyImageProps {
  image: unsplashImageData;
  width: number;
  height: number;
  imageSrc: string;
  lqipSrc: string;
}

const LazyImage = ({
  image,
  height,
  width,
  imageSrc,
  lqipSrc,
}: LazyImageProps) => {
  // initialize state variables for images,
  // one is used for the image source and other is used to determine if image is loaded or not.
  // initially its value is false as image is yet to be loaded.
  const [loadedImages, setLoadedImages] = useState<Array<string>>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  // this function is called when the image is loaded, on the screen
  // it defines the image height, width, with its aspect ratio.
  // also this is where, the image loading state will be changed it value to true
  // as the image is now loaded on the screen.
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    const imgRatio = naturalWidth / naturalHeight;
    const newLoadedImages = [...loadedImages, img.src];
    setLoadedImages(newLoadedImages);
    const imgHeight = 390 + Math.floor(Math.random() * (101 - 29 + 1)) + 49;

    let width = imgRatio * 500;
    if (width < 300) {
      width = 300;
    }
    img.setAttribute(
      "style",
      `width: ${imgRatio * imgHeight}px; height: ${imgHeight}px; opacity: 1;`
    );
    setImageLoaded(true);
  };

  return (
    <div className="relative ">
      <div
        className={`${
          imageLoaded ? "hidden" : "block"
        } absolute top-0 left-0 bg-[#4B5563] w-[${width}px] h-[${height}px]`}
      ></div>
      <img
        src={imageLoaded ? imageSrc : lqipSrc}
        alt={image.alt_description}
        onLoad={handleImageLoad}
        style={{
          display:
            loadedImages.includes(imageSrc) || loadedImages.includes(lqipSrc)
              ? "block"
              : "none",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
          filter: imageLoaded ? "none" : "blur(5px)",
        }}
        className={`w-full object-cover  rounded shadow-lg shadow-[#6B7280]/50 hover:shadow-green-600/40`}
      />
      <div className="absolute inset-0 hover:bg-gradient-to-b hover:rounded hover:from-transparent hover:to-black">
        <div className="absolute inset-0 flex items-end mb-10 space-y-5 justify-left ml-1 hover:opacity-100 opacity-0">
          <div className="flex justify-left items-left text-left text-sm text-white">
            <p className="max-w-[40%] truncate">{image.alt_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazyImage;
