import axios from "axios";

// export the base url for the axios requests
export default axios.create({
  baseURL: "https://api.unsplash.com/search",
});
