import GalerieItem from "./GalerieItem";
import {useEffect, useState} from "react";

interface jsonObject {
    info: object
    results: Array<characterObject>
}

interface infoObj{
    pages: string
}

interface characterObject {
    id: string
    name: string
    species: string
    status: string
    image: string
}

export default function Galerie() {

    const [itemName, setItemName] = useState('');
    const [data, setData] = useState([] as Array<characterObject>);
    const [page, setPage] = useState(1);
    const [errMsg, setErrMsg] = useState('');

    const [infoOb, setInfoOb] = useState({})

    const [pageMax, setPageMax] = useState(42)

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('URL nicht gefunden!')
                })
            .then((responseBody: jsonObject) => {setData(responseBody.results)})
            .catch((err: Error) => setErrMsg(err.message))
    }, [page]);

    return (
        <div>
            <div>
                <button onClick={() => {setPage(page - 1)}} disabled={page <= 1}>prev</button>
                <input data-testid='search-field' type="text" placeholder="Name to search" value={itemName} onChange={ev => setItemName(ev.target.value)}/>
                <button onClick={() => setPage(page + 1)} disabled={page >= pageMax}>next</button>
                <div>{page} - {pageMax}</div>
            </div>
            <div>
                {
                    data.length > 0
                    ? data
                        .filter(e => e.name.toLowerCase().includes(itemName.toLowerCase()))
                            .map(e => <div key={e.id} data-testid='galerie-item'>< GalerieItem key={e.id} name={e.name} species={e.species} status={e.status} image={e.image} id={e.id}/></div>)
                    : <div>{errMsg}</div>
                }
            </div>
        </div>
    )
}
