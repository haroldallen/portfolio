import "../assets/css/album.css";

import photography from "../data/photography.json";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Photo from "../components/Photo";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import moment from "moment";

export default function PhotographyAlbum() {

    const navigate = useNavigate();

    const { date } = useParams();

    const [ album, setAlbum ] = useState({});
    const [ photos, setPhotos ] = useState([]);

    useEffect(()=>{ load() }, []);

    async function load() {
        if (!date) return navigate("/photography");

        let newAlbum = [...photography].filter(data => data.date == date)[0];
        setAlbum(newAlbum);

        setPhotos(Array.from({ length: newAlbum.length }, (_, index) => index));
    }

    return <div className="page album">
        <button className="notbutton link" onClick={()=>{ navigate("/photography") }}>
            <ArrowLeftIcon height={14} /> Back
        </button>
        <div className="jsb">
            <div>
                <p className="heading subtitle">{album.title}</p>
                <p className="date">{moment(album.date).format("dddd, Do MMMM YYYY")}</p>
            </div>
            { album.camera && album.lens ? <div>
                <p><span className="half">Camera: </span>{album.camera}</p>
                <p><span className="half">Lens: </span>{album.lens}</p>
            </div> : <></> }
        </div>
        <div className="list wrap photography album">
            {photos && photos.length > 0
                ? photos.map((_, index) => <Photo key={index} label="none" date={date} thumbnail={index+".jpg"} /> )
                : Array.from({ length: 6 }).map((_, index) => <Photo key={index} /> )}
        </div>
    </div>;
}