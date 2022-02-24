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

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then(response => {return response.json()})
            .then((responseBody: jsonObject) => {setData(responseBody.results)})
    }, []);


/*    const characters = data.results
        .filter(e => e.name.toLowerCase().includes(itemName.toLowerCase()))
        .map(e => < GalerieItem name={e.name} species={e.species} status={e.status} image={e.image}/>)*/

    return (
        <div>
            <div>
                < input type="text" placeholder="Name to search" value={itemName} onChange={ev => setItemName(ev.target.value)}/>
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
