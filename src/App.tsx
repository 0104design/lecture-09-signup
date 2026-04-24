import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Result from "./pages/Result.tsx";
import GlobalStyle from "./GlobalStyle.ts";

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/result"} element={<Result />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
