import { useQuery } from "react-query";
import { getPhotosFromUnsplash } from "../requests/images";

export const Test = () => {
  const query = "schools";
  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ["getPhotosFromUnsplash"],
    () => getPhotosFromUnsplash(query),
    { staleTime: 60000 }
  );
  console.log(data);
  return <div>Test</div>;
};
