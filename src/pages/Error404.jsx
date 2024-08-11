import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const navigate = useNavigate();

    return <div className="page contact">
        <p className="heading subtitle">404</p>
        <p className="paragraph">The page you attempted to access could not be found</p>
        <div>
            <button className="notbutton link" onClick={()=>{ navigate("/") }}>
                <HomeIcon height={14} /> Home
            </button>
            <button className="notbutton link" onClick={()=>{ window.history.back() }}>
                <ArrowLeftIcon height={14} /> Go back
            </button>
        </div>
    </div>;
}