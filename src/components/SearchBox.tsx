import { ChangeEvent, useEffect, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";

// validation schema for the search, cannot be empty and cannot contain commas.
const validateSearch = Yup.object().shape({
  search: Yup.string()
    .test("comma", "Search query cannot contain commas", (value) => {
      return value ? !value.includes(",") : true;
    })
    .required("Cannot be empty"),
});

export const SearchBox = () => {
  // initialize the state variables for input and query string parameters.
  const [searchTerm, setSearchTerm] = useState("");
  const [querySearchTerm, setQuerySearchTerm] = useQueryParam(
    "search",
    StringParam
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // whenever the user types in an input field
  // clear any previous error and set the searchTerm state.
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setSearchTerm(event.target.value);
  };

  // when user tries to search;
  // first we need to check if the input is empty or not;
  // if not, then we can set the query string params. or,
  // if it is empty, then we need to show the error message.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // to stop refreshing of the page
    event.preventDefault();
    try {
      // validate the search term
      await validateSearch.validate({ search: searchTerm });
      // if validation succeeded, then set the search query param to the value,
      // remove any previous error.
      setQuerySearchTerm(searchTerm);
      setErrors({});
    } catch (validationErrors: any) {
      // make a new error message and set it to setError
      // also make sure that you remove any existing query params so that the fetch request will not perform.
      const newErrors: { [key: string]: string } = {};
      newErrors["inputError"] = validationErrors.message;
      setQuerySearchTerm(undefined);
      setErrors(newErrors);
    }
  };

  // this is so that if query string has search term we can add that into the input box.
  // this happens when we reload the page that has the search term.
  useEffect(() => {
    if (querySearchTerm) setSearchTerm(querySearchTerm);
  }, []);

  return (
    <div className="sticky top-0 w-full p-5 bg-[#1F2937] z-[1]">
      <div className="w-full max-w-[1280px] mx-auto ">
        <form onSubmit={handleSubmit}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className={`${
                errors.inputError ? "placeholder:text-red-500" : ""
              }  block w-full p-4 pl-10 text-sm rounded-lg bg-[#374151]/50 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
              placeholder={`${
                errors.inputError
                  ? errors.inputError
                  : "Search Office, schools ..."
              }`}
              value={searchTerm}
              onChange={handleOnChange}
            />

            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
          {errors.inputError === "Search query cannot contain commas" ? (
            <p className="text-red-500 mt-2">
              Search query cannot contain commas
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};
