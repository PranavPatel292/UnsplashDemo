import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { StringParam, useQueryParam } from "use-query-params";
import { getPhotosFromUnsplash } from "../requests/images";
import { ImageGrid } from "./ImageGrid";
import { SkeletonImageGrid } from "./SkeletonImageGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import { showToast } from "../common/Toast";

export const ImageContainer = () => {
  const [searchTerm, _] = useQueryParam("search", StringParam);
  const [loadingNewImages, setLoadingNewImages] = useState(false);
  const targetRef = useRef(null);

  // use of the React-Query's useInfiniteQuery to get the image data seamlessly
  // while user is scrolling.
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
    ["getPhotosFromUnsplashInfinite", searchTerm],
    ({ pageParam = 1 }) => {
      return getPhotosFromUnsplash(searchTerm as string, pageParam);
    },
    {
      getNextPageParam: (lastPages, allPages) => {
        const maxPages = Math.round(lastPages.total / 30);
        const nextPage: number = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      onSuccess: () => setLoadingNewImages(false),
      enabled: false, // only query if the search term is present;
      onError: () => {
        showToast.error("Something went wrong");
      },
      staleTime: Infinity, // do not refetch until it is requested
    }
  );

  // if the searchTerm is changed in the query string, refetch the useInfiniteQuery.
  useEffect(() => {
    if (searchTerm) refetch();
  }, [searchTerm]);

  // function to handle the nextFetch request and used in InfiniteScroll.
  const handleFetchNextPage = () => {
    setLoadingNewImages(true);
    fetchNextPage();
  };

  // flat the return data as they are paginated and pages are in different arrays.
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
      {searchTerm && hasNextPage && !isError && !isLoading && newArray ? (
        <div
          className={" max-h-[800px] overflow-y-auto"}
          style={{ maxHeight: "800px", overflowY: "auto" }}
        >
          <div>
            <InfiniteScroll
              dataLength={newArray.length}
              next={handleFetchNextPage}
              hasMore={!loadingNewImages && hasNextPage}
              scrollThreshold={0.8}
              loader={
                <h1 className="w-full mt-72 lg:mt-52 flex justify-center items-center text-center text-xl text-white">
                  Loading
                </h1>
              }
            >
              <ImageGrid images={newArray} key={"ImageGrid"} />
              <div ref={targetRef}></div>
              {!hasNextPage ? (
                <h1 className="w-full mt-72 lg:mt-52 flex justify-center items-center text-center text-xl text-white">
                  No more images found!
                </h1>
              ) : null}
            </InfiniteScroll>
          </div>
        </div>
      ) : null}
    </>
  );
};
