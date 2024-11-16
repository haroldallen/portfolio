import photography from "../data/photography.json";
import categories from "../data/photographyCategories.json";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Photo from "../components/Photo";

export default function Photography() {

    const [ photosInOrder, setPhotosInOrder ] = useState([]);

    useEffect(()=>{ load() }, []);

    async function load() {
        let newPhotos = [...photography];
        setPhotosInOrder(newPhotos.filter(data => data.visible!==false).sort((a, b) => new Date(b.date) - new Date(a.date)));
    }

    return <div className="page photography">
        <p className="heading">Categories</p>
        <div className="list categories">
            {categories.slice(0, 4).map((data, index) => <Category key={index} { ...data} /> )}
        </div>
        <p className="heading">All photography</p>
        <div className="list wrap photography">
            {photosInOrder && photosInOrder.length > 0
                ? photosInOrder.map((data, index) => <Photo key={index} label="full" { ...data } /> )
                : Array.from({ length: 6 }).map((_, index) => <Photo key={index} /> )}
        </div>
    </div>;
}

function Category({ name, id, list }) {
    const navigate = useNavigate();

    if (!name) return <Skeleton className="category" />;

    const [ length, setLength ] = useState(0);

    useEffect(()=>{
        const allPhotos = [];
        for (const photos of Object.values(list)) {
            allPhotos.push(...photos);
        }
        setLength(allPhotos.length);
    }, []);

    return <button className="notbutton project"
        onClick={()=>{navigate(`/photography/${id}`)}}>
        <img src={`/photography_data/${Object.keys(list)[Object.values(list).length-1]}/${Object.values(list)[Object.values(list).length-1][0]}.jpg`} />
        <div>
            <p className="name subtitle">{name}</p>
            <p className="description">{length} photos</p>
        </div>
    </button>;
}