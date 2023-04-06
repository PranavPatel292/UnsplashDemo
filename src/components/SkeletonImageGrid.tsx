import React from "react";
import Skeleton from "react-loading-skeleton";
import Masonry from "react-masonry-css";

export const SkeletonImageGrid = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
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
