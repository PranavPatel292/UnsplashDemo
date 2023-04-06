import Masonry from "react-masonry-css";
import { breakpointColumnsObj } from "./MasonryGridBreakPoints";

export const SkeletonImageGrid = () => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid max-h-screen overflow-y-hidden "
      columnClassName="my-masonry-grid_column"
    >
      <div className="w-full h-64 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-60 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-64 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-80 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-40 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-60 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-80 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-48 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-52 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-60 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-80 rounded bg-gray-700 animate-pulse"></div>
      <div className="w-full h-48 rounded bg-gray-700 animate-pulse"></div>
    </Masonry>
  );
};
