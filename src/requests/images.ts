import api from "./axios";

// get the client from env file;
const authorization = `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`;

// export function to allow users to use and get the photos from the unsplash.
export const getPhotosFromUnsplash = async (
  searchQuery: string,
  pageParam: { pageParam: number }
) => {
  try {
    const response = await api.get("/photos", {
      headers: {
        Authorization: authorization,
      },
      params: {
        query: searchQuery,
        page: pageParam,
        per_page: 30, // maximum allowed per page: - 10 items by default, up to a maximum of 30.
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
