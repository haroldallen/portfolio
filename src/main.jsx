import "./assets/css/themes.css";
import "./assets/css/styles.css";

import "react-loading-skeleton/dist/skeleton.css";

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { SkeletonTheme } from "react-loading-skeleton";


import Home from "./pages/Home";
import Project from "./pages/Project";
import Photography from "./pages/Photography";
import PhotographyAlbum from "./pages/PhotographyAlbum";
import Error404 from "./pages/Error404";

createRoot(document.getElementById('root')).render(<App />)

function App() {
    return <>
        <SkeletonTheme baseColor="#d9d9d9" highlightColor="#fff">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/project/:id" element={<Project />} />

                    <Route path="/photography/" element={<Photography />} />
                    <Route path="/photography/:date" element={<PhotographyAlbum />} />

                    <Route path="/*" element={<Error404 />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </SkeletonTheme>
    </>;
}

function Header() {
    const navigate = useNavigate();

    return <nav className="header">
        <button className="notbutton title" onClick={()=>{ navigate("/") }}>
            Harold Allen
        </button>
    </nav>;
}

function Footer() {
    return <footer className="footer">
        <p>© { new Date().getFullYear() } Harold Allen. All rights reserved.</p>
    </footer>;
}