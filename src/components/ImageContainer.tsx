import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { StringParam, useQueryParam } from "use-query-params";
import { getPhotosFromUnsplash } from "../requests/images";
import { ImageGird } from "./ImageGird";
import { SkeletonImageGrid } from "./SkeletonImageGrid";

export const ImageContainer = () => {
  // first, see if the search param is set or not;
  const query = "office";
  const [searchTerm, _] = useQueryParam("search", StringParam);
  const [page, setPage] = useState(1);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    ...result
  } = useInfiniteQuery(
    "getPhotosFromUnsplashInfinite",
    ({ pageParam = 1 }) => {
      return getPhotosFromUnsplash(query, pageParam);
    },
    {
      getNextPageParam: (lastPage) => lastPage.length + 1,
    }
  );

  const newArray = data?.pages.flatMap((page) => page.results);

  const handleFetchNextPage = () => {
    fetchNextPage({ pageParam: page + 1 });
    setPage(page + 1);
  };

  return (
    <>
      {isLoading ? <SkeletonImageGrid /> : null}
      {data?.pages && newArray ? (
        <>
          <ImageGird images={newArray} />
        </>
      ) : null}
      {/* <button
        onClick={handleFetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
        className="p-10 text-white bg-yellow-400"
      >
        Next Page
      </button> */}
    </>
  );
};
