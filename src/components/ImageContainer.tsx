import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { StringParam, useQueryParam } from "use-query-params";
import { getPhotosFromUnsplash } from "../requests/images";
import { ImageGrid } from "./ImageGrid";
import { SkeletonImageGrid } from "./SkeletonImageGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import { showToast } from "../common/Toast";

export const ImageContainer = () => {
  // first, see if the search param is set or not;
  const [searchTerm, _] = useQueryParam("search", StringParam);
  const [loadingNewImages, setLoadingNewImages] = useState(false);

  const targetRef = useRef(null);

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
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (searchTerm) refetch();
  }, [searchTerm]);

  const handleFetchNextPage = () => {
    setLoadingNewImages(true);
    fetchNextPage();
  };

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
              scrollThreshold={0.2}
              loader={<></>}
            >
              <ImageGrid images={newArray} key={"ImageGrid"} />
              <div ref={targetRef}></div>
            </InfiniteScroll>
          </div>
        </div>
      ) : null}
    </>
  );
};
