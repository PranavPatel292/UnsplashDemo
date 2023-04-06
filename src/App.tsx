import { QueryClient, QueryClientProvider } from "react-query";
import { Test } from "./components/Test";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen bg-[#111827]">
        <div className="w-full max-w-[1280px] mx-auto">
          <Test />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
