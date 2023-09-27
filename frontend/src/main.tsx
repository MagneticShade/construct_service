import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { QueryClientProvider, QueryClient } from "react-query";
// import { StrictMode } from "react";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>

                    <App />

            </QueryClientProvider>
        </Provider>
    </BrowserRouter>
);
