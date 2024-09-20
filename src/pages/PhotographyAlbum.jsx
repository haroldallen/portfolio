import "../assets/css/album.css";

import photography from "../data/photography.json";
import categories from "../data/photographyCategories.json";

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
    const [ lens, setLens ] = useState("");

    useEffect(()=>{ load() }, []);

    async function load() {
        if (!date) return navigate("/photography");

        let newAlbum = [...photography].filter(data => data.date == date)[0];
        if (!newAlbum) {
            let category = categories.find(data => data.id == date);
            if (category) newAlbum = { ...category, title: category.name, type: "category" };
            else return navigate("/photography");
        } else newAlbum = { ...newAlbum, type: "album" };
        setAlbum(newAlbum);

        if (newAlbum.type === "category") {
            let newPhotos = [];
            for (const [ date, entries ] of Object.entries(newAlbum.list)) {
                console.log(date, entries)
                // entries is the list ([0, 1, 2, 3]), date is the timestamp key
                let albumPhotos = [];
                for (let i=0; i<photography.find(data => data.date == date).length; i++) {
                    console.log(date, i)
                    if (entries.includes(i)) albumPhotos.push(`${date}/${i}.jpg`);
                }
                albumPhotos.reverse();
                newPhotos.push(...albumPhotos);
            }
            newPhotos.reverse();
            setPhotos(newPhotos);
        }
        else {
            setPhotos(Array.from({ length: newAlbum.length }, (_, index) => index));
            if (Array.isArray(newAlbum.lens)) setLens(newAlbum.lens.join(", "));
            else setLens(newAlbum.lens);
        }
    }

    return <div className="page album">
        <button className="notbutton link" onClick={()=>{ navigate("/photography") }}>
            <ArrowLeftIcon height={14} /> Back
        </button>
        <div className="jsb">
            <div>
                <p className="heading subtitle">{album.title}</p>
                <p className="date">
                    { album.type === "album" ? moment(album.date).format("dddd, Do MMMM YYYY")
                    : photos.length+" photos" }
                </p>
               { album.reedits ? <p className="reedits">This album contains re-edits</p> : <></> }
            </div>
            { album.camera && album.lens ? <div>
                <p><span className="half">Camera: </span>{album.camera}</p>
                <p><span className="half">Lens: </span>{lens}</p>
            </div> : <></> }
        </div>
        <div className="list wrap photography album">
            { album.type === "album" ? <>
                { photos && photos.length > 0
                    ? photos.map((_, index) => <Photo key={index} label="none" date={date} thumbnail={index+".jpg"} /> )
                    : Array.from({ length: 6 }).map((_, index) => <Photo key={index} /> )}
            </> : <>
                { photos && photos.length > 0
                    ? photos.map((data, index) => <Photo key={index} label="none" date={data.split("/")[0]} thumbnail={data.split("/")[1]} /> )
                    : Array.from({ length: 6 }).map((_, index) => <Photo key={index} /> )}
            </> }
        </div>
    </div>;
}