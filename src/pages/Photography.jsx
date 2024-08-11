import photography from "../data/photography.json";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Photo from "../components/Photo";

export default function Photography() {

    const [ photosInOrder, setPhotosInOrder ] = useState([]);

    useEffect(()=>{ load() }, []);

    async function load() {
        let newPhotos = [...photography];
        setPhotosInOrder(newPhotos.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }

    return <div className="page photography">
        <p className="heading">Photography</p>
        <div className="list wrap photography">
            {photosInOrder && photosInOrder.length > 0
                ? photosInOrder.map((data, index) => <Photo key={index} label="full" { ...data } /> )
                : Array.from({ length: 6 }).map((_, index) => <Photo key={index} /> )}
        </div>
    </div>;
}