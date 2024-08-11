import projects from "../data/projects.json";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Photo from "../components/Photo";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Skeleton from "react-loading-skeleton";

export default function Project() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ project, setProject ] = useState([]);
    const [ photos, setPhotos ] = useState([]);

    useEffect(()=>{ load() }, []);

    async function load() {
        if (!id) return navigate("/");

        let newProject = [...projects].filter(data => data.id == id)[0];
        setProject(newProject);

        setPhotos(Array.from({ length: newProject.screenshots }, (_, index) => index));
    }

    return <div className="page photography">
        <button className="notbutton link" onClick={()=>{ navigate("/") }}>
            <ArrowLeftIcon height={14} /> Back
        </button>
        <p className="heading">{project.name}</p>
        <div className="list screenshots">
            {photos && photos.length > 0
                ? photos.map((_, index) => <Screenshot key={index} id={id} index={index} /> )
                : Array.from({ length: 4 }).map((_, index) => <Screenshot key={index} /> )}
        </div>
        <p className="heading">About</p>
        <p className="paragraph">{project.description}</p>
        { project.link ? <>
            <p className="heading">Website</p>
            <a className="link" href={project.link} target="_blank">
                {project.link.replace("https://", "")}
            </a>
        </> : <></> }
    </div>;
}

function Screenshot({ id, index }) {
    if (!id) return <Skeleton width={512} height={288} className="screenshot" />;

    return <img src={`/projects_data/${id}/${index}.png`} className="screenshot" />;
}