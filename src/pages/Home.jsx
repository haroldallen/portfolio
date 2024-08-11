import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

import photography from "../data/photography.json";
import projects from "../data/projects.json";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Photo from "../components/Photo";
import moment from "moment";

export default function Home() {

    const navigate = useNavigate();

    const [ photosInOrder, setPhotosInOrder ] = useState([]);
    const [ projectsInOrder, setProjectsInOrder ] = useState([]);

    useEffect(()=>{ load() }, []);

    async function load() {
        let newPhotos = [...photography];
        setPhotosInOrder(newPhotos.sort((a, b) => new Date(b.date) - new Date(a.date)));

        let newProjects = [...projects];
        setProjectsInOrder(newProjects.reverse());
    }

    return <div className="page home">
        <div className="jsb">
            <p className="heading">Recent photography</p>
            <button className="notbutton link" onClick={()=>{ navigate("/photography") }}>
                See them all <ArrowTopRightOnSquareIcon height={14} />
            </button>
        </div>
        <div className="list photography">
            {photosInOrder && photosInOrder.length > 0
                ? photosInOrder.map((data, index) => <Photo key={index} label="min" { ...data } /> )
                : Array.from({ length: 5 }).map((_, index) => <Photo key={index} /> )}
        </div>
        <p className="heading">Software projects</p>
        <div className="list projects">
            {projectsInOrder && projectsInOrder.length > 0
                ? projectsInOrder.map((data, index) => <Project key={index} { ...data } /> )
                : Array.from({ length: 5 }).map((_, index) => <Project key={index} /> )}
        </div>
        <p className="heading">About me</p>
        <p className="paragraph">
            I’m a 14 year old developer, designer and photographer.
            <br />I’m still learning but I think my stuff is pretty good.
            <br />If you’re interested in working with me, please{" "}
            <button className="notbutton link" onClick={()=>{ navigate("/contact") }}>
                contact me <ArrowTopRightOnSquareIcon height={14} />
            </button>
        </p>
    </div>;
}

function Project({ name, id, icon, description }) {
    const navigate = useNavigate();

    if (!name) return <Skeleton className="project" />;

    return <button className="notbutton project"
        onClick={()=>{navigate(`/project/${id}`)}}>
        <img src={`/projects_data/${id}/${icon}`} />
        <div>
            <p className="name subtitle">{name}</p>
            <p className="description">{description}</p>
        </div>
    </button>;
}