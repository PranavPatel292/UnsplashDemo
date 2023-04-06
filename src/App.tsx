import { QueryClient, QueryClientProvider } from "react-query";
import { Test } from "./components/Test";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen bg-[#111827]"></div>
    </QueryClientProvider>
  );
}

export default App;
