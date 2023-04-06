import React, { useState } from "react";
import { useQuery } from "react-query";
import { StringParam, useQueryParam } from "use-query-params";
import { unsplashImageData } from "../common/unsplashImageData";
import { getPhotosFromUnsplash } from "../requests/images";
import { SkeletonImageGrid } from "./SkeletonImageGrid";

export const ImageContainer = () => {
  // first, see if the search param is set or not;
  const query = "schools";
  const [searchTerm, _] = useQueryParam("search", StringParam);
  const [imageData, setImageData] = useState<null | Array<unsplashImageData>>(
    null
  );

  const { isError, isLoading, data, error } = useQuery(
    ["getPhotosFromUnsplash"],
    () => getPhotosFromUnsplash(query),
    {
      staleTime: Infinity,
      enabled: !searchTerm === false, // only do the network request if the search term is present
    }
  );

  return <>{<SkeletonImageGrid />}</>;
};
