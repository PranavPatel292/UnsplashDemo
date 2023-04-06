import { QueryClient, QueryClientProvider } from "react-query";
import { Test } from "./components/Test";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

export default App;
