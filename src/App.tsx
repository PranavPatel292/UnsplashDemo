import { QueryClient, QueryClientProvider } from "react-query";
import { SearchBox } from "./components/SearchBox";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ImageContainer } from "./components/ImageContainer";
import { CookiesProvider } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <CookiesProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="w-full">
                    <SearchBox />
                    <div className="max-w-[1280px] h-auto mt-10 mx-auto p-5">
                      <ImageContainer />
                    </div>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  </div>
                }
              />
            </Routes>
          </QueryParamProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
