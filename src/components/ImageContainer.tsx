import { useEffect, useState } from "react";
import { isError, useInfiniteQuery } from "react-query";
import { StringParam, useQueryParam } from "use-query-params";
import { getPhotosFromUnsplash } from "../requests/images";
import { ImageGird } from "./ImageGird";
import { SkeletonImageGrid } from "./SkeletonImageGrid";
import InfiniteScroll from "react-infinite-scroller";
import { showToast } from "../common/Toast";

export const ImageContainer = () => {
  // first, see if the search param is set or not;
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
    isError,
    refetch,
    ...result
  } = useInfiniteQuery(
    "getPhotosFromUnsplashInfinite",
    ({ pageParam = 1 }) => {
      return getPhotosFromUnsplash(searchTerm as string, pageParam);
    },
    {
      getNextPageParam: (lastPage) => lastPage.length + 1,
      enabled: !searchTerm === false, // only query if the search term is present;
      onError: () => {
        showToast.error("Something went wrong");
      },
    }
  );

  useEffect(() => {
    if (searchTerm) refetch();
  }, [searchTerm]);

  const newArray = data?.pages.flatMap((page) => page.results);

  return (
    <>
      {!searchTerm && !isError ? (
        <h1 className="w-full mt-72 lg:mt-52 flex justify-center items-center text-center text-xl text-white">
          No images to display. <br />
          Please search for the images you want to find.
        </h1>
      ) : null}
      {isLoading ? <SkeletonImageGrid /> : null}
      {isError && !isLoading ? (
        <h1 className="w-full mt-72 lg:mt-52 flex justify-center items-center text-center text-xl text-red-500">
          Sorry, something went wrong. Please try again later
        </h1>
      ) : null}
      {searchTerm && !isError && !isLoading && data?.pages && newArray ? (
        <>
          <InfiniteScroll
            key={page}
            pageStart={0}
            loadMore={() => {
              if (!isFetchingNextPage) {
                fetchNextPage({ pageParam: page + 1 });
                setPage(page + 1);
              }
            }}
            hasMore={hasNextPage}
            // loader={<SkeletonImageGrid page={page} />} // page number is to have key for each SkeletonImageGrid;
            threshold={500}
            useWindow={true}
          >
            <ImageGird images={newArray} key={page + "ImageGrid"} page={page} />
          </InfiniteScroll>
        </>
      ) : null}
    </>
  );
};
