import { AppRouter } from "./routers";
import { QueryProvider, ToastifyProvider } from "./providers";

function App() {
  return (
    <>
      <QueryProvider>
        <ToastifyProvider />
        <AppRouter />
      </QueryProvider>
    </>
  );
}

export default App;
