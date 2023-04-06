import Masonry from "react-masonry-css";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

interface SkeletonImageGridProps {
  page?: number;
}

export const SkeletonImageGrid = ({ page }: SkeletonImageGridProps) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid max-h-screen overflow-y-hidden "
      columnClassName="my-masonry-grid_column"
      key={`${page} + Masonry_Skeleton`}
    >
      <div
        className="w-full h-64 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_1`}
      ></div>
      <div
        className="w-full h-60 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_21`}
      ></div>
      <div
        className="w-full h-64 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_3`}
      ></div>
      <div
        className="w-full h-80 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_4`}
      ></div>
      <div
        className="w-full h-40 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_51`}
      ></div>
      <div
        className="w-full h-60 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_6`}
      ></div>
      <div
        className="w-full h-80 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_7`}
      ></div>
      <div
        className="w-full h-48 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_8`}
      ></div>
      <div
        className="w-full h-52 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_9`}
      ></div>
      <div
        className="w-full h-60 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_10`}
      ></div>
      <div
        className="w-full h-80 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_11`}
      ></div>
      <div
        className="w-full h-48 rounded bg-gray-700 animate-pulse"
        key={`${page} + Masonry_Skeleton skl_12`}
      ></div>
    </Masonry>
  );
};
