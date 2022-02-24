import GalerieItem from "./GalerieItem";
import {useEffect, useState} from "react";

interface jsonObject {
    info: object,
    results: Array<characterObject>
}

interface characterObject {
    name: string
    species: string
    status: string
    image: string
}

export default function Galerie() {

    const [itemName, setItemName] = useState('');

    const [data, setData] = useState([] as Array<characterObject>);

    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => {return response.json()})
            .then((responseBody: jsonObject) => {setData(responseBody.results)})
    }, [page]);

    return (
        <div>
            <div>
                <button onClick={() => {setPage(page - 1)}} hidden={page <= 1}>prev</button>
                <input type="text" placeholder="Name to search" value={itemName} onChange={ev => setItemName(ev.target.value)}/>
                <button onClick={() => setPage(page + 1)}>next</button>
            </div>
            <div>
                {
                    data.length > 0
                    ? data
                        .filter(e => e.name.toLowerCase().includes(itemName.toLowerCase()))
                        .map(e => < GalerieItem name={e.name} species={e.species} status={e.status} image={e.image}/>)
                    : <div>Lädt noch</div>
                }
            </div>
        </div>
    )
}
