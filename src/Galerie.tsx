import GalerieItem from "./GalerieItem";
import {useEffect, useState} from "react";

interface jsonObject {
    info: infoObject
    results: Array<characterObject>
}

interface infoObject{
    pages: number
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
    const [info, setInfo] = useState({} as infoObject)
    const [results, setResults] = useState([] as Array<characterObject>);
    const [errMsg, setErrMsg] = useState('');
    const [page, setPage] = useState(localStorage.getItem('currentPage') ?? '1');
    const pageMax = info.pages;

    useEffect(() => {
        fetch(`http://rickandmortyapi.com/api/character?page=${page}`)
            .then(resp => {return resp.json()})
            .then((respBody: jsonObject) => {setInfo(respBody.info)})
    }, []);

    useEffect(() => {
        localStorage.setItem('currentPage', page )
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('URL nicht gefunden!')
                })
            .then((responseBody: jsonObject) => {setResults(responseBody.results)})
            .catch((err: Error) => setErrMsg(err.message))
    }, [page]);

    const prev = () => {
        setPage(oldPage => `${parseInt(oldPage) - 1}`)
    }

    const next = () => {
        setPage(oldPage => `${parseInt(oldPage) + 1}`)
    }

    return (
        <div>
            <div>
                <button onClick={prev} disabled={parseInt(page) <= 1}>zurück</button>
                <input data-testid='search-field' type="text" placeholder="Name to search" value={itemName} onChange={ev => setItemName(ev.target.value)}/>
                <button onClick={next} disabled={parseInt(page) >= pageMax}>vor</button>
                <div>{page} - {pageMax}</div>
            </div>
            <div>
                {
                    results.length > 0
                    ? results
                        .filter(e => e.name.toLowerCase().includes(itemName.toLowerCase()))
                            .map(e => <div key={e.id} data-testid='galerie-item'>< GalerieItem key={e.id} name={e.name} species={e.species} status={e.status} image={e.image} id={e.id}/></div>)
                    : <div>{errMsg}</div>
                }
            </div>
        </div>
    )
}
