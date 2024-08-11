import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

export default function Photo({ label, date, thumbnail, title, length }) {
    const navigate = useNavigate();

    if (!date) return <Skeleton className="photo" />;

    if (label === "none") return <img alt="" src={`/photography_data/${date}/${thumbnail}`} className="photo" />;

    return <button className="notbutton photo"
        style={{ backgroundImage: `url("/photography_data/${date}/${thumbnail}")` }}
        onClick={()=>{ navigate(`/photography/${date}`) }}>
        { label === "full" ? <div className="details">
            <div>
                <p className="date">{moment(date).format("dddd, Do MMMM YYYY")}</p>
                <p>{title}</p>
            </div>
            <p>+{length-1}</p>
        </div>
        : label === "min" ? <p className="length">+{length-1}</p>
        : "" }
    </button>;
}