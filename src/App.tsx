import { QueryClient, QueryClientProvider } from "react-query";
import { SearchBox } from "./components/SearchBox";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { Test } from "./components/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
                <div className="w-full h-screen bg-[#111827]">
                  <SearchBox />
                  <div className="w-full max-w-[1280px] mx-auto">
                    {/* <Test /> */}
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
