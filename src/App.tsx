import { QueryClient, QueryClientProvider } from "react-query";
import { SearchBox } from "./components/SearchBox";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ImageContainer } from "./components/ImageContainer";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full">
                  <SearchBox />
                  {/* TODO: think about padding */}
                  <div className="max-w-[1280px] h-auto mt-10 mx-auto p-5">
                    <ImageContainer />
                  </div>
                </div>
              }
            />
          </Routes>
        </QueryParamProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
